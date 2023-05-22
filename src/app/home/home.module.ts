import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from '../home/edit-post/edit-post.component';
import { postsReducer } from './state/posts.reducer';
import { POST_STATE_NAME } from './state/posts.selector';
import { PostEffects } from './state/posts.effects';
import { ViewComponent } from './view/view.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    AddPostComponent,
    EditPostComponent,
    ViewComponent,
    MyPostsComponent,
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    FormsModule,
    SharedModule,
    HomeRoutingModule,
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
    EffectsModule.forFeature([PostEffects]),
  ],
})
export class HomeModule {}
