import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalVariablesService {
  public userAuth = new BehaviorSubject<any>({
    userData: Object
  });
}
