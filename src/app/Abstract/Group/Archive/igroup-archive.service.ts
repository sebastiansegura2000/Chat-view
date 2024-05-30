import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class IGroupArchiveService {

  constructor(private httpService:HttpHandlerService) {}

  public abstract getGroupsFiledGeneral():Observable<any[]>;
  public abstract getArchivedGroupsForAUser():Observable<any[]>;
}
