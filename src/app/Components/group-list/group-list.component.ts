import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { GlobalVariablesService } from 'src/app/Services/GlobalVariables/global-variables.service';
import { CreateGroupFormService } from 'src/app/Services/Forms/Group/CreateGroup/create-group-form.service';
import { User } from 'src/app/Interfaces/User/user.interface';
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { Group } from 'src/app/Interfaces/Group/groupManagement.interface';
import { IGroupManagementService } from 'src/app/Abstract/Group/management/igroup-management.service';
import { IMessageQueryForGroupService } from 'src/app/Abstract/Message/Group/imessage-query-for-group.service';
import { UserService } from 'src/app/Abstract/User/service/user-service.service';
import { MqttHandlerService } from 'src/app/Services/Mqtt/mqtt-handler.service';
import { ChatService } from 'src/app/Services/Chat/chat.service';
import { IMessageQueryService } from 'src/app/Abstract/Message/MessageQuery/imessage-query.service';
import { UserAuthServiceService } from 'src/app/Services/Auth/user-auth-service.service';
import { IGroupArchiveService } from 'src/app/Abstract/Group/Archive/igroup-archive.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent implements OnInit {
  createGroupForm: FormGroup;
  groups: Group[];
  participants: User[];
  currentUser: any;
  groupId: number = 0;
  visibleGroups: number = 2;
  loadingMoreGroups: boolean = false;
  archiveGroups = [];
  constructor(
    private globalService: GlobalVariablesService,
    private groupManagementService: IGroupManagementService,
    private messageService: IMessageQueryForGroupService,
    private userService: UserService,
    private formHandlerService: CreateGroupFormService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private mqttService: MqttHandlerService,
    private chatService: ChatService,
    private messageQueryService: IMessageQueryService,
    private authService: UserAuthServiceService,
    private archiveGroupService: IGroupArchiveService
  ) {
    this.createGroupForm = this.fb.group({
      groupName: ['', Validators.required],
      participants: new FormArray([], Validators.minLength(1)),
    });
  }

  private secuenciaTeclas: string[] = ['w', 'a', 's'];
  private indiceSecuencia = 0;

  @ViewChild('historyButton') historyButton: ElementRef;
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const teclaPresionada = event.key.toLowerCase();

    if (teclaPresionada === this.secuenciaTeclas[this.indiceSecuencia]) {
      this.indiceSecuencia++;

      if (this.indiceSecuencia === this.secuenciaTeclas.length) {
        this.historyButton.nativeElement.style.display =
          this.historyButton.nativeElement.style.display === 'none'
            ? 'block'
            : 'none';
        this.indiceSecuencia = 0;
      }
    } else {
      this.indiceSecuencia = 0;
    }
  }

  @HostListener('document:keydown.end', ['$event'])
  onEndKeyPress(event: KeyboardEvent) {
    if (event.key === 'End' || event.key === 'Fin') {
      this.loadMoreGroups();
      this.loadMoreArchiveGroups();
    }
  }
  // ----------------------------------------------------------------------------------------------------------------------------
  /**
   * Initializes the component and loads the groups and participants for the current user.
   */
  ngOnInit(): void {
    this.loadGroups();
    this.loadParticipants();
    this.currentUser = this.globalService.userAuth.value;
    this.suscribeTopicGeneralGroup('groups');
    this.chatService.$getChatGroupId.subscribe((id) => {
      this.groupId = id;
    });
    this.setArchiveGroup();
  }
  // ----------------------------------------------------------------------------------------------------------------------------

  filteredGroups: any[] = [];
  filterValue: string = '';
  filterValueArchive: string = '';
  filteredArchiveGroups: Group[] = [];
  visibleArchiveGroups: number = 2;

  applyFilter(): void {
    this.filteredGroups = this.groups
      .filter((group) =>
        group.name.toLowerCase().includes(this.filterValue.toLowerCase())
      )
      .slice(0, this.visibleGroups);
  }

  applyFilterArchive(): void {
    this.filteredArchiveGroups = this.archiveGroups
      .filter((group) =>
        group.name.toLowerCase().includes(this.filterValueArchive.toLowerCase())
      )
      .slice(0, this.visibleArchiveGroups);
  }

  loadMoreGroups(): void {
    this.visibleGroups += 2;
    this.applyFilter();
    this.loadingMoreGroups = false;
  }

  loadMoreArchiveGroups(): void {
    this.visibleArchiveGroups += 2;
    this.applyFilterArchive();
  }


  // propeties participants -----------------------------------------------------------------------------------------------------
  get participantsControls(): FormArray {
    return this.createGroupForm.get('participants') as FormArray;
  }
  /**
   * Clears the participant selection in the create group form.
   */
  clearParticipantSelection(): void {
    (this.createGroupForm.get('participants') as FormArray).controls.forEach(
      (control) => {
        control.setValue(false);
      }
    );
  }
  //-----------------------------------------------------------------------------------------------------------------------------

  // initial data loading ------------------------------------------------------------------------------------------------------------------
  /**
   * Loads the groups for the current user.
   */
  loadGroups(): void {
    this.groupManagementService.getGroupForUser().subscribe((response) => {
      this.filteredGroups = this.sortGroups(response['groups']);
      this.groups = this.filteredGroups;
      this.applyFilter();
      this.updateUnreadMessagesCount();
    });
  }
  /**
   * Loads the participants for the current user.
   */
  loadParticipants(): void {
    this.userService.getUsers().subscribe((response) => {
      this.participants = response['users'];
      this.participants.forEach(() => {
        this.participantsControls.push(new FormControl(false));
      });
    });
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------

  // Group data processing --------------------------------------------------------------------------------------------------------------
  /**
   * Sorts the groups based on the timestamp of their last message.
   * @param groups The array of groups to be sorted.
   * @returns The sorted array of groups.
   */
  private sortGroups(groups: Group[]): Group[] {
    const groupsWithLastMessage = groups.filter((group) => group.lastMessage);
    groupsWithLastMessage.sort(
      (a, b) =>
        new Date(b.lastMessage.created_at).getTime() -
        new Date(a.lastMessage.created_at).getTime()
    );
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
      response['unreadMessages'].forEach((message) => {
        const group = this.groups.find(
          (group) => group.id === message.group_id
        );
        if (group) {
          group['unreadMessages'] = message.unread_messages_count;
        }
      });
    });
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------
  /**
   * Stores the newly created group in the database.
   * @returns A boolean value indicating whether the group was successfully stored.
   */
  async StorageGroup(): Promise<boolean> {
    try {
      const groupData = {
        name: this.formHandlerService.getGroupName(this.createGroupForm),
        participants: this.formHandlerService.getSelectedParticipantsIds(
          this.createGroupForm,
          this.participants
        ),
      };

      const response = await this.groupManagementService
        .createGroup(groupData)
        .toPromise();
      this.createGroupForm.reset();
      this.clearParticipantSelection();
      return true;
    } catch (error) {
      return false;
    }
  }

  //suscribe to a topic--------------------------------------------------------------------------------------------------------------

  /**
   * Subscribes to a topic in the MQTT broker.
   * @param topic The topic to subscribe to.
   */
  suscribeTopicGeneralGroup(topic: string): void {
    this.mqttService.suscribeTopic(topic).subscribe((response) => {
      const isParticipant = this.isInGroup(
        JSON.parse(response.payload.toString()).recipient_entity_id
      );
      if (isParticipant) {
        this.loadGroups();
      }
    });
  }

  /**
   * Checks if the current user is a participant in the specified group.
   * @param id_group The ID of the group to check.
   * @returns A boolean value indicating whether the current user is a participant in the specified group.
   */
  isInGroup(id_group: number): boolean {
    return (
      (this.groups.find((group) => group.id == id_group) ? true : false) ||
      (this.archiveGroups.find((group) => group.id == id_group) ? true : false)
    );
  }
  /**
   * Marks all messages in the specified group as read.
   * @param group_id The ID of the group to mark messages as read.
   */
  markAllMessageAsRead(group_id: number): void {
    const data = {
      id_sender: group_id,
      type: 2,
    };
    let group = this.groups.find((group) => group.id == group_id);
    group = group
      ? group
      : this.archiveGroups.find((group) => group.id == group_id);
    if (group['unreadMessages'] && group['unreadMessages'] > 0) {
      this.messageQueryService.markAllMessgesAsRead(data).subscribe(() => {});
      group['unreadMessages'] = 0;
    }
  }
  // --------------------------------------------------------------------------------------------------------------------------------

  /**
   * Sets the chat group ID.
   * @param id_group The ID of the group to set.
   */
  setGroupId(id_group: number): void {
    if (id_group != this.groupId) {
      this.chatService.setChatGroupId = id_group;
      this.markAllMessageAsRead(id_group);
    }
  }
  // ----------------------------------------------------------------------------------------------------------------------------------
  /**
   * Creates a new group.
   */
  createGroup(): void {
    const groupName = this.formHandlerService.getGroupName(
      this.createGroupForm
    );
    const participants = this.formHandlerService.getSelectedParticipantsIds(
      this.createGroupForm,
      this.participants
    );

    if (groupName && participants.length > 0) {
      this.alertService
        .confirmAlert(
          'Create Group',
          'Are you sure you want to create this group?'
        )
        .then((confirmed) => {
          if (confirmed) {
            this.StorageGroup()
              .then((success) => {
                if (success) {
                  this.alertService.successAlert(
                    'Success',
                    'Group created successfully.'
                  );
                  this.loadGroups();
                } else {
                  this.alertService.errorAlert(
                    'Error',
                    'Failed to create group. Please try again.'
                  );
                }
              })
              .catch((error) => {
                this.alertService.errorAlert(
                  'Error',
                  'An error occurred while creating the group. Please try again later.'
                );
              });
          }
        });
    } else {
      this.alertService.errorAlert(
        'Error',
        'Please fill out all required fields.'
      );
    }
  }

  // Archive------------------------------------------------------------------------------------------------------------------------------
  /**
   * Sets the archive groups for the current user.
   */
  setArchiveGroup() {
    this.archiveGroupService
      .getArchivedGroupsForAUser()
      .subscribe((response) => {
        this.archiveGroups = response['groups'];
        this.applyFilterArchive();
      });
  }
  // Permissions --------------------------------------------------------------------------------------------------------------------------
  /**
   * Checks if the current user has the necessary permissions to create a group.
   * @returns A boolean value indicating whether the current user has the necessary permissions.
   */
  canCreateGroup() {
    const role = this.authService.getChatInterno();
    if (
      role[0] == 'administrador' ||
      role[0] == 'coordinador' ||
      role[0] == 'supervisor'
    ) {
      return true;
    }
    return false;
  }
}
