import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/Interfaces/Group/groupManagement.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class IGroupManagementService {

  constructor(private http: HttpClient) {}
  public abstract getGroupForUser():Observable<Group[]>;
}




