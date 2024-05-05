// import { Component } from '@angular/core';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/User/user.interface';
import { IUSerRepositoryService } from 'src/app/Abstract/User/repository/iuser-repository.service';
import { Subscription } from 'rxjs';
import { IMessageQueryForUserService } from 'src/app/Abstract/Message/User/imessage-query-for-user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  recipient: User;
  private routeSub: Subscription;
  showActionMenu: boolean = false;
  constructor(
    private routerNavegation: Router,
    private route: ActivatedRoute,
    private userRepository: IUSerRepositoryService,
    private messageService:IMessageQueryForUserService
  ) {}

  ngOnInit(): void {
    this.routeSuscribe();
  }

  toggleActionMenu() {
    this.showActionMenu = !this.showActionMenu;
  }

  sentMessages: { text: string; time: string }[] = [];

  sendMessage() {
    const message = (
      document.querySelector('.type_msg') as HTMLInputElement
    ).value.trim();
    if (message !== '') {
      const currentTime = new Date().toLocaleTimeString();
      this.sentMessages.push({ text: message, time: currentTime });
      (document.querySelector('.type_msg') as HTMLInputElement).value = '';
      // Desplazar el scroll hacia abajo para mostrar el último mensaje enviado
      setTimeout(() => {
        const msgContainer = document.querySelector(
          '.msg_card_body'
        ) as HTMLElement;
        msgContainer.scrollTop = msgContainer.scrollHeight;
      }, 0);
    }
  }

  // sendMessage() {
  //   const message = (document.querySelector('.type_msg') as HTMLInputElement).value;
  //   console.log(message)
  //   (document.querySelector('.type_msg') as HTMLInputElement).value = '';
  // }

  getRecipient(user_id) {
    this.userRepository.getUserForId(user_id).subscribe((response) => {
      this.recipient = response.user
    });
  }

  routeSuscribe(){
    this.routeSub = this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.getRecipient(userId);
    });
  }




  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.routerNavegation.navigate(['/chat-def']);
  }
}
