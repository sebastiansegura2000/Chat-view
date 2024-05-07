import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private authService: UserAuthServiceService
  ) {
    this.updateGroupForm = this.fb.group({
      groupName: ['', Validators.required],
      participants: new FormArray([], Validators.minLength(1)),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const group_id = params['id'];
      this.getGroupForId(group_id);
      this.getParticipants(group_id);
    });
    this.getUsers();
    this.authService.UserAuth().subscribe((userData) => {
      this.globalService.userAuth.value.userData = userData.user;
      this.userAuth = this.globalService.userAuth.value.userData;
    });
  }

  get participantsControls(): FormArray {
    return this.updateGroupForm.get('participants') as FormArray;
  }

  getGroupForId(groupId: number) {
    this.groupService.getGroupForId(groupId).subscribe((response) => {
      this.group = response['group'];
      this.updateGroupForm.get('groupName').setValue(this.group.name);
    });
  }

  getParticipants(groupId: number) {
    this.groupService.getParticipantsForGroup(groupId).subscribe((response) => {
      this.participants = response['participants'];
    });
  }

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

  private handleError(errorMessage: string): void {
    this.alertService.errorAlert('Error', errorMessage);
  }

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
}


  infoDeleteGroup(){

}
