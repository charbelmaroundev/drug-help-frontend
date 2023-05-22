import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ALebanonCity, ELebanonCity } from '../../../app/models/post.model';
import { AppState } from '../../../app/store/app.state';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  createPostForm!: FormGroup;
  base64Image!: string | ArrayBuffer | null;
  updatedBackroundInputImage!: string | ArrayBuffer | null;
  imageName!: string;

  Location!: ELebanonCity;
  locations: ELebanonCity[] = ALebanonCity;

  constructor(
    private store: Store<AppState>,
    private postsService: PostsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.pattern(/.{3,}/),
      ]),

      description: new FormControl('', [
        Validators.required,
        Validators.pattern(/.{20,}/),
      ]),

      price: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]*[0-9][0-9]*$/),
      ]),

      location: new FormControl('', [Validators.required]),
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

    price: {
      required: 'price is required',
      pattern: 'price must be a positive number.',
    },

    location: {
      required: 'location is required',
    },

    image: {
      required: 'image is required',
    },
  };

  get title() {
    return this.createPostForm.get('title')!;
  }

  get description() {
    return this.createPostForm.get('description')!;
  }

  get price() {
    return this.createPostForm.get('price')!;
  }

  get location() {
    return this.createPostForm.get('location')!;
  }

  get image() {
    return this.createPostForm.get('image')!;
  }

  switchLocation() {
    this.Location = this.createPostForm.value.location;
  }

  handleUpload(event: any) {
    this.imageName = event.target.files[0].name;

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.updatedBackroundInputImage = `url(${reader.result})`;
      this.base64Image = reader.result;
    };
  }

  onAddPost() {
    const { title, description, price, location } = this.createPostForm.value;
    console.log(title, description, price, location);

    this.postsService
      .addPost(title, description, this.base64Image, price, location)
      .subscribe();

    this.router.navigate(['/']);
  }
}
