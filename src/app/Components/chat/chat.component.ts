import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/User/user.interface';
import { IUSerRepositoryService } from 'src/app/Abstract/User/repository/iuser-repository.service';
import { Subscription } from 'rxjs';
import { IMessageQueryForUserService } from 'src/app/Abstract/Message/User/imessage-query-for-user.service';
import { GlobalVariablesService } from 'src/app/Services/GlobalVariables/global-variables.service';
import { Message } from 'src/app/Interfaces/Message/message.inteface';
import { MqttHandlerService } from 'src/app/Services/Mqtt/mqtt-handler.service';
import { UserAuthServiceService } from 'src/app/Services/Auth/user-auth-service.service';
import { IMessageQueryService } from 'src/app/Abstract/Message/MessageQuery/imessage-query.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  recipient: User;
  sender: User;
  messages: Message[];
  showActionMenu: boolean = false;
  managmentMessages: {
    id_user: number;
    text: string;
    time: string;
    read?: object[];
  }[] = [];
  constructor(
    private routerNavegation: Router,
    private route: ActivatedRoute,
    private userRepository: IUSerRepositoryService,
    private messageService: IMessageQueryForUserService,
    private globalService: GlobalVariablesService,
    private mqttService: MqttHandlerService,
    private authService: UserAuthServiceService,
    private messageQueryService: IMessageQueryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.managmentMessages = [];
      this.messages = [];
      this.getRecipient(userId);
    });
    this.authService.UserAuth().subscribe((userData) => {
      this.globalService.userAuth.value.userData = userData.user;
      this.sender = this.globalService.userAuth.value.userData;
      this.suscribeTopic(this.sender.id);
      this.suscribeTopicForReadMessage(this.sender.id);
    });

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
   * Loads the messages for the current recipient.
   */
  loadMessage() {
    this.messageService.getMessage(this.recipient.id).subscribe((response) => {
      this.messages = response['messages'];
      this.messages.sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });
      setTimeout(() => {
        const msgContainer = document.querySelector(
          '.msg_card_body'
        ) as HTMLElement;
        msgContainer.scrollTop = msgContainer.scrollHeight;
      }, 0);
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
      message['recipient_type'] == 1 &&
      message['sender_id'] == this.recipient.id &&
      this.location.path() == '/chat/'+this.recipient.id
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

  suscribeTopicForReadMessage(id) {
    const topic = 'markAsRead/user/' + id;
    this.mqttService.suscribeTopic(topic).subscribe((response) => {
      const message = JSON.parse(response.payload.toString());
      const data = {
        user_id: message.reader_id,
        name: message.reader_name,
        read_at: message.read_at,
      };

      if (this.managmentMessages.length > 0) {
        this.managmentMessages[this.managmentMessages.length - 1].read =
          this.managmentMessages[this.managmentMessages.length - 1].read || [];
        this.managmentMessages[this.managmentMessages.length - 1].read.push(
          data
        );
      } else {
        console.error('No hay mensajes para marcar como leídos.');
      }
    });
  }

  /**
   * Listens for the Escape key press event and navigates back to the default chat page.
   *
   * @param {KeyboardEvent} event - The keyboard event object.
   */
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.routerNavegation.navigate(['/chat-def']);
  }
}
