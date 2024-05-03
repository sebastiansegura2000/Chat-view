import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  // contacts = [
  //   { name: 'Khalid', online: true },
  //   { name: 'Taherah Big', online: false },
  //   { name: 'Sami Rafi', online: true },
  //   { name: 'Nargis Hawa', online: false },
  //   { name: 'Rashid Samim', online: false }
  // ];

  // filteredContacts: any[] = [];
  // filterValue: string = '';

  constructor() { }

  ngOnInit(): void {
    // this.filteredContacts = this.contacts;
  }

  // applyFilter() {
  //   this.filteredContacts = this.contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(this.filterValue.toLowerCase())
  //   );
  // }

  showChat: boolean = true;

  toggleChatView(): void {
    this.showChat = !this.showChat;
  }

}
