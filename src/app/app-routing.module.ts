import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ContactsComponent } from './contacts/contacts.component';
import { GroupInfoComponent } from './group-info/group-info.component';
import { MessageHistoryComponent } from './message-history/message-history.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { GroupListComponent } from './group-list/group-list.component';
import { ChatDefComponent } from './chat-def/chat-def.component';
import { GroupDefComponent } from './group-def/group-def.component';
import { MessageHistoryUserComponent } from './message-history-user/message-history-user.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'group-info', component: GroupInfoComponent },
  { path: 'message-history', component: MessageHistoryComponent },
  { path: 'profile-info', component: ProfileInfoComponent },
  { path: 'group-chat', component: GroupChatComponent },
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
