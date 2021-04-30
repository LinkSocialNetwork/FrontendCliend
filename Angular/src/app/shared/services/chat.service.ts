import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import { ChatMessage } from '../model/ChatMessage';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages:Subject<ChatMessage>;
  constructor(wsService:WebSocketService) {
    this.messages = <Subject<ChatMessage>>wsService.connect().pipe(map(
      (response:MessageEvent):ChatMessage=>{
        let data = JSON.parse(response.data);
        return {
          "sender": data.sender,
          "text": data.text,
          "time": data.time
        };
      }
    ));
  }
}
