import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class IInactiveGroupReportService {

  constructor(private httpService: HttpHandlerService) { }
  abstract getInactiveGroups(amount:number,conversion_type:number): Observable<object[]> 
}
