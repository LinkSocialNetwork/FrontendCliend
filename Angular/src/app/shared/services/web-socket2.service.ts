import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ChatMessage } from '../model/ChatMessage';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocket2Service {
  url:string = 'http://localhost:9080/toph/link/ws';
  topic:string = "/topic/messages";
  stompClient:any;
  messageList:ChatMessage[]=[];
  messages:Observable<ChatMessage[]> = of(this.messageList);

  constructor(private loginService:LoginService) { }

  _connect(){
    if(this.loginService.getCurrent()==null){
      return;
    }
    let ws =new SockJS(this.url);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame){
      _this.stompClient.subscribe("/topic/messages",function(sdkEvent){
        _this.onMessageReceived(sdkEvent);
      });
      _this.stompClient.subscribe("/topic/status",function (sdkEvent){
        _this.onStatusReceived(sdkEvent);
      });
      _this.stompClient.subscribe("/topic/loadMessages",function(sdkEvent){
        _this.onOldMessagesReceived(sdkEvent);
      });
    }, this.errorCallBack);
  };

  _disconnect(){
    if(this.stompClient !==null){
      this.stompClient.disconnect();
    }
  }

  errorCallBack(error:any){
    setTimeout(()=>{
      this._connect();
    },5000);
  }

  _send(message){
    this.stompClient.send("/app/chat",{},JSON.stringify(message));
  }

  onMessageReceived(message) {
    this.messageList.push(JSON.parse(message.body));
  }

_sendStatus(message) {
    this.stompClient.send("/app/onlineUsers", {}, JSON.stringify(message));
}

_sendDisconnect(message) {
    this.stompClient.send("/app/disconnect", {}, JSON.stringify(message));
}

onStatusReceived(message) {
    this.chatComponent.handleStatus(JSON.parse(message.body));
}

_sendForOldMessages(message) {
    this.stompClient.send("/app/loadMessages", {}, JSON.stringify(message));
}

onOldMessagesReceived(message) {
    this.chatComponent.handleOldMessages(JSON.parse(message.body));
}
  
}
