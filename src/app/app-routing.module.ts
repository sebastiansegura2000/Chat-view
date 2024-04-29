import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ContactsComponent } from './contacts/contacts.component';
import { GroupInfoComponent } from './group-info/group-info.component';
import { MessageHistoryComponent } from './message-history/message-history.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { GroupChatComponent } from './group-chat/group-chat.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'group-info', component: GroupInfoComponent },
  { path: 'message-history', component: MessageHistoryComponent },
  { path: 'profile-info', component: ProfileInfoComponent },
  { path: 'group-chat', component: GroupChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
