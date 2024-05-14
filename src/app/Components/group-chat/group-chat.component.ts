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
    read?: object[];
  }[] = [];
  userAuth: User;
  messages: Message[];
  groupId: number;
  subscription: Subscription;
  subscriptionForMarkAllMessageAsRead: Subscription;
  groupParticipants: participant[];
  constructor(
    private groupService: IGroupAdvancedService,
    private messageService: IMessageQueryForGroupService,
    private globalService: GlobalVariablesService,
    private authService: UserAuthServiceService,
    private mqttService: MqttHandlerService,
    private messageQueryService: IMessageQueryService,
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
      this.suscribeForMarkMessageAsRead(this.userAuth.id);
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
   * Retrieves the list of participants for the given group.
   *
   * @param {number} group_id - The ID of the group for which to retrieve participants.
   * @returns {void} - No return value. The participants are stored in the `groupParticipants` property.
   */
  getParticipants(group_id: number) {
    this.groupService
      .getParticipantsForGroup(group_id)
      .subscribe((response) => {
        this.groupParticipants = response['participants'];
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
  /**
   * Marks a message as read.
   *
   * @param {number} id - The ID of the message to be marked as read.
   * @returns {void} - No return value.
   */
  markAsRead(id) {
    const data = {
      id: id,
    };
    this.messageQueryService.markAsRead(data).subscribe(() => {});
  }
  /**
   * Subscribes to the MQTT topic for marking messages as read for the current user.
   *
   * @param id - The ID of the user for which to subscribe to the MQTT topic.
   * @returns {void} - No return value.
   */
  suscribeForMarkMessageAsRead(id) {
    const topic = 'markAsRead/user/' + id;
    this.mqttService.suscribeTopic(topic).subscribe((response) => {
      const message = JSON.parse(response.payload.toString());
      if (
        this.group &&
        this.group.id == message.recipient_entity_id &&
        message.recipient_type == 'group'
      ) {
        const data = {
          user_id: message.reader_id,
          name: message.reader_name,
          read_at: message.read_at,
        };
        const lastMessage =
          this.managmentMessages[this.managmentMessages.length - 1];
        if (lastMessage && lastMessage.read) {
          const alreadyRead = lastMessage.read.some(
            (item) => item['user_id'] === data.user_id
          );
          if (!alreadyRead) {
            lastMessage.read.push(data);
          }
        } else if (lastMessage && !lastMessage.read) {
          lastMessage.read = [];
          lastMessage.read.push(data);
        } else {
          console.error('No hay mensajes para marcar como leídos.');
        }
      }
    });
  }
  /**
   * Subscribes to the MQTT topic for marking all messages as read for the current group chat.
   *
   * @param id - The ID of the group for which to subscribe to the MQTT topic.
   * @returns {void} - No return value.
   */
  suscribeForMarkAllMessageAsRead(id) {
    const topic = 'markAllMessageAsRead/group/' + id;
    this.subscriptionForMarkAllMessageAsRead = this.mqttService
      .suscribeTopic(topic)
      .subscribe((response) => {
        const message = JSON.parse(response.payload.toString());
        if (this.group && this.group.id == message.sender) {
          this.markallMessageAsRead(message);
        }
      });
  }
  /**
   * Marks all messages as read for the current user in the chat.
   *
   * @param {object} message_info - An object containing information about the message to be marked as read.
   * @returns {void} - No return value.
   */
  markallMessageAsRead(message_info: object) {
    const filteredManagmentMessages = this.managmentMessages.filter(
      (message) =>
        message.sender_id === this.userAuth.id &&
        (!message.read ||
          !message.read.some(
            (info) => info['user_id'] === message_info['recipient']
          ))
    );
    const data = {
      user_id: message_info['recipient'],
      name: message_info['recipient_name'],
      read_at: message_info['created_at'],
    };
    filteredManagmentMessages.forEach((message) => {
      if (message.read) {
        message.read.push(data);
      } else {
        message.read = [];
        message.read.push(data);
      }
    });

    const filteredMessages = this.messages.filter(
      (message) =>
        message.sender_id === this.userAuth.id &&
        (!message.read ||
          !message.read.some(
            (info) => info.user_id === message_info['recipient']
          ))
    );

    filteredMessages.forEach((message) => {
      if (message.read) {
        message.read.push(data);
      } else {
        message.read = [];
        message.read.push(data);
      }
    });
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
        this.getParticipants(id);
        this.managmentMessages = [];
        this.messages = [];
        this.getGroupForId(id);
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
        if (this.subscriptionForMarkAllMessageAsRead) {
          this.subscriptionForMarkAllMessageAsRead.unsubscribe();
        }
        setTimeout(() => {
          this.suscribeTopic(id);
          this.suscribeForMarkAllMessageAsRead(id);
        }, 500);
      }
    });
  }
  /**
   * Checks if the user has the necessary permissions to view the group information.
   *
   * @returns {boolean} - True if the user has the necessary permissions, false otherwise.
   */
  canViewGroupInfo() {
    if (this.groupId != 0) {
      const role = this.authService.getChatInterno();
      if (
        role[0] == 'administrador' ||
        role[0] == 'coordinador' ||
        role[0] == 'supervisor' ||
        (this.group && this.userAuth.id == this.group.onwer_id)
      ) {
        return true;
      }
      return false;
    }
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
