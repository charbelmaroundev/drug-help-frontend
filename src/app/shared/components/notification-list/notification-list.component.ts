import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  NotificationsService,
  Command,
} from '../../../services/notifications.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent implements OnInit {
  messages!: Observable<Command[]>;

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.messages = this.notificationsService.messagesOutput;
  }

  clearMessage(id: number) {
    this.notificationsService.clearMessages(id);
  }
}
