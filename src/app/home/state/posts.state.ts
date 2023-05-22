import { Post } from 'src/app/models/post.model';

interface PostState {
  posts: Post[];
}

const initialeState: PostState = {
  posts: [],
};

export { initialeState, PostState };
