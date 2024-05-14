import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessageQueryForUserService } from 'src/app/Abstract/Message/User/imessage-query-for-user.service';
import { MessageNotRead } from 'src/app/Interfaces/Message/countMessageNoReadForUser.interface';
import { Message } from 'src/app/Interfaces/Message/message.inteface';
import { HttpHandlerService } from '../../Http/http-handler.service';

@Injectable({
  providedIn: 'root',
})
export class MessageQueryForUserService implements IMessageQueryForUserService {
  constructor(private httpService: HttpHandlerService) {}
  /**
   * Counts the number of unread messages for the current user.
   *
   * @returns An Observable that emits an array of `MessageNotRead` objects.
   */
  public countMessageNotReadForUser(): Observable<MessageNotRead[]> {
    return this.httpService.getData('message/countMessagesNotRead');
  }
  /**
   * Retrieves a list of messages for the specified user.
   *
   * @param {string} user_id - The ID of the user for whom the messages should be retrieved.
   * @returns {Observable<Message[]>} - An Observable that emits an array of `Message` objects.
   */
  public getMessage(user_id): Observable<Message[]> {
    const data = {
      recipient_entity_id: user_id,
      recipient_type: '1',
    };
    return this.httpService.getData('message/get', data);
  }
  /**
   * Retrieves a list of message history for the specified user.
   *
   * @param {number} user_id - The ID of the user for whom the message history should be retrieved.
   * @returns {Observable<Message[]>} - An Observable that emits an array of `Message` objects.
   */
  public getMessageHistory(user_id: number): Observable<Message[]> {
    const data = {
      id: user_id,
    };

    return this.httpService.getData('message/get-history', data);
  }
}
