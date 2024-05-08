import { Injectable } from '@angular/core';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MqttHandlerService {

  constructor(private mqttService: MqttService) {}


  suscribeTopic(topic: string): Observable<IMqttMessage> {
    return this.mqttService.observe(topic);
  }
}
