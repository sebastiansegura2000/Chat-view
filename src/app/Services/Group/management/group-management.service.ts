import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGroupManagementService } from 'src/app/Abstract/Group/igroup-management.service';
import { Group } from 'src/app/Interfaces/Group/groupManagement.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupManagementService implements IGroupManagementService {
  constructor(private http: HttpClient) {}

  /**
   * @description This method retrieves the groups for the authenticated user.
   * @returns An Observable of an array of Group objects.
   */
  getGroupForUser(): Observable<Group[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + environment.token,
    });

    return this.http.get<Group[]>(
      environment.apiUrl + 'group/get-groups-for-user',
      {
        headers,
      }
    );
  }

  createGroup(groupData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + environment.token,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(environment.apiUrl + 'group/create', groupData, {
      headers,
    });
  }
}
