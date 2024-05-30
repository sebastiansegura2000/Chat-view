import { Injectable } from '@angular/core';
import { IMessageReportService } from 'src/app/Abstract/Report/Message/imessage-report.service';
import { HttpHandlerService } from '../../Http/http-handler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageReportService implements IMessageReportService {

  constructor(private httpService: HttpHandlerService) { }
  /**
 * Retrieves the number of messages sent per day for all users.
 *
 * @returns {Observable<object[]>} An observable that emits an array of objects,
 * where each object represents a day and contains the count of messages sent on that day.
 *
 */
  getMessagesPerDayAllUsers(): Observable<object[]>{
    return this.httpService.getData('report/groups/messages-per-day');
  }
}
