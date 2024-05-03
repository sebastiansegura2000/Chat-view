import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageNotReadForGroup } from 'src/app/Interfaces/Message/countMessageNotReadForGroup.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class IMessageQueryForGroupService {

  constructor(private http: HttpClient) { }
  
  public abstract countMessageNotReadForGroup():Observable<MessageNotReadForGroup[]>;
}
