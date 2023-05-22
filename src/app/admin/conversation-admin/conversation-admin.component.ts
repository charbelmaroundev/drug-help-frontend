import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { IUser } from '../../models/index';
import { AuthService, ChatService, UserService } from '../../services/index';

@Component({
  selector: 'app-conversation-admin',
  templateUrl: './conversation-admin.component.html',
  styleUrls: ['./conversation-admin.component.css'],
})
export class ConversationAdminComponent {
  close = true;
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
    if (this.messageForm.invalid) {
      return;
    }

    this.chatService.sendMessage({
      room: this.roomId,
      user: this.senderId,
      message: this.messageForm.value.message,
    });
    this.messageForm.reset();
  }
}
