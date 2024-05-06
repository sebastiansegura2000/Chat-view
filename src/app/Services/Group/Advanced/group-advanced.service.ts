import { Injectable } from '@angular/core';
import { IGroupAdvancedService } from 'src/app/Abstract/Group/Advanced/igroup-advanced.service';
import { HttpHandlerService } from '../../Http/http-handler.service';
import { Observable } from 'rxjs';
import { Group } from 'src/app/Interfaces/Group/groupManagement.interface';
import { group } from 'console';

@Injectable({
  providedIn: 'root'
})
export class GroupAdvancedService implements IGroupAdvancedService {

  constructor(private httpService:HttpHandlerService) {}

  public getGroupForId(group_id:number):Observable<Group>{
    const data = {
      id:group_id,
    }
    return this.httpService.getData('group/get-group-for-id/'+data);
  };
}
