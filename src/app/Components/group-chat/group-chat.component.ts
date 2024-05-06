// import { Component, OnInit } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent {

  showActionMenu: boolean = false;
  sentMessages: { text: string; time: string }[] = [];

  toggleActionMenu() {
    this.showActionMenu = !this.showActionMenu;
  }

  constructor(private router: Router) {}

  sendMessage() {
    const message = (
      document.querySelector('.type_msg') as HTMLInputElement
    ).value.trim();
    if (message !== '') {
      //console.log(message)
      const currentTime = new Date().toLocaleTimeString();
      this.sentMessages.push({ text: message, time: currentTime });
      (document.querySelector('.type_msg') as HTMLInputElement).value = '';
      setTimeout(() => {
        const msgContainer = document.querySelector('.msg_card_body') as HTMLElement;
        msgContainer.scrollTop = msgContainer.scrollHeight;
      }, 0);
    }
  }


  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.router.navigate(['/group-def']);
  }

}

