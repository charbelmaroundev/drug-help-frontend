import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  notClicked = false;
  rooms!: any;
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
