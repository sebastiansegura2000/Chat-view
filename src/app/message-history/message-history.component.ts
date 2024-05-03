import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.css']
})
export class MessageHistoryComponent implements OnInit {
  showReceiver: boolean = true;
  showGroup: boolean = false;
  filterValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  showReceiverMessages() {
    this.showReceiver = true;
    this.showGroup = false;
  }

  showGroupMessages() {
    this.showReceiver = false;
    this.showGroup = true;
  }

  applyFilter() {
    console.log("Filter value:", this.filterValue); // Agregar esta línea
    const filterValueLC = this.filterValue.toLowerCase();
    const tableRows = document.querySelectorAll('.container tbody tr');

    tableRows.forEach((row: any) => {
      const senderCell = row.cells[1].innerText.toLowerCase();
      const receiverOrGroupCell = this.showReceiver ? row.cells[2].innerText.toLowerCase() : row.cells[3].innerText.toLowerCase();
      const messageCell = this.showReceiver ? row.cells[4].innerText.toLowerCase() : row.cells[3].innerText.toLowerCase();

      if (senderCell.includes(filterValueLC) || receiverOrGroupCell.includes(filterValueLC) || messageCell.includes(filterValueLC)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

}
