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

  toggleActionMenu() {
    this.showActionMenu = !this.showActionMenu;
  }

  constructor(private router: Router) {}


  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.router.navigate(['/group-def']);
  }

}

