import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class IGroupUserReportService {

  constructor(private httpService: HttpHandlerService) { }

  abstract getNumberOfUsersPerGroup(): Observable<object[]> 
}
