import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PostsService } from '../../services/posts.service';
import {
  addPost,
  addPostSuccess,
  loadPosts,
  loadPostsSuccess,
} from './posts.actions';
import { debounceTime, distinctUntilChanged, map, mergeMap } from 'rxjs';

@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      debounceTime(1000),
      distinctUntilChanged(),
      mergeMap((action) => {
        return this.postsService.getPosts().pipe(
          map((posts) => {
            return loadPostsSuccess({ posts });
          })
        );
      })
    );
  });
}
