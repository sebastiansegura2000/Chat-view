import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Interfaces/User/user.interface';
import { HttpHandlerService } from 'src/app/Services/Http/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class IUSerRepositoryService {

  constructor(private httpService: HttpHandlerService) { }

  abstract getUserForId(user_id): Observable<User > 
}
