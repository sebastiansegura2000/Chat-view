// import { Component } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  showActionMenu: boolean = false;

  constructor(private router: Router) {}

  toggleActionMenu() {
    this.showActionMenu = !this.showActionMenu;
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.router.navigate(['/chat-def']);
  }

}

