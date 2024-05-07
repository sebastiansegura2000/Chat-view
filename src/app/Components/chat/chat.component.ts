import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/User/user.interface';
import { IUSerRepositoryService } from 'src/app/Abstract/User/repository/iuser-repository.service';
import { Subscription } from 'rxjs';
import { IMessageQueryForUserService } from 'src/app/Abstract/Message/User/imessage-query-for-user.service';
import { GlobalVariablesService } from 'src/app/Services/GlobalVariables/global-variables.service';
import { Message } from 'src/app/Interfaces/Message/message.inteface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  recipient: User;
  sender: User;
  messages: Message;
  private routeSub: Subscription;
  showActionMenu: boolean = false;
  sentMessages: { text: string; time: string }[] = [];
  constructor(
    private routerNavegation: Router,
    private route: ActivatedRoute,
    private userRepository: IUSerRepositoryService,
    private messageService: IMessageQueryForUserService,
    private globalService: GlobalVariablesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.getRecipient(userId);
    });
    this.sender = this.globalService.userAuth.value.userData;
  }
  /**
   * Toggles the visibility of the action menu.
   */
  toggleActionMenu() {
    this.showActionMenu = !this.showActionMenu;
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
      this.sentMessages.push({ text: message, time: currentTime });
      (document.querySelector('.type_msg') as HTMLInputElement).value = '';
      setTimeout(() => {
        const msgContainer = document.querySelector('.msg_card_body') as HTMLElement;
        msgContainer.scrollTop = msgContainer.scrollHeight;
      }, 0);
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
      setTimeout(() => {
        const msgContainer = document.querySelector('.msg_card_body') as HTMLElement;
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
   * Listens for the Escape key press event and navigates back to the default chat page.
   *
   * @param {KeyboardEvent} event - The keyboard event object.
   */
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.routerNavegation.navigate(['/chat-def']);
  }
}
