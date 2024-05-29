import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class IUserReportService {

  constructor(private httpService: HttpHandlerService) { }
  abstract getGeneralInactiveUsers(amount:number,conversion_type:number): Observable<object[]> 
  abstract getSpecificInactiveUsers(amount:number,conversion_type:number,type_activity: number): Observable<object[]> 
  abstract getGeneralActiveUsers(amount:number,conversion_type:number): Observable<object[]> 
  abstract getSpecificActiveUsers(amount:number,conversion_type:number,type_activity: number): Observable<object[]> 
}
