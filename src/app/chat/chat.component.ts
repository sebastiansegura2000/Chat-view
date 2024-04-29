import { Component } from '@angular/core';
import { ApiService } from '../config.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  showActionMenu: boolean = false;
  data: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.apiService.getDataWithHeaders('http://127.0.0.1:80/api/group/get')
      .subscribe({
        next: (response) => {
          this.data = response;
        },
        error: (error) => {
          console.error('Error loading data:', error);
        }
      });
    }
  toggleActionMenu() {
    this.showActionMenu = !this.showActionMenu;
    console.log(this.data);
  }
}
