import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageNotReadForGroup } from 'src/app/Interfaces/Message/countMessageNotReadForGroup.interface';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class IMessageQueryForGroupService {

  constructor(private httpService:HttpHandlerService) { }
  
  public abstract countMessageNotReadForGroup():Observable<MessageNotReadForGroup[]>;
}
