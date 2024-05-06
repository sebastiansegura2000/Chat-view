// import { Component, OnInit } from '@angular/core';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css'],
})
export class GroupChatComponent implements OnInit {
  showActionMenu: boolean = false;


  constructor(
    private routerNavegation: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const group_id = params['id'];
      console.log(group_id);
    });
  }


  toggleActionMenu() {
    this.showActionMenu = !this.showActionMenu;
  }
  
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.routerNavegation.navigate(['/group-def']);
  }
}
