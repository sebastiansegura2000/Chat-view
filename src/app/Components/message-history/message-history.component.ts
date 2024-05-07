import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMessageQueryForUserService } from 'src/app/Abstract/Message/User/imessage-query-for-user.service';
import { Message } from 'src/app/Interfaces/Message/message.inteface';

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.css'],
})
export class MessageHistoryComponent implements OnInit {
  showReceiver: boolean = true;
  showGroup: boolean = false;
  userMessages: Message[];
  groupMessages: Message[];
  filterValue: string = '';

  constructor(
    private route: ActivatedRoute,
    private messageService: IMessageQueryForUserService
  ) {}
  /**
   * Initializes the component when it is created.
   *
   * This method is called after the constructor, and before the first call to `ngOnChanges`.
   *
   * @returns {void} No return value.
   */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const user_id = params['id'];
      this.getMessageHistory(user_id);
    });
  }
  /**
   * Changes the view to show receiver messages.
   */
  showReceiverMessages() {
    this.showReceiver = true;
    this.showGroup = false;
  }
  /**
   * Changes the view to show group messages.
   */
  showGroupMessages() {
    this.showReceiver = false;
    this.showGroup = true;
  }
  /**
   * Applies a filter to the message history based on the provided filter value.
   *
   * @param filterValue The value to filter the message history by.
   */
  applyFilter() {
    console.log('Filter value:', this.filterValue); // Agregar esta línea
    const filterValueLC = this.filterValue.toLowerCase();
    const tableRows = document.querySelectorAll('.container tbody tr');

    tableRows.forEach((row: any) => {
      const senderCell = row.cells[1].innerText.toLowerCase();
      const receiverOrGroupCell = this.showReceiver
        ? row.cells[2].innerText.toLowerCase()
        : row.cells[3].innerText.toLowerCase();
      const messageCell = this.showReceiver
        ? row.cells[4].innerText.toLowerCase()
        : row.cells[3].innerText.toLowerCase();

      if (
        senderCell.includes(filterValueLC) ||
        receiverOrGroupCell.includes(filterValueLC) ||
        messageCell.includes(filterValueLC)
      ) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
  /**
   * Fetches the message history for a specific user.
   *
   * @param user_id The unique identifier of the user for whom the message history is requested.
   */
  getMessageHistory(user_id: number) {
    this.messageService.getMessageHistory(user_id).subscribe((response) => {
      this.userMessages = response['messages']['users'];
      this.groupMessages = response['messages']['groups'];
    });
  }
}
