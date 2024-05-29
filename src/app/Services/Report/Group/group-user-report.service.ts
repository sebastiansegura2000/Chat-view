import { Injectable } from '@angular/core';
import { HttpHandlerService } from '../../Http/http-handler.service';
import { IGroupUserReportService } from 'src/app/Abtract/Report/igroup-user-report.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupUserReportService implements IGroupUserReportService {
  
  constructor(private httpService: HttpHandlerService) {}
  /**
   * Retrieves the number of users per group from the server.
   *
   * @returns {Observable<object[]>} An observable that emits an array of objects,
   * where each object represents a group and its corresponding number of users.
   *
   */
  getNumberOfUsersPerGroup(): Observable<object[]> {
    return this.httpService.getData('report/groups/membership');
  }
}
