import { Injectable } from '@angular/core';
import { IInactiveGroupReportService } from 'src/app/Abstract/Report/Group/iinactive-group-report.service';
import { HttpHandlerService } from '../../Http/http-handler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InactiveGroupReportService implements IInactiveGroupReportService {
  constructor(private httpService: HttpHandlerService) {}
  
  /**
   * Retrieves a list of inactive groups based on the specified amount and conversion type.
   *
   * @param amount The number of inactive groups to retrieve.
   * @param conversion_type The type of conversion to apply to the data.
   *
   * @returns An Observable containing an array of objects representing the inactive groups.
   */
  getInactiveGroups(
    amount: number,
    conversion_type: number
  ): Observable<object[]> {
    const data = {
      amount: amount,
      conversion_type: conversion_type,
    };
    return this.httpService.getData('report/groups/inactive', data);
  }
}
