import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class IMessageReportService {

  constructor(private httpService: HttpHandlerService) { }
  abstract getMessagesPerDayAllUsers(): Observable<object[]> 
}
