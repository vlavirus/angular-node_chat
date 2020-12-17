import { Component, OnInit } from '@angular/core';
import {io} from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:3000';
@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.scss']
})
export class ChatInboxComponent implements OnInit {
  socket: any
  message = ''

  constructor() { }

  ngOnInit(): void {
    this.setupSocketConnection()
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
       const element = document.createElement('li');
       element.innerHTML = data;
       element.style.background = 'white';
       element.style.padding =  '15px 30px';
       element.style.margin = '10px';
       const appendChild = document.querySelector('#message-list');
       appendChild?.appendChild(element)
      }
     });
  }

  SendMessage() {
    this.socket.emit('message', this.message);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding =  '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    const appendChild = document.querySelector('#message-list');
    appendChild?.appendChild(element)
    this.message = '';
  }

}
