import { Injectable } from '@angular/core';
import * as Rx from "rxjs"
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  url:string='http://localhost:9080/toph/link/ws'
  constructor() { }

  private subject: Rx.Subject<MessageEvent>;

  public connect():Rx.Subject<MessageEvent>{
    if(!this.subject){
      this.subject = this.create(this.url);
    }
    return this.subject;
  }

  private create(url:string):Rx.Subject<MessageEvent>{
    let ws = new WebSocket(url);
    let observable = new Rx.Observable((obs:Observer<MessageEvent>)=>{
      ws.onmessage =obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    })
    let observer={
      next:(data:Object)=>{
        if(ws.readyState===WebSocket.OPEN){
          ws.send(JSON.stringify(data));
        }
      }
    };

    return Rx.Subject.create(observer,observable);
  }
}
