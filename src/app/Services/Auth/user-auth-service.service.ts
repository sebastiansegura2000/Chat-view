import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHandlerService } from '../Http/http-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthServiceService {
  private readonly USER_KEY = 'currentUser';
  private jwtDecode: BehaviorSubject<object> = new BehaviorSubject<object>({
    user: {},
  });
  constructor(
    private http: HttpClient,
    private httpService: HttpHandlerService
  ) {}

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
    return this.http.get(environment.apiUrl + 'user/get-user', { headers });
  }

  /**
   * Checks if the user has the required roles to access the chat-interno feature.
   *
   * @param requiredRoles - An array of required roles for accessing the chat-interno feature.
   * @returns A boolean value indicating whether the user has the required roles.
   */
  hasChatInterno(requiredRoles: string[]): boolean {
    const prefix = 'chat-interno::';
    const user = this.jwtDecode.value['user'];
    if (user && user.roles) {
      return requiredRoles.some((requiredRole) =>
        user.roles.includes(`${prefix}${requiredRole}`)
      );
    }
    return false;
  }
  /**
   * getChatInterno method retrieves the roles related to the chat-interno feature from the user's roles.
   *
   * @returns {string[]} - An array of strings containing the roles related to the chat-interno feature.
   */
  getChatInterno(): string[] {
    const prefix = 'chat-interno::';
    const user = this.jwtDecode.value['user'];
    if (user && user.roles) {
      return user.roles
        .filter((role) => role.startsWith(prefix))
        .map((role) => role.split('::')[1]);
    }
    return [];
  }

  /**
   * Retrieves the JWT-based user data from the server.
   *
   * @returns {Observable<any>} - An Observable containing the JWT-based user data.
   *
   */
  getDataJwt(): Observable<any> {
    return this.httpService.getData('user/get-user-jwt');
  }

  set setJwtDecode(data: object) {
    this.jwtDecode.next(data);
  }
}
