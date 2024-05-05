import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessageQueryForGroupService } from 'src/app/Abstract/Message/imessage-query-for-group.service';
import { MessageNotReadForGroup } from 'src/app/Interfaces/Message/countMessageNotReadForGroup.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export  class MessageQueryForGroupService implements IMessageQueryForGroupService {

  constructor(private http: HttpClient) {}
  
  public countMessageNotReadForGroup(): Observable<MessageNotReadForGroup[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + environment.token,
    });

    return this.http.get<MessageNotReadForGroup[]>(
      environment.apiUrl + 'message/countMessagesNotReadOfGroup',
      { headers }
    );
  }
}
