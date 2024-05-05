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
  constructor(private httpService:HttpHandlerService) {}
  /**
   * Counts the number of unread messages for the current user.
   *
   * @returns An Observable that emits an array of `MessageNotRead` objects.
   */
  public countMessageNotReadForUser(): Observable<MessageNotRead[]> {
    return this.httpService.getData('message/countMessagesNotRead');
  }

  public getMessage(user_id): Observable<Message[]> {
    const data = {
      recipient_entity_id: user_id,
      recipient_type: '1',
    }
    return this.httpService.getData('message/get',data);
  }
}
