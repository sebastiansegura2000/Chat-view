import { Component, OnInit, HostListener, ChangeDetectorRef} from '@angular/core';
import { User } from 'src/app/Interfaces/User/user.interface';
import { GlobalVariablesService } from 'src/app/Services/GlobalVariables/global-variables.service';
import { UserService } from 'src/app/Abstract/User/service/user-service.service';
import { IMessageQueryForUserService } from 'src/app/Abstract/Message/User/imessage-query-for-user.service';
import { MqttHandlerService } from 'src/app/Services/Mqtt/mqtt-handler.service';
import { IMessageQueryService } from 'src/app/Abstract/Message/MessageQuery/imessage-query.service';
import { ChatService } from 'src/app/Services/Chat/chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  currentUser: any;
  filteredContacts: any[] = [];
  filteredContactsModal: any[] = [];
  filterValue: string = '';
  filterValueModal: string = '';
  users: User[];
  showChat: boolean = true;
  contactId: number = 0;
  visibleContacts: number = environment.visibleContacts;
  visibleContactsModal: number = environment.visibleContactsModal;
  loadingMoreContacts: boolean = false;
  thereAreChats: boolean = false;

  constructor(
    private userService: UserService,
    private globalService: GlobalVariablesService,
    private messageService: IMessageQueryForUserService,
    private mqttService: MqttHandlerService,
    private messageQueryService: IMessageQueryService,
    private cdRef: ChangeDetectorRef,
    private chatService: ChatService
  ) {}
  /**
   * Listens for the 'End' or 'Fin' key press event on the document.
   * When the event is triggered, it calls the `loadMoreContacts` and `loadMoreContactsModal` methods.
   *
   * @param {KeyboardEvent} event - The keyboard event object.
   */
  @HostListener('document:keydown.end', ['$event'])
  onEndKeyPress(event: KeyboardEvent) {
    if (event.key === 'End' || event.key === 'Fin') {
      this.loadMoreContacts();
      this.loadMoreContactsModal();
    }
  }
  /**
   * Checks if there are any chats to display.
   * If there are, sets the `thereAreChats` property to `true`.
   */
  checkIfThereAreChats() {
    this.thereAreChats = true;
    return true;
  }
  /**
   * Applies a filter to the 'filteredContacts' array based on the 'filterValue' property.
   * The 'filteredContacts' array is filtered to include only those contacts whose 'name' property contains the 'filterValue' (case-insensitive).
   */
  applyFilter() {
    if (this.users) {
      this.filteredContacts = this.users
        .filter((contact) =>
          contact.name.toLowerCase().includes(this.filterValue.toLowerCase())
        )
        .slice(0, this.visibleContacts);
    }
  }
  /**
   * Applies a filter to the 'filteredContactsModal' array based on the 'filterValueModal' property.
   * The 'filteredContactsModal' array is filtered to include only those contacts whose 'name' property contains the 'filterValueModal' (case-insensitive).
   *
   * @param {User[]} users - An array of User objects.
   */
  applyFilterModal() {
    if (this.users) {
      this.filteredContactsModal = this.users
        .filter((contact) =>
          contact.name
            .toLowerCase()
            .includes(this.filterValueModal.toLowerCase())
        )
        .slice(0, this.visibleContactsModal);
    }
  }
  /**
   * Increases the number of visible contacts in the main view by the specified amount.
   * Then, it applies the filter to the 'filteredContacts' array to show only the relevant contacts.
   *
   * @returns {void}
   */
  loadMoreContacts() {
    this.visibleContacts += environment.loadMoreContacts;
    this.applyFilter();
    this.loadingMoreContacts = false;
  }
  /**
   * Increases the number of visible contacts in the modal view by the specified amount.
   * Then, it applies the filter to the 'filteredContactsModal' array to show only the relevant contacts.
   *
   * @returns {void}
   */

  loadMoreContactsModal() {
    this.visibleContactsModal += environment.loadMoreContactsModal;
    this.applyFilterModal();
  }

  /**
   * Toggles the visibility of the chat view.
   */
  toggleChatView(): void {
    this.showChat = !this.showChat;
  }

  /**
   * Initializes the component and fetches the list of users, unread messages, and subscribes to the MQTT topic for the current user.
   */
  ngOnInit(): void {
    this.fetchUsers();
    this.fetchUnreadMessages();
    this.currentUser = this.globalService.userAuth.value;
    setTimeout(() => {
      this.suscribeTopic(this.currentUser.userData.id);
    }, 100);
    this.chatService.$getChatId.subscribe((id) => (this.contactId = id));
    this.chatService.$getSendMessage.subscribe((message) => {
      if (message['typeChat'] == 1 && message['send']) {
        this.fetchUsers();
        this.fetchUnreadMessages();
      }
    });
  }
  /**
   * Fetches the list of users from the server.
   */
  private fetchUsers(): void {
    this.userService.getUsers().subscribe((response) => {
      const sortedUsers = this.SortUsers(response['users']);
      this.users = sortedUsers;
      this.filteredContacts = sortedUsers.slice(0, this.visibleContacts);
      this.filteredContactsModal = sortedUsers.slice(0, this.visibleContactsModal);

      this.thereAreChats = false;
      this.cdRef.detectChanges();
    });
  }
  /**
   * Fetches the count of unread messages for the current user.
   */
  private fetchUnreadMessages(): void {
    this.messageService.countMessageNotReadForUser().subscribe((response) => {
      this.updateUnreadMessages(response['unreadMessages']);
    });
  }
  /**
   * Updates the unread messages count for each user in the 'users' array.
   *
   * @param unreadMessages - An array of unread messages. Each message object should have a 'sender_id' property and an 'unread_messages_count' property.
   */
  private updateUnreadMessages(unreadMessages: any[]): void {
    unreadMessages.forEach((message) => {
      const user = this.filteredContacts.find(
        (user) => user.id === message.sender_id
      );
      if (user) {
        user.unreadMessages = message.unread_messages_count;
      }
    });
  }
  /**
   * Sorts the users array based on the last message's creation date.
   *
   * @param users - An array of User objects.
   * @returns An array of User objects sorted by the last message's creation date.
   */
  private SortUsers(users: User[]): User[] {
    const usersWithLastMessage = users.filter((user) => user.lastMessage);
    usersWithLastMessage.sort((a, b) => {
      const dateA = a.lastMessage
        ? new Date(a.lastMessage.created_at).getTime()
        : 0;
      const dateB = b.lastMessage
        ? new Date(b.lastMessage.created_at).getTime()
        : 0;
      return dateB - dateA;
    });
    const usersWithoutLastMessage = users.filter((user) => !user.lastMessage);
    return [...usersWithLastMessage, ...usersWithoutLastMessage];
  }


  formatMessageDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    const isToday = date.getDate() === now.getDate() &&
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear();

    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
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
      setTimeout(() => {
        this.fetchUsers();
        this.fetchUnreadMessages();
      }, 15);
    });
  }
  /**
   * Marks all messages as read for the specified user.
   *
   * @param id - The ID of the user to mark all messages as read.
   */
  markAllMessagesAsRead(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (this.users[userIndex]['unreadMessages'] > 0) {
      const data = {
        id_sender: id,
        type: 1,
      };
      this.messageQueryService
        .markAllMessgesAsRead(data)
        .subscribe((response) => {});

      if (userIndex !== -1) {
        this.users[userIndex]['unreadMessages'] = 0;
      } else {
        console.error('Usuario no encontrado.');
      }
    }
  }

  /**
   * Sets the ID of the chat to be displayed.
   *
   * @param id - The ID of the chat to be displayed.
   * @returns {void}
   *
   */
  setIdOfChat(id) {
    if (id != this.contactId) {
      this.chatService.setChatId = id;
      this.markAllMessagesAsRead(id);
    }
  }
}
