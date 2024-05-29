import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class IActiveGroupReportService {

  constructor(private httpService: HttpHandlerService) { }

  abstract getActiveGroups(amount:number,conversion_type:number): Observable<object[]> 
}
