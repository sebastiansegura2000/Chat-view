import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/app/Services/GlobalVariables/global-variables.service';
import { UserAuthServiceService } from 'src/app/Services/Auth/user-auth-service.service';

@Component({
  selector: 'app-chat-def',
  templateUrl: './chat-def.component.html',
  styleUrls: ['./chat-def.component.css'],
})
export class ChatDefComponent implements OnInit {

  constructor(
    private globalService: GlobalVariablesService,
    private authUser: UserAuthServiceService
  ) {}

  ngOnInit(): void {
    this.authUser.UserAuth().subscribe((UserData)=>{
      this.globalService.userAuth.value.userData = UserData.user;
    })
  }


}
