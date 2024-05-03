import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ChatComponent } from './chat/chat.component';
import { MessageHistoryComponent } from './message-history/message-history.component';
import { GroupInfoComponent } from './group-info/group-info.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { GroupListComponent } from './group-list/group-list.component';
import { ChatDefComponent } from './chat-def/chat-def.component';
import { GroupDefComponent } from './group-def/group-def.component';




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
    GroupDefComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
