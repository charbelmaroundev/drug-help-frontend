import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { AddPostComponent } from './add-post/add-post.component';
import { HomeComponent } from './home/home.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },

      {
        path: 'create',
        canActivate: [AuthGuard],
        component: AddPostComponent,
      },

      {
        path: 'my-posts',
        canActivate: [AuthGuard],
        children: [
          { path: '', component: MyPostsComponent },

          { path: ':id', component: EditPostComponent },
        ],
      },

      { path: ':id', component: ViewComponent },

      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
