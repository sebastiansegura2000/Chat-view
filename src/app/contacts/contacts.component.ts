import { Component, OnInit } from '@angular/core';
import { UserHttpService } from '../Services/User/user-http-service.service';
import { User } from '../Interfaces/User/user.interface';
import { GlobalVariablesService } from '../GlobalVariables/global-variables.service';
import { MessageQueryForUserService } from '../Services/Message/message-query-for-user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  constructor(
    private userService: UserHttpService,
    private globalService: GlobalVariablesService,
    private messageService: MessageQueryForUserService
  ) {}

  // contacts = [
  //   { name: 'Khalid', online: true },
  //   { name: 'Taherah Big', online: false },
  //   { name: 'Sami Rafi', online: true },
  //   { name: 'Nargis Hawa', online: false },
  //   { name: 'Rashid Samim', online: false }
  // ];

  // filteredContacts: any[] = [];
  // filterValue: string = '';


  // applyFilter() {
  //   this.filteredContacts = this.contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(this.filterValue.toLowerCase())
  //   );
  // }

  users: User[];
  showChat: boolean = true;

  toggleChatView(): void {
    this.showChat = !this.showChat;
  }

  currentUser: any;

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchUnreadMessages();
    this.currentUser = this.globalService.userAuth.value;
    // this.filteredContacts = this.contacts;
  }
  /**
   * Fetches the list of users from the server.
   */
  private fetchUsers(): void {
    this.userService.getUsers().subscribe((response) => {
      this.users = this.SortUsers(response.users);
    });
  }
  /**
   * Fetches the count of unread messages for the current user.
   */
  private fetchUnreadMessages(): void {
    this.messageService.countMessageNotReadForUser().subscribe((response) => {
      this.updateUnreadMessages(response.unreadMessages);
    });
  }
  /**
   * Updates the unread messages count for each user in the 'users' array.
   *
   * @param unreadMessages - An array of unread messages. Each message object should have a 'sender_id' property and an 'unread_messages_count' property.
   */
  private updateUnreadMessages(unreadMessages: any[]): void {
    unreadMessages.forEach((message) => {
      const user = this.users.find((user) => user.id === message.sender_id);
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
}
