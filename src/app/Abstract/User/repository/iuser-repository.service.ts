import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Interfaces/User/user.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class IUSerRepositoryService {

  constructor(private http: HttpClient) { }

  abstract getUserForId(user_id): Observable<User > 
}
