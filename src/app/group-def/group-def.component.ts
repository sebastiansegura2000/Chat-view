import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from '../GlobalVariables/global-variables.service';
import { UserAuthServiceService } from '../Auth/user-auth-service.service';

@Component({
  selector: 'app-group-def',
  templateUrl: './group-def.component.html',
  styleUrls: ['./group-def.component.css'],
})
export class GroupDefComponent implements OnInit {
  constructor(
    private globalService: GlobalVariablesService,
    private authUser: UserAuthServiceService
  ) {
    this.authUser.UserAuth().subscribe((UserData) => {
      this.globalService.userAuth.value.userData = UserData.user;
    });
  }

  ngOnInit(): void {
  }
}
