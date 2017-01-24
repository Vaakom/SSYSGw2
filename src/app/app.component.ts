import {Component, OnInit, OnDestroy} from '@angular/core';
import {SessionService} from "./session.service";
import {WebSocketService} from "./websocket.servcie";

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit, OnDestroy{
    constructor(private sessionService: SessionService, private webSocketService: WebSocketService){
    }

    ngOnInit(): void {
        this.webSocketService.start("ws://ft-depo:8088/SSYSGw/ws");
        this.webSocketService.ws.subscribe({next: data => console.log(data), error: err => console.log(err)});
        
        console.log('Sending');
        let loginString = 'appver=123&action=NLogon&data={t:' + new Date().getTime() + ',u:"DepoMonitor1",p:"2"}'
        this.webSocketService.ws.next('test');        
        console.log('Done');
    }

    ngOnDestroy(): void {        
        this.webSocketService.close();        
    }

    isSignedIn() : boolean {
      return this.sessionService.userInfo != null;
    }    
}
