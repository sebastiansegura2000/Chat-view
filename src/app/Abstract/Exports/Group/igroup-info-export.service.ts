import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class IGroupInfoExportService {

  constructor(private httpService:HttpHandlerService) {}

  abstract exportGroupInfo(): Observable<any> 
}
