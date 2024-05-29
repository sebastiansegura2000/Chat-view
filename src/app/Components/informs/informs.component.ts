import { Component, OnInit } from '@angular/core';
import { mensajesPorDiaData } from './data';
import { IGroupUserReportService } from 'src/app/Abtract/Report/igroup-user-report.service';

@Component({
  selector: 'app-informs',
  templateUrl: './informs.component.html',
  styleUrls: ['./informs.component.css']
})
export class InformsComponent implements OnInit {

  showMessagesPerDay: boolean = true;
  showUsersPerGroup: boolean = false;
  showInactiveUsers: boolean = false;
  showInactiveGroups: boolean = false;

  selectedMessagesPerDayFilter: string = 'name';
  messagesPerDayFilterValue: string = '';
  filteredMessagesPerDayData: any[] = [];

  selectedDate: string = '';
  startDate: string = '';
  endDate: string = '';

  inactiveUsersChartType: string = 'normal';
  inactiveGroupsChartType: string = 'normal';

  selectedUsersPerGroupFilter: string = 'name';
  usersPerGroupFilterValue: string = '';
  filteredUsersPerGroupData: any[] = [];
  usersPerGroupData: object[] = [];
  
  constructor(private groupService: IGroupUserReportService) {}

  ngOnInit(): void {
    this.groupService.getNumberOfUsersPerGroup().subscribe((data) => { 
      console.log(data);
      data['groups'].forEach(group => {
        this.usersPerGroupData.push({ 'name': group.name, 'value': group.users_quantity });
      });
    });
    this.filteredMessagesPerDayData = this.messagesPerDayData;
    this.filteredUsersPerGroupData = this.usersPerGroupData;
  }

  showMessagesPerDaySection() {
    this.showMessagesPerDay = true;
    this.showUsersPerGroup = false;
    this.showInactiveUsers = false;
    this.showInactiveGroups = false;
  }

  showUsersPerGroupSection() {
    this.showMessagesPerDay = false;
    this.showUsersPerGroup = true;
    this.showInactiveUsers = false;
    this.showInactiveGroups = false;
  }

  showInactiveUsersSection() {
    this.showMessagesPerDay = false;
    this.showUsersPerGroup = false;
    this.showInactiveUsers = true;
    this.showInactiveGroups = false;
  }

  showInactiveGroupsSection() {
    this.showMessagesPerDay = false;
    this.showUsersPerGroup = false;
    this.showInactiveUsers = false;
    this.showInactiveGroups = true;
  }

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#1EDFCE']
  };

  inactiveUsersData = [
    { "name": "Active", "value": 60 },
    { "name": "Inactive", "value": 40 }
  ];

  inactiveGroupsData = [
    { "name": "Active", "value": 120 },
    { "name": "Inactive", "value": 30 }
  ];

  messagesPerDayData = mensajesPorDiaData;

  filterMessagesPerDay() {
    if (!this.messagesPerDayFilterValue && !this.selectedDate && !this.startDate && !this.endDate) {
      this.filteredMessagesPerDayData = this.messagesPerDayData;
    } else {
      this.filteredMessagesPerDayData = this.messagesPerDayData.map(series => {
        return {
          ...series,
          series: series.series.filter(item => {
            if (this.selectedMessagesPerDayFilter === 'name') {
              return series.name.toLowerCase().includes(this.messagesPerDayFilterValue.toLowerCase());
            }
            if (this.selectedMessagesPerDayFilter === 'value') {
              return item.value.toString().includes(this.messagesPerDayFilterValue);
            }
            if (this.selectedMessagesPerDayFilter === 'date') {
              return item.name === this.selectedDate;
            }
            if (this.selectedMessagesPerDayFilter === 'date-range') {
              const itemDate = new Date(item.name).getTime();
              const start = new Date(this.startDate).getTime();
              const end = new Date(this.endDate).getTime();
              return itemDate >= start && itemDate <= end;
            }
            if (this.selectedMessagesPerDayFilter === 'rrhh_id') {
              return series.rrhh_id.toString().includes(this.messagesPerDayFilterValue);
            }
            return true;
          })
        };
      }).filter(series => series.series.length > 0);
    }
  }

  filterUsersPerGroup() {
    if (!this.usersPerGroupFilterValue) {
      this.filteredUsersPerGroupData = this.usersPerGroupData;
    } else {
      this.filteredUsersPerGroupData = this.usersPerGroupData.filter(item => {
        if (this.selectedUsersPerGroupFilter === 'name') {
          return item['name'].toLowerCase().includes(this.usersPerGroupFilterValue.toLowerCase());
        } else if (this.selectedUsersPerGroupFilter === 'value') {
          return item['name'].toString().includes(this.usersPerGroupFilterValue);
        }
      });
    }
  }
}
