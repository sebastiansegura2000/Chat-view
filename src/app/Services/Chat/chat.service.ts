import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chatId: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get $getChatId(): Observable<number> {
    return this.chatId.asObservable();
  }

  set setChatId(chatId) {
    this.chatId.next(chatId);
  }

  private sendMessage: BehaviorSubject<object> = new BehaviorSubject<object>({
    typeChat: 0,
    send: false,
  });

  get $getSendMessage(): Observable<object> {
    return this.sendMessage.asObservable();
  }
  set setSendMessage(message) {
    this.sendMessage.next(message);
  }
}
