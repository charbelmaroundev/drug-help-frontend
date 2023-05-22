import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'ngx-avatar';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConversationComponent } from './conversation/conversation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ChatComponent, ConversationComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AvatarModule,
    DragDropModule,
  ],
})
export class ChatModule {}
