import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject, Observable, Subscription} from "rxjs/Rx";
import {SessionService} from "../system/session.service";
import {TableDataServiceWs} from "../system/table.data.service.ws";
import {WebSocketService} from "../system/websocket.servcie";

@Component({
    selector: 'top-menu',
    templateUrl: 'top-menu.component.html'
})

export class TopMenuComponent implements OnInit, OnDestroy{

    private tableCode = 'FV_SYSTEM';

    private tableSubscription: Subscription;

    constructor(private tableDataService: TableDataServiceWs, private sessionService: SessionService, private webSocketService: WebSocketService){}

    tablesList: [Object];

    ngOnInit(): void {
        console.log('Table menu init');        
        this.sessionService.sessionOpenSubject.subscribe((isSessionOpen: boolean) => this.setupMenu(isSessionOpen));
        this.tableSubscription = this.webSocketService.getMessageSubjectByName('table').subscribe(data => this.processTableResponse(data));
    }

    ngOnDestroy(): void {
        this.tableSubscription.unsubscribe();
        console.log('Table menu destroy');
    }


    processTableResponse(data): void {
        if(this.tableCode == data.data.params.type)
            this.tablesList = data.data.rowSet;
    }

    setupMenu(isSessionOpen: boolean){
        if(this.sessionService.isSessionOpen())
            this.tableDataService.setTableSubscription(this.tableCode, this.tableDataService.subscribe);
        else    
            this.tablesList = null;
    }



}
