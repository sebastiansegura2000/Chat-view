import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../Interfaces/User/user.interface';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class  UserService {
  constructor(private httpService: HttpHandlerService) { }

  abstract getUsers(): Observable<User[]> 
}