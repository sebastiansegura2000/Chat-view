import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { mensajesPorDiaData } from './data';
import { IGroupUserReportService } from 'src/app/Abstract/Report/igroup-user-report.service';
import { IActiveGroupReportService } from 'src/app/Abstract/Report/Group/iactive-group-report.service';
import { IInactiveGroupReportService } from 'src/app/Abstract/Report/Group/iinactive-group-report.service';
import { IUserReportService } from 'src/app/Abstract/Report/User/iuser-report.service';

@Component({
  selector: 'app-informs',
  templateUrl: './informs.component.html',
  styleUrls: ['./informs.component.css'],
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

  inactiveUsersTimeFilter = '4';
  inactiveGroupsTimeFilter = '4';

  inactiveUsersTimeValue = 1;
  inactiveGroupsTimeValue = 1;

  selectedUsersPerGroupFilter: string = 'name';
  usersPerGroupFilterValue: string = '';

  inactiveUsersTypeFilter: string = 'general';
  inactiveGroupsTypeFilter: string = 'general';

  filteredUsersPerGroupData: any[] = [];
  usersPerGroupData: object[] = [];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#1EDFCE'],
  };

  inactiveUsersData: object[] = [];

  inactiveGroupsData: object[] = [
    { name: 'Active', value: 0 },
    { name: 'Inactive', value: 0 },
  ];

  messagesPerDayData = mensajesPorDiaData;

  constructor(
    private groupService: IGroupUserReportService,
    private activeGroupService: IActiveGroupReportService,
    private inactiveGroupService: IInactiveGroupReportService,
    private userReportService: IUserReportService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.groupService.getNumberOfUsersPerGroup().subscribe((data) => {
      data['groups'].forEach((group) => {
        this.usersPerGroupData.push({
          name: group.name,
          value: group.users_quantity,
        });
      });
    });

    this.setGroupActivity(1, 5);
    this.setUserActivity(1, 5, 0);

    this.filteredMessagesPerDayData = this.messagesPerDayData;
    this.filteredUsersPerGroupData = this.usersPerGroupData;
  }
  /**
   * Updates the inactive users chart based on the provided time filter and time value.
   *
   * @remarks
   * This function logs the current time filter and time value to the console. It is intended to be called when the user interacts with the inactive users chart, such as when they select a new time filter or time value.
   *
   * @param {string} [inactiveUsersTimeFilter] - The selected time filter for the inactive users chart.
   * @param {number} [inactiveUsersTimeValue] - The selected time value for the inactive users chart.
   *
   * @returns {void} - This function does not return any value. It logs the current time filter and time value to the console.
   */
  updateInactiveUsersChart() {
    console.log(`Filter: ${this.inactiveUsersTimeFilter}, Value: ${this.inactiveUsersTimeValue}, type: ${this.inactiveUsersTypeFilter}`);
  }

  /**
   * Updates the inactive groups chart based on the provided time filter and time value.
   *
   * @remarks
   * This function logs the current time filter and time value to the console. It is intended to be called when the user interacts with the inactive groups chart, such as when they select a new time filter or time value.
   *
   * @param {string} [inactiveGroupsTimeFilter] - The selected time filter for the inactive groups chart.
   * @param {number} [inactiveGroupsTimeValue] - The selected time value for the inactive groups chart.
   *
   * @returns {void} - This function does not return any value. It logs the current time filter and time value to the console.
   */
  updateInactiveGroupsChart() {
    console.log(`Filter: ${this.inactiveGroupsTimeFilter}, Value: ${this.inactiveGroupsTimeValue}`);
  }

  setUserActivity(
    amount: number,
    conversion_type: number,
    type_activity: number
  ) {
    if (type_activity == 0) {
      this.inactiveUsersData = [];
      this.userReportService
        .getGeneralActiveUsers(amount, conversion_type)
        .subscribe((data) => {
          this.inactiveUsersData.push({
            name: 'Active',
            value: data['users'].length,
          });
        });
      this.userReportService
        .getGeneralInactiveUsers(amount, conversion_type)
        .subscribe((data) => {
          this.inactiveUsersData.push({
            name: 'Inactive',
            value: data['users'].length,
          });
        });
    } else {
      this.inactiveUsersData = [];
      this.userReportService
        .getSpecificActiveUsers(amount, conversion_type, type_activity)
        .subscribe((data) => {
          this.inactiveUsersData.push({
            name: 'Active',
            value: data['users'].length,
          });
        });
      this.userReportService
        .getSpecificInactiveUsers(amount, conversion_type, type_activity)
        .subscribe((data) => {
          this.inactiveUsersData.push({
            name: 'Inactive',
            value: data['users'].length,
          });
        });
    }
  }
  /**
   * Sets the group activity data for the inactive groups chart.
   *
   * @remarks
   * This function retrieves the group activity data based on the provided parameters and updates the `inactiveGroupsData` array.
   * It uses the `IActiveGroupReportService` and `IInactiveGroupReportService` to make HTTP requests to the backend API.
   *
   * @param {number} amount - The amount of groups to retrieve.
   * @param {number} conversion_type - The type of conversion to apply.
   *
   * @returns {void} - This function does not return any value. It updates the `inactiveGroupsData` array.
   */
  setGroupActivity(amount: number, conversion_type: number) {
    this.activeGroupService
      .getActiveGroups(amount, conversion_type)
      .subscribe((data) => {
        this.inactiveGroupsData[0]['value'] = data['groups'].length;
        this.updateChart();
      });

    this.inactiveGroupService
      .getInactiveGroups(amount, conversion_type)
      .subscribe((data) => {
        this.inactiveGroupsData[1]['value'] = data['groups'].length;
        this.updateChart();
      });
  }
  /**
   * Updates the chart data for the inactive groups section.
   *
   * @remarks
   * This function is responsible for updating the chart data for the inactive groups section.
   * It creates a new reference of the `inactiveGroupsData` array to force change detection.
   * This is necessary because Angular's change detection mechanism may not detect changes in arrays directly.
   *
   * @returns {void} - This function does not return any value. It updates the `inactiveGroupsData` array and triggers change detection.
   */
  updateChart() {
    // Crear una nueva referencia del arreglo para forzar la detección de cambios
    this.inactiveGroupsData = [...this.inactiveGroupsData];
    this.changeDetectorRef.detectChanges();
  }
  /**
   * Shows the messages per day section in the component.
   *
   * @remarks
   * This function is called when the user clicks on the "Mensajes por día" tab.
   * It sets the flags for the visibility of each section to false and only shows the "Mensajes por día" section.
   *
   * @returns {void}
   */
  showMessagesPerDaySection() {
    this.showMessagesPerDay = true;
    this.showUsersPerGroup = false;
    this.showInactiveUsers = false;
    this.showInactiveGroups = false;
  }

  /**
   * Shows the users per group section in the component.
   *
   * @remarks
   * This function is called when the user clicks on the "Usuarios por grupo" tab.
   * It sets the flags for the visibility of each section to false and only shows the "Usuarios por grupo" section.
   *
   * @returns {void}
   */
  showUsersPerGroupSection() {
    this.showMessagesPerDay = false;
    this.showUsersPerGroup = true;
    this.showInactiveUsers = false;
    this.showInactiveGroups = false;
  }
  /**
   * Shows the inactive users section in the component.
   *
   * @remarks
   * This function is called when the user clicks on the "Inactivos" tab.
   * It sets the flags for the visibility of each section to false and only shows the "Inactivos" section.
   *
   * @returns {void}
   */
  showInactiveUsersSection() {
    this.showMessagesPerDay = false;
    this.showUsersPerGroup = false;
    this.showInactiveUsers = true;
    this.showInactiveGroups = false;
  }
  /**
   * Shows the inactive groups section in the component.
   *
   * @remarks
   * This function is called when the user clicks on the "Inactivos" tab.
   * It sets the flags for the visibility of each section to false and only shows the "Inactivos" section.
   *
   * @returns {void}
   */
  showInactiveGroupsSection() {
    this.showMessagesPerDay = false;
    this.showUsersPerGroup = false;
    this.showInactiveUsers = false;
    this.showInactiveGroups = true;
  }
  /**
   * Filters the messages per day data based on the selected filter and filter value.
   *
   * @remarks
   * This function filters the messages per day data based on the selected filter and filter value.
   * It maps through the series data and filters the series based on the selected filter and filter value.
   *
   * @param {string} [selectedMessagesPerDayFilter] - The selected filter for messages per day data.
   * @param {string} [messagesPerDayFilterValue] - The filter value for messages per day data.
   * @param {string} [selectedDate] - The selected date for messages per day data.
   * @param {string} [startDate] - The start date for messages per day data.
   * @param {string} [endDate] - The end date for messages per day data.
   *
   * @returns {void} - This function does not return any value. It updates the filteredMessagesPerDayData property.
   */
  filterMessagesPerDay() {
    if (
      !this.messagesPerDayFilterValue &&
      !this.selectedDate &&
      !this.startDate &&
      !this.endDate
    ) {
      this.filteredMessagesPerDayData = this.messagesPerDayData;
    } else {
      this.filteredMessagesPerDayData = this.messagesPerDayData
        .map((series) => {
          return {
            ...series,
            series: series.series.filter((item) => {
              if (this.selectedMessagesPerDayFilter === 'name') {
                return series.name
                  .toLowerCase()
                  .includes(this.messagesPerDayFilterValue.toLowerCase());
              }
              if (this.selectedMessagesPerDayFilter === 'value') {
                return item.value
                  .toString()
                  .includes(this.messagesPerDayFilterValue);
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
                return series.rrhh_id
                  .toString()
                  .includes(this.messagesPerDayFilterValue);
              }
              return true;
            }),
          };
        })
        .filter((series) => series.series.length > 0);
    }
  }
  /**
   * Filters the users per group data based on the selected filter and filter value.
   *
   * @remarks
   * This function filters the users per group data based on the selected filter and filter value.
   * It maps through the series data and filters the series based on the selected filter and filter value.
   *
   * @param {string} [selectedUsersPerGroupFilter] - The selected filter for users per group data.
   * @param {string} [usersPerGroupFilterValue] - The filter value for users per group data.
   *
   * @returns {void} - This function does not return any value. It updates the filteredUsersPerGroupData property.
   */
  filterUsersPerGroup() {
    if (!this.usersPerGroupFilterValue) {
      this.filteredUsersPerGroupData = this.usersPerGroupData;
    } else {
      this.filteredUsersPerGroupData = this.usersPerGroupData.filter((item) => {
        if (this.selectedUsersPerGroupFilter === 'name') {
          return item['name']
            .toLowerCase()
            .includes(this.usersPerGroupFilterValue.toLowerCase());
        } else if (this.selectedUsersPerGroupFilter === 'value') {
          return item['value']
            .toString()
            .includes(this.usersPerGroupFilterValue);
        }
      });
    }
  }
}
