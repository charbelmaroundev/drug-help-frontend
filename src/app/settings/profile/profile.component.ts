import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { IUser } from '../../../app/models/user.model';
import { NotificationsService } from '../../../app/services/notifications.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user = {} as IUser;
  profileForm!: FormGroup;
  base64Image!: string | ArrayBuffer | null;
  backroundInputImage!: string | ArrayBuffer | null;
  updatedBackroundInputImage!: string | ArrayBuffer | null;
  imageName!: string;

  constructor(
    private userService: UserService,
    private notificationsService: NotificationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.whoAmi().subscribe({
      next: (data) => {
        this.user = data;
        this.backroundInputImage = `url(${data.picture})`;
      },
    });

    this.profileForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^.{3,}$/),
      ]),

      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^.{3,}$/),
      ]),
    });
  }

  validationMessages = {
    firstName: {
      required: 'first name is required',
      pattern: 'first name should be at least 3 characters.',
    },

    lastName: {
      required: 'last name is required',
      pattern: 'last name should be at least 3 characters.',
    },
  };

  get firstName() {
    return this.profileForm.get('firstName')!;
  }

  get lastName() {
    return this.profileForm.get('lastName')!;
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
    const { firstName, lastName } = this.profileForm.value;

    this.userService
      .updateUser(firstName, lastName, this.base64Image)
      .subscribe({
        next: (data: any) => {
          this.notificationsService.addMessages(data.message, 'success');
          this.router.navigate(['/']);
        },
      });
  }
}
