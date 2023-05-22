import { Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AvatarModule } from 'ngx-avatar';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PostByLocationChartComponent } from './post-by-location-chart/post-by-location-chart.component';
import { PostsPerMonthComponent } from './posts-per-month/posts-per-month.component';
import { UsersPerMonthComponent } from './users-per-month/users-per-month.component';
import { SharedModule } from '../shared/shared.module';
import { ChatAdminComponent } from './chat-admin/chat-admin.component';
import { ConversationAdminComponent } from './conversation-admin/conversation-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AdminComponent,
    PostByLocationChartComponent,
    PostsPerMonthComponent,
    UsersPerMonthComponent,
    ChatAdminComponent,
    ConversationAdminComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    AvatarModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
})
export class AdminModule {}
