import { Injectable } from '@angular/core';
import { Observable, Subject, scan } from 'rxjs';

export interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  messagesInput!: Subject<Command>;
  messagesOutput!: Observable<Command[]>;

  constructor() {
    this.messagesInput = new Subject<Command>();
    this.messagesOutput = this.messagesInput.pipe(
      scan((acc: Command[], value: Command) => {
        if (value.type === 'clear') {
          return acc.filter((message) => message.id !== value.id);
        } else {
          return [...acc, value];
        }
      }, [])
    );
  }

  addMessages(message: string, type: 'success' | 'error') {
    const id = this.randomId();

    this.messagesInput.next({
      id,
      text: message,
      type,
    });

    setTimeout(() => {
      this.clearMessages(id);
    }, 10000);
  }

  clearMessages(id: number) {
    this.messagesInput.next({
      id,
      type: 'clear',
    });
  }

  private randomId = () => Math.round(Math.random() * 10000);
}
