import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUSerRepositoryService } from 'src/app/Abstract/User/iuser-repository.service';
import { User } from 'src/app/Interfaces/User/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService implements IUSerRepositoryService {

  constructor(private http: HttpClient) {}

  /**
   * @description This method retrieves the groups for the authenticated user.
   * @returns An Observable of an array of Group objects.
   */
  getUserForId(user_id): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + environment.token,
    });
    const params = new HttpParams().set('id', user_id);
    return this.http.get<User>(`${environment.apiUrl}user/get-user`, {
      headers: headers,
      params: params
    });
  }
}
