import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IMessageQueryForGroupService } from 'src/app/Abstract/Message/Group/imessage-query-for-group.service';
import { MessageNotReadForGroup } from 'src/app/Interfaces/Message/countMessageNotReadForGroup.interface';
import { HttpHandlerService } from '../../Http/http-handler.service';
import { Message } from 'src/app/Interfaces/Message/message.inteface';

@Injectable({
  providedIn: 'root',
})
export class MessageQueryForGroupService
  implements IMessageQueryForGroupService
{
  private activeChat:Subject<Message>
  constructor(private httpService: HttpHandlerService) {

  }

  get $getActiveChat():Observable{return this.activeChat}

  set setActiveChat(message:Message) {
    this.activeChat.next(message)
  }


  /**
   * Counts the number of unread messages for a specific group.
   *
   * @returns An Observable that emits an array of `MessageNotReadForGroup` objects.
   */
  public countMessageNotReadForGroup(): Observable<MessageNotReadForGroup[]> {
    return this.httpService.getData('message/countMessagesNotReadOfGroup');
  }
  /**
   * Retrieves a list of messages for a specific group.
   *
   * @param {number} group_id - The ID of the group to retrieve messages for.
   * @returns {Observable<Message[]>} - An Observable that emits an array of `Message` objects.
   */
  public getMessage(group_id:number): Observable<Message[]> {
    const data = {
      recipient_entity_id: group_id,
      recipient_type: 2,
    };
    return this.httpService.getData('message/get', data);
  }
}
