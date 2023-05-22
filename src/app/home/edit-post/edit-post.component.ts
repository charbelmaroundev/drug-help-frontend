import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import {
  ALebanonCity,
  ELebanonCity,
  Post,
} from '../../../app/models/post.model';
import { PostsService } from '../../../app/services/posts.service';
import { NotificationsService } from 'src/app/services';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent {
  post = {} as Post;
  updatePostForm!: FormGroup;
  base64Image!: string | ArrayBuffer | null;
  backroundInputImage!: string | ArrayBuffer | null;
  updatedBackroundInputImage!: string | ArrayBuffer | null;
  imageName!: string;
  id!: number;

  locations: ELebanonCity[] = ALebanonCity;
  Location!: ELebanonCity;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private notificationsService: NotificationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.id = Number(params.get('id'));
      },
    });

    this.postsService.getPost(this.id).subscribe({
      next: (data) => {
        this.post = data;
        this.backroundInputImage = `url(${this.post.imageUrl})`;
      },
    });

    this.updatePostForm = new FormGroup({
      title: new FormControl(this.post.title, [
        Validators.required,
        Validators.pattern(/^.{3,}$/),
      ]),

      description: new FormControl(this.post.description, [
        Validators.required,
        Validators.pattern(/.{20,}/),
      ]),

      priceInDollar: new FormControl(this.post.priceInDollar, [
        Validators.required,
        Validators.pattern(/^[0-9]*[0-9][0-9]*$/),
      ]),

      location: new FormControl(this.post.location, [Validators.required]),
    });
  }

  validationMessages = {
    title: {
      required: 'title is required',
      pattern: 'title must be at least 3 characters',
    },

    description: {
      required: 'description is required',
      pattern: 'description must be at least 20 characters',
    },

    priceInDollar: {
      required: 'price is required',
      pattern: 'price must be a positive number.',
    },

    location: {
      required: 'location is required',
    },
  };

  get title() {
    return this.updatePostForm.get('title')!;
  }

  get description() {
    return this.updatePostForm.get('description')!;
  }

  get priceInDollar() {
    return this.updatePostForm.get('priceInDollar')!;
  }

  get location() {
    return this.updatePostForm.get('location')!;
  }

  switchLocation() {
    this.Location = this.updatePostForm.value.location;
  }

  handleUpload(event: any) {
    this.imageName = event.target.files[0].name;

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.backroundInputImage = null;
      this.updatedBackroundInputImage = `url(${reader.result})`;
      this.base64Image = reader.result;
    };
  }

  onUpdate() {
    this.postsService
      .updatePost(this.post.id, this.updatePostForm.value, this.base64Image)
      .subscribe({
        next: () => {
          this.notificationsService.addMessages('Post Updated!', 'success');
          this.router.navigate(['/my-posts']);
        },
      });
  }
}
