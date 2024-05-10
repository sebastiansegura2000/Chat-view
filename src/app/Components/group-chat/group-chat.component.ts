import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IGroupAdvancedService } from 'src/app/Abstract/Group/Advanced/igroup-advanced.service';
import { IMessageQueryForGroupService } from 'src/app/Abstract/Message/Group/imessage-query-for-group.service';
import { IMessageQueryService } from 'src/app/Abstract/Message/MessageQuery/imessage-query.service';
import { Group } from 'src/app/Interfaces/Group/group.interface';
import { Message } from 'src/app/Interfaces/Message/message.inteface';
import { User } from 'src/app/Interfaces/User/user.interface';
import { UserAuthServiceService } from 'src/app/Services/Auth/user-auth-service.service';
import { ChatService } from 'src/app/Services/Chat/chat.service';
import { GlobalVariablesService } from 'src/app/Services/GlobalVariables/global-variables.service';
import { MqttHandlerService } from 'src/app/Services/Mqtt/mqtt-handler.service';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css'],
})
export class GroupChatComponent implements OnInit {
  showActionMenu: boolean = false;
  group: Group;
  managmentMessages: {
    sender_id: number;
    text: string;
    time: string;
    sender_name?: string;
  }[] = [];
  userAuth: User;
  messages: Message[];
  groupId: number;
  subscription: Subscription;
  constructor(
    private groupService: IGroupAdvancedService,
    private messageService: IMessageQueryForGroupService,
    private globalService: GlobalVariablesService,
    private authService: UserAuthServiceService,
    private mqttService: MqttHandlerService,
    private messageQueryService: IMessageQueryService,
    private location: Location,
    private chatService: ChatService
  ) {}
  /**
   * Initializes the component when it is created.
   * Retrieves the group data and user authentication data.
   */
  ngOnInit(): void {
    this.getGroupId();
    this.authService.UserAuth().subscribe((userData) => {
      this.globalService.userAuth.value.userData = userData.user;
      this.userAuth = this.globalService.userAuth.value.userData;
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
      recipient_entity_id: this.group.id,
      recipient_type: '2',
    };
    this.messageQueryService
      .sendMessage(messageData)
      .subscribe((message) => {});
  }

  /**
   * Sends a message to the group chat.
   *
   * @param none
   * @returns none
   */
  sendMessage() {
    const message = (
      document.querySelector('.type_msg') as HTMLInputElement
    ).value.trim();
    if (message !== '') {
      const currentTime = new Date().toLocaleTimeString();
      this.managmentMessages.push({
        sender_id: this.userAuth.id,
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
   * Sends a message to the group chat.
   *
   * @param none
   * @returns none
   */
  getGroupForId(groupId: number) {
    this.groupService.getGroupForId(groupId).subscribe((response) => {
      this.group = response['group'];
      this.loadMessage();
    });
  }
  /**
   * Loads the messages for the current group chat.
   *
   * @param none
   * @returns none
   */
  loadMessage() {
    this.messageService.getMessage(this.group.id).subscribe((response) => {
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
   * Formats the time of a message for display in the chat.
   *
   * @param created_at The creation date and time of the message.
   * @returns The formatted time string.
   */
  getMessageTime(created_at: string | Date): string {
    const messageDate = new Date(created_at);
    const today = new Date();

    const hour = messageDate.getHours() % 12 || 12;
    const minutes = messageDate.getMinutes();
    const ampm = messageDate.getHours() >= 12 ? 'PM' : 'AM';

    const isToday =
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear();

    return isToday
      ? `${hour}:${minutes.toString().padStart(2, '0')} ${ampm}`
      : `${messageDate.toLocaleDateString()}, ${hour}:${minutes
          .toString()
          .padStart(2, '0')} ${ampm}`;
  }
  /**
   * Subscribes to the MQTT topic for the current group chat.
   *
   * @param none
   * @returns none
   */
  suscribeTopic(id) {
    const topic = 'group/' + id;
    this.subscription = this.mqttService
      .suscribeTopic(topic)
      .subscribe((response) => {
        const message = JSON.parse(response.payload.toString());
        this.showMessageRecipient(message);
      });
  }
  /**
   * Displays a received message in the chat.
   *
   * @param {object} message - The received message object.
   * @returns {void} - No return value.
   * @private
   */
  showMessageRecipient(message: object) {
    if (
      this.group &&
      this.userAuth.id != message['sender_id'] &&
      this.group.id == message['recipient_entity_id'] &&
      message['recipient_type'] == 2 &&
      this.groupId != 0
    ) {
      this.managmentMessages.push({
        sender_id: message['sender_id'],
        text: message['content'],
        time: message['created_at'],
        sender_name: message['sender_name'],
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

  markAsRead(id){
    const data = {
      id: id,
    };
    this.messageQueryService.markAsRead(data).subscribe(()=>{});
  }

  /**
   * Retrieves the ID of the current chat group.
   *
   * @returns {void} - No return value.
   */
  getGroupId(): void {
    this.chatService.$getChatGroupId.subscribe((id) => {
      this.group = undefined;
      this.groupId = id;
      if (id != 0) {
        this.managmentMessages = [];
        this.messages = [];
        this.getGroupForId(id);
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
        setTimeout(() => {
          this.suscribeTopic(id);
        }, 500);
      }
    });
  }

  /**
   * Listens for the Escape key press event on the document.
   * When the Escape key is pressed, it navigates the user back to the group definition page.
   *
   * @param {KeyboardEvent} event - The keyboard event object.
   */
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.chatService.setChatGroupId = 0;
  }
}
