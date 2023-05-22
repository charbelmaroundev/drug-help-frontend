import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ValidationPipe } from './pipes/validation.pipe';
import { ErrorFieldComponent } from './components/error-field/error-field.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { HeaderComponent } from './components/header/header.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { CountUpDirective } from '../directives/count-up.directive';

@NgModule({
  declarations: [
    ValidationPipe,
    TimeAgoPipe,
    NotificationListComponent,
    ErrorFieldComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    CountUpDirective,
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AvatarModule,
  ],

  exports: [
    ValidationPipe,
    TimeAgoPipe,
    NotificationListComponent,
    ErrorFieldComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    CountUpDirective,
  ],
})
export class SharedModule {}
