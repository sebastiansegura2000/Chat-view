
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/Interfaces/Group/groupManagement.interface';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class IGroupManagementService {

  constructor(private httpService:HttpHandlerService) {}
  public abstract getGroupForUser():Observable<Group[]>;
  public abstract createGroup(groupData):Observable<any[]>;
  public abstract updateGroup(groupData):Observable<any[]>;
  public abstract deleteGroup(group_id:number):Observable<any[]>;
}




