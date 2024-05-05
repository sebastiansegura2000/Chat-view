import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../Interfaces/User/user.interface';
import { UserService } from '../../../Abstract/User/service/user-service.service';
import { HttpHandlerService } from '../../Http/http-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService extends UserService {
  constructor(private httpService: HttpHandlerService) {
    super();
  }
  /**
   * Retrieves a list of users from the API.
   *
   * @returns An Observable of an array of User objects.
   */
  getUsers(): Observable<User[]> {
    return this.httpService.getData('user/get-users');
  }
}
