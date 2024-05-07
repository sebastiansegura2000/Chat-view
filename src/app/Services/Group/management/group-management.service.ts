import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGroupManagementService } from 'src/app/Abstract/Group/management/igroup-management.service';
import { Group } from 'src/app/Interfaces/Group/groupManagement.interface';
import { HttpHandlerService } from '../../Http/http-handler.service';

@Injectable({
  providedIn: 'root',
})
export class GroupManagementService implements IGroupManagementService {
  constructor(private httpService: HttpHandlerService) {}

  /**
   * @description This method retrieves the groups for the authenticated user.
   * @returns An Observable of an array of Group objects.
   */
  getGroupForUser(): Observable<Group[]> {
    return this.httpService.getData('group/get-groups-for-user');
  }
  /**
   * Creates a new group with the given data.
   * @param groupData - The data for the new group.
   * @returns An Observable that emits the created group when successful.
   */
  createGroup(groupData): Observable<any> {
    return this.httpService.postData('group/create', groupData);
  }
  /**
   * Updates an existing group with the given data.
   * @param groupData - The data for the group to be updated.
   * @returns An Observable that emits the updated group when successful.
   */
  updateGroup(groupData): Observable<any[]> {
    return this.httpService.putData('group/update', groupData);
  }
  /**
   * Deletes a group by its id.
   * @param group_id - The id of the group to be deleted.
   * @returns An Observable that emits the deleted group when successful.
   */
  public deleteGroup(group_id: number): Observable<any[]> {
    const data = {
      id: group_id,
    };
    return this.httpService.putData('group/delete', data);
  }
}
