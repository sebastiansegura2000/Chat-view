// import { Component } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {

  showActionMenu: boolean = false;

  constructor(private router: Router) {}

  toggleActionMenu() {
    this.showActionMenu = !this.showActionMenu;
  }


    sentMessages: { text: string, time: string }[] = [];

    sendMessage() {
      const message = (document.querySelector('.type_msg') as HTMLInputElement).value.trim();
      if (message !== '') {
        const currentTime = new Date().toLocaleTimeString();
        this.sentMessages.push({ text: message, time: currentTime });
        (document.querySelector('.type_msg') as HTMLInputElement).value = '';
        // Desplazar el scroll hacia abajo para mostrar el último mensaje enviado
        setTimeout(() => {
          const msgContainer = document.querySelector('.msg_card_body') as HTMLElement;
          msgContainer.scrollTop = msgContainer.scrollHeight;
        }, 0);
      }
    }

    // sendMessage() {
    //   const message = (document.querySelector('.type_msg') as HTMLInputElement).value;
    //   console.log(message)
    //   (document.querySelector('.type_msg') as HTMLInputElement).value = '';
    // }




  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.router.navigate(['/chat-def']);
  }

}

