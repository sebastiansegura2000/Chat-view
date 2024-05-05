import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../Interfaces/User/user.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class  UserService {
  constructor(private http: HttpClient) { }

  abstract getUsers(): Observable<User[]> 
}