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
    private userInfoSubscription: Subscription;

    constructor(private sessionService: SessionService, 
                private webSocketService: WebSocketService,
                private tableDataService: TableDataServiceWs){
    }

    ngOnInit(): void {
        console.log('Application init');
        this.subscribeForWebsocketCrush();
        this.subscribeForUserInfoChanging();

        this.webSocketService.start("ws://ft-depo:8088/SSYSGw/ws");
    }

    ngOnDestroy(): void {        
        this.webSocketService.close();
        this.websocketStateSubscription.unsubscribe();
        this.userInfoSubscription.unsubscribe();
        console.log('Application destroy');
    }

    subscribeForWebsocketCrush(){
        this.websocketStateSubscription = this.webSocketService.isOpenedSubject.subscribe((websockedOpen: boolean) => { 
            if(!websockedOpen && this.sessionService.isSessionOpen()) {
                console.log("Close session because websocket closed");
                this.sessionService.closeSession(); 
            }
        });
    }

    subscribeForUserInfoChanging(){
        this.sessionService.userInfoSubject.subscribe(userInfo => this.tableDataService.setUserInfo(userInfo));
    }
}
