import { createReducer, on } from '@ngrx/store';
import { initialeState } from './posts.state';
import {
  addPost,
  deletePost,
  loadPostsSuccess,
  updatePost,
} from './posts.actions';

const _postsReducer = createReducer(
  initialeState,
  on(addPost, (state, action) => {
    let post = { ...action.post };

    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),

  on(updatePost, (state, action) => {
    const updatedPosts = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post;
    });

    return {
      ...state,
      posts: updatedPosts,
    };
  }),

  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    };
  })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
