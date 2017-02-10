import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs/Rx";

import {SessionService} from "./system/session.service";
import {WebSocketService} from "./system/websocket.servcie";
import {TableDataServiceWs} from "./system/table.data.service.ws";

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit, OnDestroy{
    
    private websocketStateSubscription: Subscription;

    constructor(private sessionService: SessionService, 
                private webSocketService: WebSocketService,
                private tableDataService: TableDataServiceWs){
    }

    ngOnInit(): void {
        this.subscribeForWebsocketCrush();
        this.webSocketService.start("ws://ft-depo:8088/SSYSGw/ws");
        
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
