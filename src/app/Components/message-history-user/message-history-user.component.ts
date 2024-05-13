import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-history-user',
  templateUrl: './message-history-user.component.html',
  styleUrls: ['./message-history-user.component.css']
})
export class MessageHistoryUserComponent implements OnInit {

  showReceiver: boolean = true;
  showGroup: boolean = false;
  filterValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  selectedFilterField: string = 'sender';

  applyFilter() {
    console.log('Filter value:', this.filterValue);
    const filterValueLC = this.filterValue.toLowerCase();
    const tableRows = document.querySelectorAll('.container tbody tr');

    tableRows.forEach((row: any) => {
      let fieldValue: string;
      if (this.selectedFilterField === 'sender') {
        fieldValue = row.cells[1].innerText.toLowerCase();
      } else if (this.selectedFilterField === 'receiverOrGroup') {
        fieldValue = this.showGroup ? row.cells[2].innerText.toLowerCase() : row.cells[2].innerText.toLowerCase();
      } else if (this.selectedFilterField === 'message') {
        fieldValue = this.showGroup ? row.cells[3].innerText.toLowerCase() : row.cells[3].innerText.toLowerCase();
      }

      if (fieldValue.includes(filterValueLC)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

}
