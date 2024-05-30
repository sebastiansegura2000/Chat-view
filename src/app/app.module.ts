import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MessageHistoryComponent } from './Components/message-history/message-history.component';
import { GroupInfoComponent } from './Components/group-info/group-info.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GroupChatComponent } from './Components/group-chat/group-chat.component';
import { ChatListComponent } from './Components/chat-list/chat-list.component';

import { MessageHistoryUserComponent } from './Components/message-history-user/message-history-user.component';
import { IGroupManagementService } from './Abstract/Group/management/igroup-management.service';
import { GroupManagementService } from './Services/Group/management/group-management.service';
import { UserService } from './Abstract/User/service/user-service.service';
import { UserHttpService } from './Services/User/service/user-http-service.service';
import { IMessageQueryForUserService } from './Abstract/Message/User/imessage-query-for-user.service';
import { MessageQueryForUserService } from './Services/Message/User/message-query-for-user.service';
import { IMessageQueryForGroupService } from './Abstract/Message/Group/imessage-query-for-group.service';
import { MessageQueryForGroupService } from './Services/Message/Group/message-query-for-group.service';
import { IUSerRepositoryService } from './Abstract/User/repository/iuser-repository.service';
import { UserRepositoryService } from './Services/User/repository/user-repository.service';
import { ContactsComponent } from './Components/contacts/contacts.component';
import { ChatComponent } from './Components/chat/chat.component';
import { ProfileInfoComponent } from './Components/profile-info/profile-info.component';
import { GroupListComponent } from './Components/group-list/group-list.component';
import { ChatDefComponent } from './Components/chat-def/chat-def.component';
import { GroupDefComponent } from './Components/group-def/group-def.component';
import { IGroupAdvancedService } from './Abstract/Group/Advanced/igroup-advanced.service';
import { GroupAdvancedService } from './Services/Group/Advanced/group-advanced.service';
import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";
import { environment } from 'src/environments/environment';
import { IMessageQueryService } from './Abstract/Message/MessageQuery/imessage-query.service';
import { MessageQueryService } from './Services/Message/MessageQuery/message-query.service';
import { ChatService } from './Services/Chat/chat.service';
import { InformsComponent } from './Components/informs/informs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IGroupUserReportService } from './Abstract/Report/igroup-user-report.service';
import { GroupUserReportService } from './Services/Report/Group/group-user-report.service';
import { IActiveGroupReportService } from './Abstract/Report/Group/iactive-group-report.service';
import { ActiveGroupReportService } from './Services/Report/Group/active-group-report.service';
import { IInactiveGroupReportService } from './Abstract/Report/Group/iinactive-group-report.service';
import { InactiveGroupReportService } from './Services/Report/Group/inactive-group-report.service';
import { IUserReportService } from './Abstract/Report/User/iuser-report.service';
import { UserReportService } from './Services/Report/User/user-report.service';
import { IGroupInfoExportService } from './Abstract/Exports/Group/igroup-info-export.service';
import { GroupInfoExportService } from './Services/Exports/Group/group-info-export.service';
import { IUserActivityService } from './Abstract/Exports/User/iuser-activity.service';
import { UserActivityService } from './Services/Exports/User/user-activity.service';
import { IGroupActivityService } from './Abstract/Exports/Group/igroup-activity.service';
import { GroupActivityExportService } from './Services/Exports/Group/group-activity-export.service';
import { IGroupArchiveService } from './Abstract/Group/Archive/igroup-archive.service';
import { GroupArchiveService } from './Services/Group/Archive/group-archive.service';
import { IMessageReportService } from './Abstract/Report/Message/imessage-report.service';
import { MessageReportService } from './Services/Report/Message/message-report.service';

  const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: environment.mqtt.server,
    port: environment.mqtt.port,
    protocol: (environment.mqtt.protocol === "wss") ? "wss" : "ws",
    path: '/mqtt'
  };



@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ChatComponent,
    MessageHistoryComponent,
    GroupInfoComponent,
    ProfileInfoComponent,
    GroupChatComponent,
    ChatListComponent,
    GroupListComponent,
    ChatDefComponent,
    GroupDefComponent,
    MessageHistoryUserComponent,
    InformsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    NgxChartsModule,
    BrowserAnimationsModule,
  ],

  providers: [
    ChatService,
    { provide:UserService,useClass:UserHttpService},
    {provide:IMessageQueryForUserService,useClass:MessageQueryForUserService},
    { provide: IGroupManagementService, useClass: GroupManagementService },
    {provide: IMessageQueryForGroupService, useClass: MessageQueryForGroupService},
    {provide: IUSerRepositoryService,useClass: UserRepositoryService},
    {provide: IGroupAdvancedService,useClass: GroupAdvancedService},
    {provide: IMessageQueryService,useClass: MessageQueryService},
    {provide: IGroupUserReportService,useClass: GroupUserReportService},
    {provide: IActiveGroupReportService,useClass: ActiveGroupReportService},
    {provide: IInactiveGroupReportService,useClass: InactiveGroupReportService},
    {provide: IUserReportService,useClass: UserReportService},
    {provide: IGroupInfoExportService,useClass: GroupInfoExportService},
    {provide: IUserActivityService,useClass: UserActivityService},
    {provide: IGroupArchiveService,useClass: GroupArchiveService},
    {provide: IGroupActivityService,useClass: GroupActivityExportService},
    {provide: IMessageReportService,useClass: MessageReportService},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
