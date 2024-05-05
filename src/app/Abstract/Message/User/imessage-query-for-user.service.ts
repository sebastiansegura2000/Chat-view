import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageNotRead } from 'src/app/Interfaces/Message/countMessageNoReadForUser.interface';
import { Message } from 'src/app/Interfaces/Message/message.inteface';

@Injectable({
  providedIn: 'root'
})
export abstract class IMessageQueryForUserService {
  constructor(private http: HttpClient) { }
  public abstract countMessageNotReadForUser():Observable<MessageNotRead[]>;
  public abstract getMessage(user_id):Observable<Message[]>;
}
