import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { User } from 'src/app/Interfaces/User/user.interface';
import { IUSerRepositoryService } from 'src/app/Abstract/User/repository/iuser-repository.service';
import { Subscription } from 'rxjs';
import { IMessageQueryForUserService } from 'src/app/Abstract/Message/User/imessage-query-for-user.service';
import { GlobalVariablesService } from 'src/app/Services/GlobalVariables/global-variables.service';
import { Message } from 'src/app/Interfaces/Message/message.inteface';
import { MqttHandlerService } from 'src/app/Services/Mqtt/mqtt-handler.service';
import { UserAuthServiceService } from 'src/app/Services/Auth/user-auth-service.service';
import { IMessageQueryService } from 'src/app/Abstract/Message/MessageQuery/imessage-query.service';
import { ChatService } from 'src/app/Services/Chat/chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('dynamicElement') dynamicElement: ElementRef;
  recipient: User;
  sender: User;
  messages: Message[];
  showActionMenu: boolean = false;
  recipientId: number = 0;
  managmentMessages: {
    id_user: number;
    text: string;
    time: string;
    read?: object[];
  }[] = [];
  page: number = 2;
  perPage: number = environment.perPage;
  isLoading: boolean = false;
  private scrollListener: () => void;
  constructor(
    private userRepository: IUSerRepositoryService,
    private messageService: IMessageQueryForUserService,
    private globalService: GlobalVariablesService,
    private mqttService: MqttHandlerService,
    private authService: UserAuthServiceService,
    private messageQueryService: IMessageQueryService,
    private chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getChatId();
    this.authService.UserAuth().subscribe((userData) => {
      this.globalService.userAuth.value.userData = userData.user;
      this.sender = this.globalService.userAuth.value.userData;
      this.suscribeTopic(this.sender.id);
      this.suscribeTopicForReadMessage(this.sender.id);
      this.suscribeTopicForMarkAllMessageAsRead(this.sender.id);
    });
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      this.dynamicElement.nativeElement.removeEventListener(
        'scroll',
        this.scrollListener
      );
    }
  }
  /**
   * Event listener for scrolling to the bottom of the chat window.
   *
   * @param {Event} event - The event object containing information about the scroll event.
   */
  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    const scrollTop = element.scrollTop;

    if (scrollTop === 0 && !this.isLoading) {
      this.isLoading = true; // Set loading state to true
      this.loadMoreMessages()
        .then((hasMessages) => {
          if (hasMessages) {
            setTimeout(() => {
              const msgContainer = document.querySelector(
                '.msg_card_body'
              ) as HTMLElement;
              msgContainer.scrollTop = 400; // Adjust scroll position
            }, 0);
          }
          this.isLoading = false; // Reset loading state
        })
        .catch((error) => {
          console.error('Error loading more messages:', error);
          this.isLoading = false; // Reset loading state even on error
        });
    }
  }

  /**
   * Toggles the visibility of the action menu.
   */
  toggleActionMenu() {
    this.showActionMenu = !this.showActionMenu;
  }
  /**
   * Stores a message to be sent to the recipient.
   *
   * @param {string} content - The content of the message to be sent.
   * @returns {void} - No return value.
   */
  storeMessage(content: string) {
    const messageData = {
      content: content,
      recipient_entity_id: this.recipient.id,
      recipient_type: '1',
    };
    this.messageQueryService
      .sendMessage(messageData)
      .subscribe((message) => {});
  }
  /**
   * Sends a message to the recipient.
   */
  sendMessage() {
    const message = (
      document.querySelector('.type_msg') as HTMLInputElement
    ).value.trim();
    if (message !== '') {
      const currentTime = new Date().toLocaleTimeString();
      this.managmentMessages.push({
        id_user: this.sender.id,
        text: message,
        time: currentTime,
      });
      (document.querySelector('.type_msg') as HTMLInputElement).value = '';
      setTimeout(() => {
        const msgContainer = document.querySelector(
          '.msg_card_body'
        ) as HTMLElement;
        msgContainer.scrollTop = msgContainer.scrollHeight;
      }, 0);
      this.storeMessage(message);
      this.chatService.setSendMessage = { typeChat: 1, send: true };
    }
  }
  /**
   * Retrieves the recipient user based on the provided user ID.
   *
   * @param {number} user_id - The unique identifier of the recipient user.
   */
  getRecipient(user_id) {
    this.userRepository.getUserForId(user_id).subscribe((response) => {
      this.recipient = response['user'];
      this.loadMessage();
    });
  }
  /**
   * Loads more messages for the current recipient.
   *
   * @param {number} [loadMore=false] - Indicates whether to load more messages or not.
   * @returns {Promise<boolean>} - A promise that resolves to true if more messages are loaded, false otherwise.
   */
  loadMoreMessages(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.messageService
        .getMessage(this.recipientId, this.page, this.perPage)
        .subscribe(
          (response) => {
            if (response['messages'].length === 0) {
              resolve(false);
            } else {
              this.messages = this.messages.concat(response['messages']);

              // Remove duplicates
              const hash = {};
              this.messages = this.messages.filter((current) => {
                const exists = !hash[current.id];
                hash[current.id] = true;
                return exists;
              });

              // Sort messages by created_at in ascending order
              this.messages.sort(
                (a, b) =>
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime()
              );

              this.page = this.page + 1;
              resolve(true);
            }
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  /**
   * Loads the messages for the current recipient.
   *
   * @param {boolean} [loadMore=false] - Indicates whether to load more messages or not.
   * @returns {void} - No return value.
   */
  loadMessage(loadMore: boolean = false) {
    this.messageService
      .getMessage(this.recipient.id, 1, this.perPage)
      .subscribe((response) => {
        this.messages = response['messages'];
        this.messages.sort(
          (b, a) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
  }
  /**
   * Loads the messages for the current recipient and marks them as read.
   */
  loadMessageRead() {
    const messageWitoutRead = this.messages.filter(
      (message) => !message.read || message.read.length === 0
    );
    const messageManagementWitoutRead = this.managmentMessages.filter(
      (message) => !message.read || message.read.length === 0
    );

    messageWitoutRead.forEach((message) => {
      if (!message.read) {
        message.read = [
          {
            user_id: 0,
            name: '',
            read_at: '',
          },
        ];
      } else if (message.read.length === 0) {
        message.read.push({
          user_id: 0,
          name: '',
          read_at: '',
        });
      }
    });

    messageManagementWitoutRead.forEach((message) => {
      if (!message.read) {
        message.read = [
          {
            user_id: 0,
            name: '',
            read_at: '',
          },
        ];
      } else if (message.read.length === 0) {
        message.read.push({
          user_id: 0,
          name: '',
          read_at: '',
        });
      }
    });
  }
  /**
   * Retrieves the time at which a message was created, formatted according to the current date and time.
   *
   * @param {string | Date} created_at - The timestamp of the message creation.
   * @returns {string} The formatted time string.
   */
  getMessageTime(created_at: string | Date): string {
    const messageDate = new Date(created_at);
    const today = new Date();

    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      const hour = messageDate.getHours() % 12 || 12;
      const minutes = messageDate.getMinutes();
      const ampm = messageDate.getHours() >= 12 ? 'PM' : 'AM';
      return `${hour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    } else {
      const month = messageDate.toLocaleString('default', { month: 'short' });
      const day = messageDate.getDate();
      const hour = messageDate.getHours() % 12 || 12;
      const minutes = messageDate.getMinutes();
      const ampm = messageDate.getHours() >= 12 ? 'PM' : 'AM';
      return `${day} ${month}, ${hour}:${minutes
        .toString()
        .padStart(2, '0')} ${ampm}`;
    }
  }

  /**
   * Subscribes to a topic for the given user ID.
   *
   * @param id - The ID of the user to subscribe to.
   */
  suscribeTopic(id) {
    const topic = 'user/' + id;
    this.mqttService.suscribeTopic(topic).subscribe((response) => {
      const message = JSON.parse(response.payload.toString());
      this.showRecipientMessage(message);
    });
  }
  /**
   * Displays the received message from the recipient.
   *
   * @param {object} message - The received message object containing content and created_at properties.
   */
  showRecipientMessage(message: object) {
    if (
      this.recipient &&
      message['recipient_type'] == 1 &&
      message['sender_id'] == this.recipient.id &&
      this.recipientId != 0
    ) {
      this.managmentMessages.push({
        id_user: this.recipient.id,
        text: message['content'],
        time: message['created_at'],
      });
      setTimeout(() => {
        const msgContainer = document.querySelector(
          '.msg_card_body'
        ) as HTMLElement;
        msgContainer.scrollTop = msgContainer.scrollHeight;
      }, 0);
      this.markAsRead(message['id']);
    }
  }

  /**
   * Marks the specified message as read.
   *
   * @param {number} message_id - The unique identifier of the message to be marked as read.
   * @returns {void} - No return value.
   */
  markAsRead(message_id: number) {
    const data = {
      id: message_id,
    };
    this.messageQueryService.markAsRead(data).subscribe((response) => {});
  }
  /**
   * Subscribes to a topic for the given user ID to receive read receipts.
   *
   * @param {number} id - The ID of the user to subscribe to.
   */
  suscribeTopicForReadMessage(id) {
    const topic = 'markAsRead/user/' + id;
    this.mqttService.suscribeTopic(topic).subscribe((response) => {
      const message = JSON.parse(response.payload.toString());
      const data = {
        user_id: message.reader_id,
        name: message.reader_name,
        read_at: message.read_at,
      };
      if (
        message.recipient_entity_id == this.recipientId &&
        message.recipient_type == 'user'
      ) {
        if (this.managmentMessages.length > 0) {
          this.managmentMessages[this.managmentMessages.length - 1].read =
            this.managmentMessages[this.managmentMessages.length - 1].read ||
            [];
          this.managmentMessages[this.managmentMessages.length - 1].read.push(
            data
          );
        }
      }
    });
  }
  /**
   * Subscribes to a topic for the given user ID to receive mark all message as read notifications.
   *
   * @param {number} id - The ID of the user to subscribe to.
   * @returns {void} - No return value.
   */
  suscribeTopicForMarkAllMessageAsRead(id) {
    const topic = 'markAllMessageAsRead/user/' + id;
    this.mqttService.suscribeTopic(topic).subscribe((response) => {
      const message = JSON.parse(response.payload.toString());
      if (
        this.recipient &&
        this.recipient.id == message.recipient &&
        id == message.sender
      ) {
        this.loadMessageRead();
      }
    });
  }
  /**
   * Subscribes to the chatId from the chatService and logs it to the console.
   */
  getChatId() {
    this.chatService.$getChatId.subscribe((id) => {
      this.recipient = undefined;
      this.messages = undefined;
      this.page = 2;
      const userId = id;
      this.recipientId = id;
      if (userId != 0) {
        this.managmentMessages = [];
        this.messages = [];
        this.getRecipient(userId);
        setTimeout(() => {
          this.cdr.detectChanges();

          if (this.dynamicElement) {
            this.scrollListener = this.onScroll.bind(this);
            this.dynamicElement.nativeElement.addEventListener(
              'scroll',
              this.scrollListener
            );
          }
          setTimeout(() => {
            const msgContainer = document.querySelector(
              '.msg_card_body'
            ) as HTMLElement;
            msgContainer.scrollTop = msgContainer.scrollHeight;
          }, 0);
        }, 500);
      }
    });
  }

  /**
   * Checks if the user has the necessary role to view the chat history.
   *
   * @returns {boolean} - True if the user has the 'administrador' or 'coordinador' role, otherwise false.
   */
  canViewChatHistory(): boolean {
    const role = this.authService.getChatInterno();
    if (role[0] == 'administrador' || role[0] == 'coordinador') {
      return true;
    }
    return false;
  }

  /**
   * Listens for the Escape key press event and navigates back to the default chat page.
   *
   * @param {KeyboardEvent} event - The keyboard event object.
   */

  private secuenciaTeclas: string[] = ['w', 'a', 's', 'd'];
  private indiceSecuencia = 0;

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.chatService.setChatId = 0;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const teclaPresionada = event.key.toLowerCase();

    if (teclaPresionada === this.secuenciaTeclas[this.indiceSecuencia]) {
      this.indiceSecuencia++;

      if (this.indiceSecuencia === this.secuenciaTeclas.length) {
        console.log('xd');
        this.indiceSecuencia = 0;
      }
    } else {
      this.indiceSecuencia = 0;
    }
  }
}
