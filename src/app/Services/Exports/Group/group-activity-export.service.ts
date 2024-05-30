import { Injectable } from '@angular/core';
import { IGroupActivityService } from 'src/app/Abstract/Exports/Group/igroup-activity.service';
import { HttpHandlerService } from '../../Http/http-handler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupActivityExportService implements IGroupActivityService {

  constructor(private httpService:HttpHandlerService) {}

  GroupActivityExport(amount:number,conversion_type:number): Observable<any> {
    const data = {
      amount: amount,
      conversion_type: conversion_type,
    };

    return this.httpService.getFile('export/groups/activity',data);
  }
}
