import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthServiceService {
  private readonly USER_KEY = 'currentUser';

  constructor(private http: HttpClient) {}

  /**
   * UserAuth method is responsible for fetching the authenticated user data.
   * It sends a GET request to the specified API endpoint with the necessary Authorization header.
   *
   * @returns {Observable<any>} - An Observable containing the authenticated user data.
   */
  UserAuth(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + environment.token,
    });
    return this.http.get(environment.apiUrl +'user/get-user', { headers })
  }

  
}
