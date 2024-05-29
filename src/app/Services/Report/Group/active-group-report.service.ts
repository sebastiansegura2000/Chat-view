import { Injectable } from '@angular/core';
import { IActiveGroupReportService } from 'src/app/Abstract/Report/Group/iactive-group-report.service';
import { HttpHandlerService } from '../../Http/http-handler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveGroupReportService implements IActiveGroupReportService {
  constructor(private httpService: HttpHandlerService) {}
  /**
   * Retrieves the list of active groups based on the specified amount and conversion type.
   *
   * @param amount The number of groups to retrieve.
   * @param conversion_type The type of conversion to apply to the groups.
   *
   * @returns An Observable containing an array of objects representing the active groups.
   */
  public getActiveGroups(
    amount: number,
    conversion_type: number
  ): Observable<object[]> {
    const data = {
      amount: amount,
      conversion_type: conversion_type,
    };
    return this.httpService.getData('report/groups/active', data);
  }
}
