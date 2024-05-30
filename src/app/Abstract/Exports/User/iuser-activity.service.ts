import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class IUserActivityService {

  constructor(private httpService:HttpHandlerService) {}

  abstract exportUserActivityGeneral(amount:number,conversion_type:number): Observable<any>; 
  abstract exportUserActivitySpecific(amount:number,conversion_type:number,type_activity: number): Observable<any>; 
}
