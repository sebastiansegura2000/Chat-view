import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  showChat: boolean = true;

  toggleChatView(): void {
    this.showChat = !this.showChat;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
