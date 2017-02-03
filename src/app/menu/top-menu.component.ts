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
    private sessionOpenSubscription: Subscription;

    constructor(private tableDataService: TableDataServiceWs, private sessionService: SessionService, private webSocketService: WebSocketService){}

    tablesList: [Object];

    ngOnInit(): void {
        console.log('Table menu init');        
        
        this.tableSubscription = this.webSocketService.getMessageSubjectByName('table').subscribe(data => this.processTableResponse(data));
        this.sessionOpenSubscription = this.sessionService.sessionOpenSubject.subscribe((isSessionOpen: boolean) => {
            isSessionOpen ? this.subscribeForTableList() : this.cleanTableList();
        });
    }

    ngOnDestroy(): void {
        this.tableSubscription.unsubscribe();
        this.sessionOpenSubscription.unsubscribe();
        
        console.log('Table menu destroy');
    }


    processTableResponse(data): void {
        if(this.tableCode == data.data.params.type)
            if(data.data.rowSet.length > 0)
                this.tablesList = data.data.rowSet.slice(1);
    }

    subscribeForTableList(){
        this.tableDataService.subscribeTable(this.tableCode);
    }

    cleanTableList(){
//        this.tableDataService.setTableSubscription(this.tableCode, this.tableDataService.unsubscribe);
//        this.tablesList = null;
    }


}
