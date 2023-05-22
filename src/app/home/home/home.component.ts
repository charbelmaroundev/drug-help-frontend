import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Post } from '../../models/post.model';
import { AppState } from '../../store/app.state';
import { PostsService } from '../../services/posts.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  userId!: number;

  constructor(
    private store: Store<AppState>,
    private postsService: PostsService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const access_token = this.authService.getLocalStorage();
    if (access_token) {
      this.userService.whoAmi().subscribe({
        next: (data) => {
          this.userId = data.id;
        },
      });
    }

    this.postsService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
    });

    this.postsService.pagesOutput.subscribe({
      next: (posts) => {
        this.posts = posts;
      },
    });
  }
}
