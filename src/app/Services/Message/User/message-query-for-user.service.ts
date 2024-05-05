import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessageQueryForUserService } from 'src/app/Abstract/Message/imessage-query-for-user.service';
import { MessageNotRead } from 'src/app/Interfaces/Message/countMessageNoReadForUser.interface';
import { Message } from 'src/app/Interfaces/Message/message.inteface';
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

  public getMessage(user_id): Observable<Message[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + environment.token,
    });
    const params = new HttpParams()
      .set('recipient_entity_id', user_id)
      .set('recipient_type', '1');
    return this.http.get<Message[]>(environment.apiUrl + 'message/get', {
      headers,
      params,
    });
  }
}
