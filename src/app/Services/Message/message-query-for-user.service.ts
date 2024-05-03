import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessageQueryForUserService } from 'src/app/Abstract/Message/imessage-query-for-user.service';
import { MessageNotRead } from 'src/app/Interfaces/Message/countMessageNoReadForUser.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageQueryForUserService implements IMessageQueryForUserService {
  constructor(private http: HttpClient) {}
  /**
   * Counts the number of unread messages for the current user.
   *
   * @returns An Observable that emits an array of `MessageNotRead` objects.
   */
  public countMessageNotReadForUser(): Observable<MessageNotRead[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + environment.token,
    });

    return this.http.get<MessageNotRead[]>(
      environment.apiUrl + 'message/countMessagesNotRead',
      { headers }
    );
  }
}
