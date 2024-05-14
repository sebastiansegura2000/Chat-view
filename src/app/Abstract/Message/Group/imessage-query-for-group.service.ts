import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageNotReadForGroup } from 'src/app/Interfaces/Message/countMessageNotReadForGroup.interface';
import { Message } from 'src/app/Interfaces/Message/message.inteface';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class IMessageQueryForGroupService {

  constructor(private httpService:HttpHandlerService) { }
  
  public abstract countMessageNotReadForGroup():Observable<MessageNotReadForGroup[]>;
  public abstract getMessage(group_id:number):Observable<Message[]>;
}
