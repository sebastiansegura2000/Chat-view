import { Injectable } from '@angular/core';
import { IUserActivityService } from 'src/app/Abstract/Exports/User/iuser-activity.service';
import { HttpHandlerService } from '../../Http/http-handler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserActivityService implements IUserActivityService {
  constructor(private httpService: HttpHandlerService) {}

  /**
   * Exports general user activity data.
   *
   * @param amount The amount of data to be exported.
   * @param conversion_type The type of conversion for the data.
   * @returns An Observable containing the exported user activity data.
   */
  exportUserActivityGeneral(
    amount: number,
    conversion_type: number
  ): Observable<any> {
    const data = {
      amount: amount,
      conversion_type: conversion_type,
    };
    return this.httpService.getFile('export/users/activity-general', data);
  }
  /**
   * Exports specific user activity data.
   *
   * @param amount The amount of data to be exported.
   * @param conversion_type The type of conversion for the data.
   * @param type_activity The type of activity to be exported.
   * @returns An Observable containing the exported user activity data.
   */
  exportUserActivitySpecific(
    amount: number,
    conversion_type: number,
    type_activity: number
  ): Observable<any> {
    const data = {
      amount: amount,
      conversion_type: conversion_type,
      recipient_type: type_activity,
    };

    return this.httpService.getFile('export/users/activity-specific', data);
  }
}
