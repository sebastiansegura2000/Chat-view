import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './Components/chat/chat.component';
import { ContactsComponent } from './Components/contacts/contacts.component';
import { GroupInfoComponent } from './Components/group-info/group-info.component';
import { MessageHistoryComponent } from './Components/message-history/message-history.component';
import { ProfileInfoComponent } from './Components/profile-info/profile-info.component';
import { GroupChatComponent } from './Components/group-chat/group-chat.component';
import { ChatListComponent } from './Components/chat-list/chat-list.component';
import { GroupListComponent } from './Components/group-list/group-list.component';
import { ChatDefComponent } from './Components/chat-def/chat-def.component';
import { GroupDefComponent } from './Components/group-def/group-def.component';
import { MessageHistoryUserComponent } from './Components/message-history-user/message-history-user.component';
import { PermissionGuard } from './Guard/permission.guard';

const routes: Routes = [

  { path: 'contacts', component: ContactsComponent },
  { path: 'group-info', component: GroupInfoComponent },
  { path: 'message-history', component: MessageHistoryComponent,canActivate: [PermissionGuard],  data: { roles: ['administrador','coordinador'] } },
  { path: 'profile-info', component: ProfileInfoComponent },
  { path: 'chat-list', component: ChatListComponent },
  { path: 'group-list', component: GroupListComponent },
  { path: 'chat-def', component: ChatDefComponent },
  { path: 'group-def', component: GroupDefComponent },
  { path: 'message-history-user', component: MessageHistoryUserComponent },
  { path: '', redirectTo: '/chat-def', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
