import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from '../GlobalVariables/global-variables.service';
import { GroupManagementService } from '../Services/Group/group-management.service';
import { Group } from '../Interfaces/Group/groupManagement.interface';
import { MessageQueryForGroupService } from '../Services/Message/message-query-for-group.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent implements OnInit {
  constructor(
    private globalService: GlobalVariablesService,
    private groupManagementService: GroupManagementService,
    private messageService: MessageQueryForGroupService
  ) {}

  groups: Group[];
  currentUser: any;
  /**
   * Initializes the component and fetches the groups for the current user.
   * It also updates the unread messages count for each group.
   */
  ngOnInit(): void {
    this.groupManagementService
      .getGroupForUser()
      .pipe(map((response) => this.sortGroups(response.groups)))
      .subscribe((groups: Group[]) => {
        this.groups = groups;
        this.updateUnreadMessagesCount();
      });

    this.currentUser = this.globalService.userAuth.value;
  }
  /**
   * Sorts the groups based on the last message's creation date.
   * Groups with a last message are sorted first, and then groups without a last message are appended.
   *
   * @param groups The array of groups to be sorted.
   * @returns The sorted array of groups.
   */
  private sortGroups(groups: Group[]): Group[] {
    const groupsWithLastMessage = groups.filter((group) => group.lastMessage);
    groupsWithLastMessage.sort((a, b) => {
      const dateA = a.lastMessage
        ? new Date(a.lastMessage.created_at).getTime()
        : 0;
      const dateB = b.lastMessage
        ? new Date(b.lastMessage.created_at).getTime()
        : 0;
      return dateB - dateA;
    });

    const groupsWithoutLastMessage = groups.filter(
      (group) => !group.lastMessage
    );
    return [...groupsWithLastMessage, ...groupsWithoutLastMessage];
  }
  /**
   * Updates the unread messages count for each group.
   */
  private updateUnreadMessagesCount(): void {
    this.messageService.countMessageNotReadForGroup().subscribe((response) => {
      response.unreadMessages.forEach((message) => {
        const group = this.groups.find(
          (group) => group.id === message.group_id
        );
        if (group) {
          group.unreadMessages = message.unread_messages_count;
        }
      });
    });
  }
  createGroup(): void {
    Swal.fire({
      title: 'Create Group',
      text: 'Are you sure you want to create this group?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Create',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para crear el grupo
        Swal.fire(
          'Group Created!',
          'Your group has been created successfully.',
          'success'
        );
        // Cierra el modal
        const modal = document.getElementById('createGroupModal');
        if (modal) {
          modal.dispatchEvent(new Event('hide.bs.modal'));
        }
      }
    });
  }

}
