import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { PostByLocationChartComponent } from './post-by-location-chart/post-by-location-chart.component';
import { PostsPerMonthComponent } from './posts-per-month/posts-per-month.component';
import { UsersPerMonthComponent } from './users-per-month/users-per-month.component';
import { UsersComponent } from './users/users.component';
import { ChatAdminComponent } from './chat-admin/chat-admin.component';
import { ConversationAdminComponent } from './conversation-admin/conversation-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },

  {
    path: 'post-by-location',
    component: PostByLocationChartComponent,
  },

  {
    path: 'posts-per-month',
    component: PostsPerMonthComponent,
  },

  {
    path: 'created-users-per-month',
    component: UsersPerMonthComponent,
  },

  {
    path: 'users',
    component: UsersComponent,
  },

  {
    path: 'chat',
    component: ChatAdminComponent,

    children: [{ path: ':roomId', component: ConversationAdminComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
