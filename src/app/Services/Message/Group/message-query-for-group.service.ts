import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessageQueryForGroupService } from 'src/app/Abstract/Message/Group/imessage-query-for-group.service';
import { MessageNotReadForGroup } from 'src/app/Interfaces/Message/countMessageNotReadForGroup.interface';
import { HttpHandlerService } from '../../Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export  class MessageQueryForGroupService implements IMessageQueryForGroupService {

  constructor(private httpService:HttpHandlerService) {}
  
  public countMessageNotReadForGroup(): Observable<MessageNotReadForGroup[]> {
    return this.httpService.getData('message/countMessagesNotReadOfGroup');
  }
}
