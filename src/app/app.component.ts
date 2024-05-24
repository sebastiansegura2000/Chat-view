import { Component, HostListener } from '@angular/core';
import { log } from 'console';
import { UserAuthServiceService } from './Services/Auth/user-auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'chat-app';
  constructor(private AuthService: UserAuthServiceService) {
    this.getDataWithJWT();
  }

  /**
   * Retrieves data using the JWT token and sets the decoded JWT data in the service.
   */
  getDataWithJWT() {
    this.AuthService.getDataJwt().subscribe((data) => {
      this.AuthService.setJwtDecode = data;
    });
  }
}
