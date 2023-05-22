import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import { IUser } from '../../../app/models/user.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent {
  roomId!: string | null;
  senderId!: number;
  messageForm!: FormGroup;
  messagesList!: any;
  participant = {} as IUser;
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
    });

    this.userService.whoAmi().subscribe({
      next: (data) => {
        this.senderId = data.id;
      },
    });

    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.roomId = params.get('roomId');

        this.chatService.getRoom(this.roomId).subscribe({
          next: (data) => {
            this.messagesList = data.messages;
            this.participant = data.participants[0];
          },
        });

        this.chatService.joinRoom({
          room: this.roomId,
        });
      },
    });

    this.chatService.getMessage().subscribe({
      next: (data) => {
        this.messagesList.push({
          createdAt: new Date().toISOString(),
          content: data.message,
          creatorId: data.user,
          roomId: this.roomId,
        });
      },
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMessage(): void {
    this.chatService.sendMessage({
      room: this.roomId,
      user: this.senderId,
      message: this.messageForm.value.message,
    });
    this.messageForm.reset();
  }
}
