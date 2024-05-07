import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroupAdvancedService } from 'src/app/Abstract/Group/Advanced/igroup-advanced.service';
import { IGroupManagementService } from 'src/app/Abstract/Group/management/igroup-management.service';
import { UserService } from 'src/app/Abstract/User/service/user-service.service';
import { Group } from 'src/app/Interfaces/Group/group.interface';
import { User } from 'src/app/Interfaces/User/user.interface';
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { UserAuthServiceService } from 'src/app/Services/Auth/user-auth-service.service';
import { CreateGroupFormService } from 'src/app/Services/Forms/Group/CreateGroup/create-group-form.service';
import { GlobalVariablesService } from 'src/app/Services/GlobalVariables/global-variables.service';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.css'],
})
export class GroupInfoComponent implements OnInit {
  group: Group;
  participants: participant[];
  users: User[];
  updateGroupForm: FormGroup;
  userAuth: User;
  constructor(
    private route: ActivatedRoute,
    private groupService: IGroupAdvancedService,
    private userService: UserService,
    private formHandlerService: CreateGroupFormService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private groupManagerService: IGroupManagementService,
    private globalService: GlobalVariablesService,
    private authService: UserAuthServiceService,
    private routerNavegation: Router
  ) {
    this.updateGroupForm = this.fb.group({
      groupName: ['', Validators.required],
      participants: new FormArray([], Validators.minLength(1)),
    });
  }

  /**
   * Initializes the component and subscribes to route parameters, users, and user authentication.
   */
  ngOnInit(): void {
    this.subscribeToRouteParams();
    this.getUsers();
    this.subscribeToUserAuth();
  }

  /**
   * Subscribes to route parameters and retrieves the group for the specified id.
   */
  private subscribeToRouteParams(): void {
    this.route.params.subscribe((params) => {
      const groupId = params['id'];
      this.getGroupForId(groupId);
      this.getParticipants(groupId);
    });
  }

  /**
   * Subscribes to user authentication and updates the userAuth property.
   */
  private subscribeToUserAuth(): void {
    this.authService.UserAuth().subscribe((userData) => {
      this.globalService.userAuth.value.userData = userData.user;
      this.userAuth = this.globalService.userAuth.value.userData;
    });
  }
  // Participant Propety
  get participantsControls(): FormArray {
    return this.updateGroupForm.get('participants') as FormArray;
  }
  /**
   * Retrieves the group for the specified id.
   * @param groupId The id of the group to retrieve.
   */
  getGroupForId(groupId: number) {
    this.groupService.getGroupForId(groupId).subscribe((response) => {
      this.group = response['group'];
      this.updateGroupForm.get('groupName').setValue(this.group.name);
    });
  }

  /**
   * Retrieves the participants for the specified group id.
   * @param groupId The id of the group to retrieve participants for.
   */
  getParticipants(groupId: number) {
    this.groupService.getParticipantsForGroup(groupId).subscribe((response) => {
      this.participants = response['participants'];
    });
  }

  /**
   * Retrieves the users from the server.
   */
  getUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response['users'];
      const participantIds = this.participants.map(
        (participant) => participant.id
      );
      this.users.forEach((user) => {
        const isParticipant = participantIds.includes(user.id);
        this.participantsControls.push(new FormControl(isParticipant));
      });
    });
  }
  /**
   * Updates the group data, including the group name and participants.
   * @returns A Promise that resolves when the group data is successfully updated.
   * @throws An error if there is an issue updating the group data.
   */
  async updateGroupData(): Promise<void> {
    try {
      const groupData = {
        id: this.group.id,
        name: this.formHandlerService.getGroupName(this.updateGroupForm),
      };
      this.group.name = groupData.name;
      await this.groupManagerService.updateGroup(groupData).toPromise();
      await this.removeParticipants(groupData.id);
      await this.addParticipants(
        this.formHandlerService.getSelectedParticipantsIds(
          this.updateGroupForm,
          this.users
        )
      );
      this.alertService.successAlert('Success', 'Group updated successfully.');
    } catch (error) {
      this.handleError(
        'An error occurred while updating the group. Please try again later.'
      );
    }
  }
  /**
   * Removes the specified participants from the group.
   * @param id The id of the group to remove participants from.
   * @returns A Promise that resolves when the participants are successfully removed.
   * @throws An error if there is an issue removing the participants.
   */
  private async removeParticipants(id): Promise<void> {
    try {
      const participantsToRemove = this.participants
        .filter((participant) => participant.id !== this.userAuth.id)
        .map((participant) => participant.id);

      await this.groupService
        .removeParticipants(id, participantsToRemove)
        .toPromise();
    } catch (error) {
      this.handleError('An error occurred while removing participants.');
    }
  }
  /**
   * Adds the specified participants to the group.
   * @param id The id of the group to add participants to.
   * @param participants The array of participant ids to add to the group.
   * @returns A Promise that resolves when the participants are successfully added.
   * @throws An error if there is an issue adding the participants.
   */
  private async addParticipants(participants: Array<number>): Promise<void> {
    try {
      await this.groupService
        .addParticipants(this.group.id, participants)
        .toPromise();

      this.getParticipants(this.group.id);
    } catch (error) {
      this.handleError('An error occurred while adding participants.');
    }
  }
  /**
   * Handles errors by displaying an error alert with the specified error message.
   * @param errorMessage The error message to be displayed in the alert.
   */
  private handleError(errorMessage: string): void {
    this.alertService.errorAlert('Error', errorMessage);
  }
  /**
   * Handles the logic for updating the group information.
   * This method checks if the group name and participants are provided,
   * then displays a confirmation alert before updating the group data.
   */
  infoUpdateGroup(): void {
    const groupName = this.formHandlerService.getGroupName(
      this.updateGroupForm
    );
    const participants = this.formHandlerService.getSelectedParticipantsIds(
      this.updateGroupForm,
      this.users
    );

    if (groupName && participants.length > 0) {
      this.alertService
        .confirmAlert(
          'Create Group',
          'Are you sure you want to create this group?'
        )
        .then((confirmed) => {
          if (confirmed) {
            this.updateGroupData();
          }
        });
    } else {
      this.alertService.errorAlert(
        'Error',
        'Please fill out all required fields.'
      );
    }
  }
  /**
   * Deletes the current group.
   * This method displays a confirmation alert before deleting the group.
   */
  DeleteGroup() {
    this.alertService
      .confirmAlert('Delete Group', 'Are you sure you want to delete?')
      .then((confirmed) => {
        if (confirmed) {
          this.groupManagerService
            .deleteGroup(this.group.id)
            .subscribe((response) => {
              this.alertService.successAlert(
                'Success',
                'Group deleted successfully.'
              );
            });
        }
      });
  }
}
