import { Component } from '@angular/core';
import { Post } from '../../../app/models/post.model';

import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
})
export class MyPostsComponent {
  posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getMyPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this post')) {
      this.postsService.deletePosts(id).subscribe({
        next: () => {
          this.posts = this.posts.filter((post) => post.id !== id);
        },
      });
    }
  }
}
