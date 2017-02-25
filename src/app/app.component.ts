import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs/Rx";

import {SessionService} from "./system/session.service";
import {WebSocketService} from "./system/websocket.servcie";

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit, OnDestroy{

    private websocketStateSubscription: Subscription;

    constructor(private sessionService: SessionService,
                private webSocketService: WebSocketService){
    }

    ngOnInit(): void {
      console.log(this.sessionService.getConfig());
        this.subscribeForWebsocketCrush();
        this.webSocketService.start(this.sessionService.getConfig()['gatewayUrl']);

        console.log('Application init');
    }

    ngOnDestroy(): void {
        this.webSocketService.close();
        this.websocketStateSubscription.unsubscribe();
        console.log('Application destroy');
    }

    private subscribeForWebsocketCrush(){
        this.websocketStateSubscription = this.webSocketService.isOpenedSubject.subscribe((websockedOpen: boolean) => {
            if(!websockedOpen && this.sessionService.isSessionOpen()) {
                console.log("Close session because websocket closed");
                this.sessionService.closeSession();
            }
        });
    }


}
