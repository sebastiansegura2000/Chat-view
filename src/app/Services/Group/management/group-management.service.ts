import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGroupManagementService } from 'src/app/Abstract/Group/management/igroup-management.service';
import { Group } from 'src/app/Interfaces/Group/groupManagement.interface';
import { HttpHandlerService } from '../../Http/http-handler.service';

@Injectable({
  providedIn: 'root',
})
export class GroupManagementService implements IGroupManagementService {
  constructor(private httpService:HttpHandlerService) {}

  /**
   * @description This method retrieves the groups for the authenticated user.
   * @returns An Observable of an array of Group objects.
   */
  getGroupForUser(): Observable<Group[]> {
    return this.httpService.getData('group/get-groups-for-user');
  }

  createGroup(groupData): Observable<any> {
   
    return this.httpService.postData('group/create',groupData)
  }


  updateGroup(groupData):Observable<any[]>{
    return this.httpService.putData('group/update',groupData);
  }
}
