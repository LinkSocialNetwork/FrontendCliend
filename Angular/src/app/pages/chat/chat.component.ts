import { ThrowStmt } from '@angular/compiler';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserWithImg } from 'src/app/shared/model/UserWithImg';
import { GetCookieService } from 'src/app/shared/services/get-cookie.service';
import { GetUserService } from 'src/app/shared/services/get-user.service';
import { WebSocketAPI } from '../../api/WebSocketAPI';
import { ChatMessage } from '../../shared/model/ChatMessage';

import { LoginService } from '../../shared/services/login.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy, AfterViewChecked{
  title = 'Chat'

  webSocketAPI: WebSocketAPI;
  message: ChatMessage = {
    'sender': "null",
    'text' : "",
    'time': "",
    'imgUrl':""
  };

  currentOnlineUser: UserWithImg = {
    'userName': "",
    "imgUrl": ""
  }

  allMessages:ChatMessage[];
  msglocation: string;
  lastMsgSender: string;
  userInput = new FormControl('');
  onlineUsers:UserWithImg[];
  typingUsers:String[];
  lastThreeTyping:String[] = [];
  overFlowTypers:number;
  verbToUse:string = "is";

  constructor(private userService:GetUserService,private loginService:LoginService,private router:Router,private cookieServ:GetCookieService){
    this.allMessages=[];
    window.addEventListener("unload", this.sendDisconnect.bind(this));
  }
  ngAfterViewChecked(): void {
    this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
  }
  
  @ViewChild('scroll') private container: ElementRef;

  ngOnInit(): void {
    this.loginService.getLoggedInUser().subscribe(
      data =>{
        // info=data;
        
        if(data==null){
          this.router.navigate(['/login']);
        }
        else {
           this.lastMsgSender = data.userName;  
           this.router.events.subscribe(
             event =>{
               this.sendDisconnect();
             }
           )
        }


      }
    )
    
    this.webSocketAPI = new WebSocketAPI(this,this.loginService,this.cookieServ);
    this.webSocketAPI.getObs().subscribe(
      data=>{
        this.sendStatus();
      }
    )
    this.connect();
    //this.sendStatus();
    let container = document.getElementById("msgContainer");
    container.scrollTop = container.scrollHeight;
    
  }


  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    
    this.sendDisconnect();
    console.log("ng destroy");
    window.removeEventListener("unload", this.sendDisconnect.bind(this));
    
  }

  logoutAndDisconnect(): void {
    
    this.sendDisconnect();
    console.log("logout and disconnect");
    
    
  }


  get messagefield() {
    if(this.message.text == undefined){
      this.message.text = "";
    }
    return this.message.text
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
    this.userService.getCurrentUser().subscribe(
      userName => {
        this.message.sender = userName.userName;
        this.message.imgUrl = userName.profileImg;
        this.lastMsgSender = userName.userName;
        this.webSocketAPI._send(this.message);
        this.messagefield = "";
      }
    );
    
  }

  handleMessage(message) {
    this.sendUserStoppedTyping();
    this.allMessages.push(message);
    console.log(this.allMessages);
    console.log(message.sender);
    console.log(message.text);
  }

  sendStatus() {
    this.userService.getCurrentUser().subscribe(
      userName => {
        if(userName!=null){
          this.currentOnlineUser.userName = userName.userName;
          this.currentOnlineUser.imgUrl = userName.profileImg;
          this.webSocketAPI._sendStatus(this.currentOnlineUser);
          this.sendForOldMessages();
        }
      }
    );
  }
  
  sendDisconnect() {
    let userName=this.loginService.getCurrent();
    if(userName !=null){
      this.webSocketAPI._sendDisconnect(userName.userName);
      this.disconnect();
    }
  }

  handleStatus(newList) {
    this.onlineUsers = newList;
  }

  sendForOldMessages() {
    this.webSocketAPI._sendForOldMessages("getting old messages");
  }

  handleOldMessages(messageList) {
    this.allMessages = messageList;
  }

  sendNewUserTyping() {
    this.webSocketAPI._sendNewUserTyping(this.lastMsgSender);
  }

  sendUserStoppedTyping() {
    if(this.messagefield == ""){
      this.webSocketAPI._sendUserStoppedTyping(this.lastMsgSender);
    }
  }

  handleTypingUsers(userList) {
    this.lastThreeTyping = [];
    this.typingUsers = userList;
    for(var user of this.typingUsers){
      if(user==this.lastMsgSender)
        this.typingUsers.splice(this.typingUsers.indexOf(this.lastMsgSender),1);
    }
    
    if(this.typingUsers.length < 3) {
      this.lastThreeTyping = this.typingUsers;
    }
    else {
      this.lastThreeTyping = this.typingUsers.slice(this.typingUsers.length-3, this.typingUsers.length-1);
    }
    console.log("typingUsers"+this.typingUsers);
    console.log("lastThreeTyping"+this.lastThreeTyping);

    if(this.typingUsers.length > 1)
      this.verbToUse = "are";
    else
      this.verbToUse = "is";
    this.overFlowTypers = this.typingUsers.length - this.lastThreeTyping.length;
  }


  checkUser(inputtedMessage:ChatMessage):boolean{
    if(inputtedMessage.sender == this.lastMsgSender){
      return false;
    }
    return true;
  }
}
