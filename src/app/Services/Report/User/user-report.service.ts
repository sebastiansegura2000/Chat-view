import { Injectable } from '@angular/core';
import { IUserReportService } from 'src/app/Abstract/Report/User/iuser-report.service';
import { HttpHandlerService } from '../../Http/http-handler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserReportService implements IUserReportService {
  constructor(private httpService: HttpHandlerService) {}

  /**
   * Retrieves a list of general inactive users based on the specified amount and conversion type.
   *
   * @param amount The number of users to retrieve.
   * @param conversion_type The type of conversion to use for the retrieval.
   * @returns An Observable containing an array of objects representing the inactive users.
   */
  getGeneralInactiveUsers(
    amount: number,
    conversion_type: number
  ): Observable<object[]> {
    const data = {
      amount: amount,
      conversion_type: conversion_type,
    };
    return this.httpService.getData('report/users/inactive-general', data);
  }
  /**
   * Retrieves a list of specific inactive users based on the specified amount and conversion type.
   *
   * @param amount The number of users to retrieve.
   * @param conversion_type The type of conversion to use for the retrieval.
   * @param type_activity The type of recipient.
   * @returns An Observable containing an array of objects representing the inactive users.
   */
  getSpecificInactiveUsers(
    amount: number,
    conversion_type: number,
    type_activity: number
  ): Observable<object[]> {
    const data = {
      amount: amount,
      conversion_type: conversion_type,
      recipient_type:type_activity
    };
    return this.httpService.getData('report/users/inactive-specific', data);
  }

  /**
   * Retrieves a list of general active users based on the specified amount and conversion type.
   *
   * @param amount The number of users to retrieve.
   * @param conversion_type The type of conversion to use for the retrieval.
   * @returns An Observable containing an array of objects representing the active users.
   */
  getGeneralActiveUsers(
    amount: number,
    conversion_type: number
  ): Observable<object[]> {
    const data = {
      amount: amount,
      conversion_type: conversion_type,
    };
    return this.httpService.getData('report/users/active-general', data);
  }

  /**
   * Retrieves a list of specific active users based on the specified amount and conversion type.
   *
   * @param amount The number of users to retrieve.
   * @param conversion_type The type of conversion to use for the retrieval.
   * @param type_activity The type of recipient.
   * @returns An Observable containing an array of objects representing the active users.
   */
  getSpecificActiveUsers(
    amount: number,
    conversion_type: number,
    type_activity: number
  ): Observable<object[]> {
    const data = {
      amount: amount,
      conversion_type: conversion_type,
      recipient_type:type_activity
    };
    return this.httpService.getData('report/users/active-specific', data);
  }
}
