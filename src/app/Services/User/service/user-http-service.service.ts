import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../Interfaces/User/user.interface';
import { UserService } from '../../../Abstract/User/service/user-service.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService extends UserService {
  constructor(private http: HttpClient) {
    super();
  }
  /**
   * Retrieves a list of users from the API.
   *
   * @returns An Observable of an array of User objects.
   */
  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + environment.token,
    });

    return this.http.get<User[]>(environment.apiUrl + 'user/get-users', {
      headers,
    });
  }
}
