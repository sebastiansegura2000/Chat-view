import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageNotRead } from 'src/app/Interfaces/Message/countMessageNoReadForUser.interface';
import { Message } from 'src/app/Interfaces/Message/message.inteface';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class IMessageQueryForUserService {
  constructor(private httpService:HttpHandlerService) { }
  public abstract countMessageNotReadForUser():Observable<MessageNotRead[]>;
  public abstract getMessage(user_id):Observable<Message[]>;
  public abstract getMessageHistory(user_id:number):Observable<Message[]>;
}
