import { Injectable } from '@angular/core';
import { IGroupAdvancedService } from 'src/app/Abstract/Group/Advanced/igroup-advanced.service';
import { HttpHandlerService } from '../../Http/http-handler.service';
import { Observable } from 'rxjs';
import { Group } from 'src/app/Interfaces/Group/groupManagement.interface';

@Injectable({
  providedIn: 'root',
})
export class GroupAdvancedService implements IGroupAdvancedService {
  constructor(private httpService: HttpHandlerService) {}
  /**
   * Returns a group based on its ID.
   * @param group_id - The ID of the group to retrieve.
   * @returns The requested group.
   */
  public getGroupForId(group_id: number): Observable<Group> {
    const data = {
      id: group_id,
    };
    return this.httpService.getData('group/get-group-for-id', data);
  }
  /**
   * Returns the list of participants for a specific group.
   * @param group_id - The ID of the group to retrieve the participants for.
   * @returns An Observable containing an array of participants for the specified group.
   */
  public getParticipantsForGroup(group_id: number): Observable<participant[]> {
    const data = {
      id: group_id,
    };
    return this.httpService.getData('group/get-participants-for-group', data);
  }

  public addParticipants(group_id:number,participants: Array<number>): Observable<any[]> {
    const data = {
      id: group_id,
      participants: participants,
    };
    return this.httpService.postData('group/add-participants', data);
  }
  public removeParticipants(group_id:number,participants: Array<number>): Observable<any[]> {
    const data = {
      id: group_id,
      participants: participants,
    };
    return this.httpService.postData('group/remove-participants', data);
  }
}
