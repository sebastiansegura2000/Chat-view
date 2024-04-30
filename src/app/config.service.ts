import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  public getDataWithHeaders(url: string): Observable<any> {
    // Crear objeto HttpHeaders
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xL2FwaS91c2VyL3Rva2VuIiwiaWF0IjoxNzE0NDI1MTM0LCJleHAiOjE3MTQ0Mjg3MzQsIm5iZiI6MTcxNDQyNTEzNCwianRpIjoibWM4UEFZSlNmNlhVSHpUcSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.sNnObfNpa8iM-KmiuUPCRWBWVzkc3PViLdWoh02O2cs'
    });

    // Realizar la solicitud GET con los encabezados
    return this.http.get(url, { headers });
  }
}
