import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { PostsService } from '../../services/posts.service';
import { ChatService } from '../../services/chat.service';
import { Post } from '../../../app/models/post.model';
import { NotificationsService } from '../../../app/services/notifications.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent {
  id!: number;
  post = { creator: {} } as Post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private chatService: ChatService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.id = Number(params.get('id'));
      },
    });

    this.postsService.getPost(this.id).subscribe({
      next: (data) => {
        if (!data) {
          this.notificationsService.addMessages(
            `No product with this id '${this.id}'`,
            'error'
          );
          this.router.navigate(['/']);
        }
        this.post = data;
      },

      error: () => {
        this.router.navigate(['/']);
        this.notificationsService.addMessages(
          'You dont have access to this path',
          'error'
        );
      },
    });
  }

  onContact() {
    this.chatService.createRoom(this.post.creatorId).subscribe({
      next: (data: any) => {
        this.router.navigate([`/chat/${data.id}`]);
      },

      error: () => {
        this.notificationsService.addMessages(
          'Please log in before contacting other users!',
          'error'
        );
      },
    });
  }
}
