import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.socket = io(this.url, {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
  }

  createRoom(id: number | undefined) {
    return this.http.post(`http://localhost:3000/api/v1/room`, {
      id,
    });
  }

  getRooms() {
    return this.http.get(`http://localhost:3000/api/v1/room`);
  }

  getRoom(id: string | null) {
    return this.http.get<any>(`http://localhost:3000/api/v1/room/${id}`);
  }

  joinRoom(data: any): void {
    this.socket.emit('join', data);
  }

  sendMessage(data: any): void {
    this.socket.emit('message', data);
  }

  getMessage(): Observable<any> {
    return new Observable<{ user: string; message: string }>((observer) => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  getAdminRooms() {
    return this.http.get(`http://localhost:3000/api/v1/room/admin`);
  }
}
