import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessageQueryService } from 'src/app/Abstract/Message/MessageQuery/imessage-query.service';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root',
})
export class MessageQueryService implements IMessageQueryService {
  constructor(private httpService: HttpHandlerService) {}
  /**
   * Sends a message to the server.
   *
   * @param {object} MessageData - The data to be sent as a message.
   * @returns {Observable<any>} - An observable that emits the response from the server upon successful message sending.
   */
  sendMessage(MessageData: object): Observable<any> {
    return this.httpService.postData('message/send', MessageData);
  }
}
