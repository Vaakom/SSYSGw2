import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject, Observable, Subscription} from "rxjs/Rx";
import {SessionService} from "../system/session.service";
import {TopMenuService} from "./top-menu.service";
import {WebSocketService} from "../system/websocket.servcie";

@Component({
    selector: 'top-menu',
    templateUrl: 'top-menu.component.html'
})

export class TopMenuComponent implements OnInit, OnDestroy{

    private tableSubscription: Subscription;

    constructor(private topMenuService: TopMenuService, private sessionService: SessionService, private webSocketService: WebSocketService){}

    tablesList: [Object];

    ngOnInit(): void {
        this.sessionService.userInfoSubject.subscribe(userInfo => this.setupMenu());
        this.tableSubscription = this.webSocketService.getMessageForSubscription('table').subscribe(data => this.processTableResponse(data));
    }

    ngOnDestroy(): void {
        this.tableSubscription.unsubscribe();
    }


    processTableResponse(data): void {
        if('FV_SYSTEM' == data.data.params.type) {
            this.tablesList = data.data.rowSet;
            this.sessionService.setTablesList(data.data.rowSet);
        }
    }

    setupMenu(){
        if(this.isMenuAvailible()){
            this.topMenuService.startGettingTableData('FV_SYSTEM');
        } else {
            this.topMenuService.stopGettingTableData('FV_SYSTEM');
            this.tablesList = null;
        }
    }

    isMenuAvailible(): boolean {
        return this.sessionService.userInfo != null;
    }

    isSignedIn() : boolean{
      return this.sessionService.userInfo != null;
    }    

}
