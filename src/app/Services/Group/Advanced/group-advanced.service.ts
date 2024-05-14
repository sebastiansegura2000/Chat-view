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
  /**
   * Adds participants to a specific group.
   * @param group_id - The ID of the group to which participants will be added.
   * @param participants - An array of participant IDs to be added to the specified group.
   * @returns An Observable containing an array of any data returned by the server upon successful addition of participants.
   */
  public addParticipants(
    group_id: number,
    participants: Array<number>
  ): Observable<any[]> {
    const data = {
      id: group_id,
      participants: participants,
    };
    return this.httpService.postData('group/add-participants', data);
  }

  /**
   * Removes participants from a specific group.
   * @param group_id - The ID of the group from which participants will be removed.
   * @param participants - An array of participant IDs to be removed from the specified group.
   * @returns An Observable containing an array of any data returned by the server upon successful removal of participants.
   */
  public removeParticipants(
    group_id: number,
    participants: Array<number>
  ): Observable<any[]> {
    const data = {
      id: group_id,
      participants: participants,
    };
    return this.httpService.postData('group/remove-participants', data);
  }
}
