import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ChatComponent } from '../pages/chat/chat.component';
import { GetCookieService } from '../shared/services/get-cookie.service';
import { LoginService } from '../shared/services/login.service';


export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:9081/ws';
    topic: string = "/topic/messages";
    stompClient: Stomp.Client;
    chatComponent: ChatComponent;
    tempObs = new Subject<string>();
    constructor(chatComponent: ChatComponent ,private loginServ:LoginService, private cookieService:GetCookieService) {
        this.chatComponent = chatComponent;
    }
    getObs(){
        return this.tempObs.asObservable();
    }
    _connect() {
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        let authtoken = this.cookieService.getCookie("token")
        _this.stompClient.connect({
            headers: {
              token: authtoken
            }, withCredentials:true
          }, function (frame) {
            _this.stompClient.subscribe("/topic/messages", function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
            _this.stompClient.subscribe("/topic/status", function (sdkEvent){
                _this.onStatusReceived(sdkEvent);
            });
            _this.stompClient.subscribe("/topic/loadMessages", function (sdkEvent){
                _this.onOldMessagesReceived(sdkEvent);
            });
            _this.stompClient.subscribe("/topic/typing", function (sdkEvent){
                _this.onTypingUsersReceived(sdkEvent);
            });
            _this.tempObs.next("Done");
        }, this.errorCallBack);
    }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect(()=>{});
        }
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    _send(message) {
        this.stompClient.send("/app/chat", {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        this.chatComponent.handleMessage(JSON.parse(message.body));
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

    _sendNewUserTyping(message) {
        this.stompClient.send("/app/typing", {}, JSON.stringify(message));
    }

    _sendUserStoppedTyping(message) {
        this.stompClient.send("/app/notTyping", {}, JSON.stringify(message));
    }

    onTypingUsersReceived(message) {
        this.chatComponent.handleTypingUsers(JSON.parse(message.body));
    }
}
