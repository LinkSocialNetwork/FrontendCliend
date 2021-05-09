import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatMessage } from 'src/app/shared/model/ChatMessage';
import { UserWithImg } from 'src/app/shared/model/UserWithImg';
import { GetCookieService } from 'src/app/shared/services/get-cookie.service';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { WebSocketAPI } from '../../api/WebSocketAPI';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  title = 'Chat';
  theme: string = 'light';

  webSocketAPI: WebSocketAPI;
  message: ChatMessage = {
    sender: 'null',
    text: '',
    time: '',
    imgUrl: '',
  };

  currentOnlineUser: UserWithImg = {
    userName: '',
    imgUrl: '',
    userID:0
  };

  allMessages: ChatMessage[];
  msglocation: string;
  lastMsgSender: string;
  userInput = new FormControl('');
  onlineUsers: UserWithImg[];
  typingUsers: String[] = [];
  lastTyping: String = '';
  overFlowTypers: number;
  verbToUse: string = 'is';

  constructor(
    private userService: GetUserService,
    private loginService: LoginService,
    private router: Router,
    private cookieServ: GetCookieService
  ) {
    this.allMessages = [];
    window.addEventListener('unload', this.sendDisconnect.bind(this));
  }
  ngAfterViewChecked(): void {
    this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
  }

  @ViewChild('scroll') private container: ElementRef;

  ngOnInit(): void {
    let authtoken = this.cookieServ.getCookie("token")
    if(!authtoken)
      this.router.navigate(['login'])

    if (window.localStorage.getItem('theme') != undefined) {
      this.theme = window.localStorage.getItem('theme');
    }
    this.loginService.getLoggedInUser().subscribe((data) => {
      if (data == null) {
        this.router.navigate(['/login']);
      } else {
        this.lastMsgSender = data.userName;
        this.router.events.subscribe((event) => {
          this.sendDisconnect();
        });
      }
    });

    this.webSocketAPI = new WebSocketAPI(
      this,
      this.loginService,
      this.cookieServ
    );
    this.webSocketAPI.getObs().subscribe((data) => {
      this.sendStatus();
    });
    this.connect();
    let container = document.getElementById('msgContainer');
    container.scrollTop = container.scrollHeight;
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.sendDisconnect();
    window.removeEventListener('unload', this.sendDisconnect.bind(this));
  }

  logoutAndDisconnect(): void {
    this.sendDisconnect();
  }

  get messagefield() {
    if (this.message.text == undefined) {
      this.message.text = '';
    }
    return this.message.text;
  }

  set messagefield(text: string) {
    this.message.text = text;
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.userService.getCurrentUser().subscribe((userName) => {
      this.message.sender = userName.userName;
      this.message.imgUrl = userName.profileImg;
      this.lastMsgSender = userName.userName;
      this.webSocketAPI._send(this.message);
      this.messagefield = '';
    });
  }

  handleMessage(message) {
    this.sendUserStoppedTyping();
    this.allMessages.push(message);
  }

  sendStatus() {
    this.userService.getCurrentUser().subscribe((userName) => {
      if (userName != null) {
        this.currentOnlineUser.userName = userName.userName;
        this.currentOnlineUser.imgUrl = userName.profileImg;
        this.currentOnlineUser.userID = userName.userID;
        console.log(userName.userID)
        this.webSocketAPI._sendStatus(this.currentOnlineUser);
        this.sendForOldMessages();
      }
    });
  }

  sendDisconnect() {
    this.webSocketAPI._sendUserStoppedTyping(this.lastMsgSender);
    let userName = this.loginService.getCurrent();
    if (userName != null) {
      this.webSocketAPI._sendDisconnect(userName.userName);
      this.disconnect();
    }
  }

  handleStatus(newList) {
    this.onlineUsers = newList;
  }

  sendForOldMessages() {
    this.webSocketAPI._sendForOldMessages('getting old messages');
  }

  handleOldMessages(messageList) {
    this.allMessages = messageList;
  }

  sendNewUserTyping() {
    this.webSocketAPI._sendNewUserTyping(this.lastMsgSender);
  }

  sendUserStoppedTyping() {
    if (this.messagefield == '') {
      this.webSocketAPI._sendUserStoppedTyping(this.lastMsgSender);
    }
  }

  handleTypingUsers(userList) {
    this.lastTyping = '';
    this.typingUsers = userList;
    for (var user of this.typingUsers) {
      if (user == this.lastMsgSender)
        this.typingUsers.splice(
          this.typingUsers.indexOf(this.lastMsgSender),
          1
        );
    }

    this.lastTyping = this.typingUsers[this.typingUsers.length - 1];

    if (this.typingUsers.length > 1) this.verbToUse = 'are';
    else this.verbToUse = 'is';
    this.overFlowTypers = this.typingUsers.length - 1;
  }

  checkUser(inputtedMessage: ChatMessage): boolean {
    if (inputtedMessage.sender == this.lastMsgSender) {
      return false;
    }
    return true;
  }

  toggleTheme(): void {
    if (this.theme === 'light') {
      this.theme = 'dark';
      window.localStorage['theme'] = this.theme;
      return;
    }
    if (this.theme === 'dark') {
      this.theme = 'light';
      window.localStorage['theme'] = this.theme;
      return;
    }
  }
}
