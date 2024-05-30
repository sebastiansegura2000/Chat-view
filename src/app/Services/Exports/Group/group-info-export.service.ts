import { Injectable } from '@angular/core';
import { HttpHandlerService } from '../../Http/http-handler.service';
import { IGroupInfoExportService } from 'src/app/Abstract/Exports/Group/igroup-info-export.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupInfoExportService implements IGroupInfoExportService {
  constructor(private httpService: HttpHandlerService) {}

  /**
   * Retrieves a list of inactive users from the specified group.
   *
   * @param amount The number of users to retrieve.
   * @param conversion_type The type of conversion for the returned data.
   * @returns An Observable containing the list of inactive users.
   */
  exportGroupInfo(): Observable<any> {
    return this.httpService.getFile('export/groups/get-participants');
  }
}
