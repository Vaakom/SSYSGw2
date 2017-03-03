import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject, Observable, Subscription} from "rxjs/Rx";
import {FormGroup, FormControl} from '@angular/forms';
import {MenuItem} from 'primeng/primeng';
import {SessionService} from "../system/session.service";
import {TableDataServiceWs} from "../system/table.data.service.ws";
import {WebSocketService} from "../system/websocket.servcie";

import {SocketData} from "../system/socket.data";
import {TableMeta} from "../table/table.meta";
import {TableLegend} from "../table/table.legend";

@Component({
    selector: 'top-menu-prime',
    templateUrl: 'top-menu.component.prime.html'
})

export class TopMenuComponentPrime implements OnInit, OnDestroy {

    private tableCode = 'FV_SYSTEM';

    private tableSubscription: Subscription;
    private sessionOpenSubscription: Subscription;

    constructor(private tableDataService: TableDataServiceWs, private sessionService: SessionService, private webSocketService: WebSocketService){}

    tableList: [TableMeta];

    menuItems: [MenuItem];

    showLoadIcon: boolean = true;

    menuFilterControl = new FormControl();

    ngOnInit(): void {

        this.menuItems = [
                {label: 'Table Name', icon: 'fa-table'},{label: 'Table Name', icon: 'fa-table'},{label: 'Table Name', icon: 'fa-table'},{label: 'Table Name', icon: 'fa-table'},{label: 'Table Name', icon: 'fa-table'},
                {label: 'Table Name', icon: 'fa-table'},{label: 'Table Name', icon: 'fa-table'},{label: 'Table Name', icon: 'fa-table'},{label: 'Table Name', icon: 'fa-table'},{label: 'Table Name', icon: 'fa-table'}
            ];
        
        console.log('Table menu init');

        this.tableSubscription = this.webSocketService.getMessageSubjectByName('table')
            .filter((data: SocketData) => this.tableCode == data.data.params.type)
            .map((data: SocketData) => this.createTableList(data.data.rowSet))
            .subscribe((data: [TableMeta]) => {this.processTableResponse(data)});


        this.sessionOpenSubscription = this.sessionService.getSessionOpenSubject().subscribe((isSessionOpen: boolean) => {
            isSessionOpen ? this.subscribeForTableList() : this.cleanTableList();
        });

        this.initMenuFilter();
    }

    ngOnDestroy(): void {
        this.tableSubscription.unsubscribe();
        this.sessionOpenSubscription.unsubscribe();

        console.log('Table menu destroy');
    }

    private createTableList(rowSet: [[string]]): Array<TableMeta> {
        let tableMetaList: Array<TableMeta> = [];
        for(let row of rowSet){
            let tableMeta = this.createTableMeta(row);
            if(tableMeta.code != 'FV_SYSTEM')
                tableMetaList.push(tableMeta);
        }
        return tableMetaList;
    }

    private createTableMeta(row: [string]): TableMeta {
        let tableMeta = new TableMeta();

        tableMeta.id = +row[0];
        tableMeta.name = row[1];
        tableMeta.code = row[2];
        tableMeta.mode = row[3];
        tableMeta.date = row[4];
        tableMeta.isArchSupport = row[6];
        tableMeta.changeId = +row[7];

        let legend = Object.assign(new TableLegend(), JSON.parse(row[5]));
        tableMeta.legend = legend;

        return tableMeta;
    }

    private processTableResponse(data: [TableMeta]): void {
            this.tableList = data;
            this.sessionService.setTableList(this.tableList);
            this.showLoadIcon = false;
    }

    private subscribeForTableList(): void {
        this.tableDataService.subscribeTable(this.tableCode);
    }

    private cleanTableList(): void {
        this.tableList = null;
    }

    private initMenuFilter(){
        let menuFilterControlSubscription = this.menuFilterControl.valueChanges.debounceTime(100).map(str => str ? str.toLowerCase() : str);

        menuFilterControlSubscription.subscribe(tableName => this.filterMenuByTableName(tableName));
    }

    private filterMenuByTableName(tableName: string){
        for(let tMeta of this.tableList) {
            if(tableName)
                tMeta.isVisible = tMeta.name.toLowerCase().indexOf(tableName) == 0;
            else
                tMeta.isVisible = true;
        }
    }

}