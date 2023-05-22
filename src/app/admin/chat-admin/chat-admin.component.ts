import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { ChatService } from '../../services/index';

@Component({
  selector: 'app-chat-admin',
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css'],
})
export class ChatAdminComponent {
  notClicked = false;
  rooms!: any;
  roomsMessages!: any;
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getRooms().subscribe({
      next: (data: any) => {
        this.rooms = data[0].rooms;
      },
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.rooms, event.previousIndex, event.currentIndex);
  }
}
