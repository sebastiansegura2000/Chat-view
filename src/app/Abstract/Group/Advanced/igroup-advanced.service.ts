import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/Interfaces/Group/group.interface';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class IGroupAdvancedService {

  constructor(private httpService:HttpHandlerService) {}
  public abstract getGroupForId(group_id:number):Observable<Group>;
  public abstract getParticipantsForGroup(group_id:number):Observable<participant[]>;
  public abstract addParticipants(group_id:number,participants:Array<number>):Observable<any[]>
  public abstract removeParticipants(group_id:number,participants:Array<number>):Observable<any[]>
}
