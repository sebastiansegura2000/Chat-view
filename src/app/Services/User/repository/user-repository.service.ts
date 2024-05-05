import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUSerRepositoryService } from 'src/app/Abstract/User/repository/iuser-repository.service';
import { User } from 'src/app/Interfaces/User/user.interface';
import { HttpHandlerService } from '../../Http/http-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryService implements IUSerRepositoryService {
  constructor(private httpService: HttpHandlerService) {}

  /**
   * Retrieves a user by their ID.
   *
   * @param {number} user_id - The unique identifier of the user to retrieve.
   * @returns {Observable<User>} - An observable that emits the user object if the request is successful, or an error if it fails.
   */
  getUserForId(user_id): Observable<User> {
    const data = {
      id: user_id,
    };
    return this.httpService.getData('user/get-user', data);
  }
}
