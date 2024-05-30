import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from '../../Http/http-handler.service';
import { IGroupActivityService } from 'src/app/Abstract/Exports/Group/igroup-activity.service';

@Injectable({
  providedIn: 'root',
})
export class GroupArchiveService implements IGroupActivityService {
  constructor(private httpService: HttpHandlerService) {}

  /**
   * Retrieves a list of archived groups for the currently authenticated user.
   *
   * @returns An Observable of type `any[]` representing the list of archived groups.
   *
   * @remarks
   * This method sends a GET request to the server at the endpoint 'group/archive/get-archive-general'
   * and returns the response as an array of objects. Each object represents a group and its properties.
   *
   */
  public getGroupsFiledGeneral(): Observable<any[]> {
    return this.httpService.getData('group/archive/get-archive-general');
  }

  /**
   * Retrieves a list of archived groups for the currently authenticated user.
   *
   * @returns An Observable of type `any[]` representing the list of archived groups.
   *
   * @remarks
   * This method sends a GET request to the server at the endpoint 'group/archive/get-archive-specific'
   * and returns the response as an array of objects. Each object represents a group and its properties.
   *
   */
  public getArchivedGroupsForAUser(): Observable<any[]> {
    return this.httpService.getData('group/archive/get-archive-specific');
  }
}
