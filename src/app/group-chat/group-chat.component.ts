import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {

  showActionMenu: boolean = false;

  toggleActionMenu() {
    this.showActionMenu = !this.showActionMenu;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
