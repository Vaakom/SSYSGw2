import {Component, OnInit, OnDestroy} from '@angular/core';
import {SessionService} from "./system/session.service";
import {WebSocketService} from "./system/websocket.servcie";

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit, OnDestroy{
    constructor(private sessionService: SessionService, private webSocketService: WebSocketService){
    }

    ngOnInit(): void {
        this.webSocketService.start("ws://ft-depo:8088/SSYSGw/ws");
    }

    ngOnDestroy(): void {        
        this.webSocketService.close();        
    }

    isSignedIn() : boolean {
      return this.sessionService.userInfo != null;
    }    
}
