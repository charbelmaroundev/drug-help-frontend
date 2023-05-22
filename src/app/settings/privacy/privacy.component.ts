import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../../app/store/app.state';
import { UserService } from '../../../app/services/user.service';
import { NotificationsService } from '../../../app/services/notifications.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
})
export class PrivacyComponent {
  changePasswordForm!: FormGroup;
  deleteUnlinkAccountForm!: FormGroup;
  provided = false;
  form!: 'delete' | 'upgrade';
  openModel!: boolean;

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private notificationsService: NotificationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.whoAmi().subscribe({
      next: (data) => {
        if (data.status === 'PROVIDED') this.provided = true;
      },
    });

    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
        ),
      ]),

      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
        ),
      ]),
    });

    this.deleteUnlinkAccountForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
        ),
      ]),
    });
  }

  validationMessages = {
    oldPassword: {
      required: 'old password is required',
      pattern:
        'old password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and cannot contain any spaces.',
    },

    newPassword: {
      required: 'new password is required',
      pattern:
        'new password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and cannot contain any spaces.',
    },

    password: {
      required: 'password is required',
      pattern:
        'password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and cannot contain any spaces.',
    },
  };

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword')!;
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword')!;
  }
  get password() {
    return this.deleteUnlinkAccountForm.get('password')!;
  }

  modalToggle(option: boolean) {
    this.openModel = option;
  }

  onChangePassword() {
    const { oldPassword, newPassword } = this.changePasswordForm.value;

    this.userService.changePassword(oldPassword, newPassword).subscribe({
      next: (data: any) => {
        this.notificationsService.addMessages(data.message, 'success');
        this.router.navigate(['/']);
      },

      error: (e) => {
        this.notificationsService.addMessages(e.error.message, 'error');
      },
    });
  }

  onDeleteUnlinkAccount() {
    this.openModel = true;
    const { password } = this.deleteUnlinkAccountForm.value;

    if (this.provided) {
      this.userService.unlinkAccount(password).subscribe({
        next: (data: any) => {
          this.notificationsService.addMessages(data.message, 'success');
          this.router.navigate(['/']);
        },
      });
    } else {
      this.userService.deleteAccount(password).subscribe({
        next: () => {
          this.notificationsService.addMessages('Account deleted!', 'success');
          this.router.navigate(['/auth']);
        },

        error: (e) => {
          this.notificationsService.addMessages(e.error.message, 'error');
        },
      });
    }
  }
}
