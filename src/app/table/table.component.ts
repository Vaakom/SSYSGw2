import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {Subject, Observable, Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";

import {SessionService} from "../system/session.service";
import {TableDataServiceWs} from "../system/table.data.service.ws";
import {WebSocketService} from "../system/websocket.servcie";

import {SocketData} from "../system/socket.data";
import {TableConfig} from "./table.config";
import {TableMeta} from "./table.meta";

@Component({
  selector: 'db-table',
  templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit, OnDestroy{
  private tableSubscription: Subscription;

  private rowsOnPage = 10;
  
  tableCode: string;

  tableMeta: TableMeta;
  
  rowSet: [string];

  tableConfig: TableConfig;

  showLoadIcon: boolean = true;

  constructor(private route: ActivatedRoute,
              private tableDataService: TableDataServiceWs,                
              private sessionService: SessionService,
              private webSocketService: WebSocketService,
              ) {
  }

  ngOnInit(): void {
    console.log('TableComponent init');
    this.tableSubscription = this.webSocketService.getMessageSubjectByName('table')
      .filter((data: SocketData) => this.tableCode == data.data.params.type)
      .subscribe((data: SocketData) => this.processTableResponse(data));
    
    this.route.params.subscribe(params => {      
      this.initNewTable(params["code"]);
    });
  }


  ngOnDestroy(): void {
    console.log('TableComponent destroy');
    this.tableSubscription.unsubscribe();
  }

  private processTableResponse(data: SocketData): void {
      this.showLoadIcon = false;
      this.rowSet = data.data.rowSet;
  }

  private initNewTable(tableCode: string): void {
      this.tableCode = tableCode;
      this.resetCurrentTableProperties();
      this.setNewTableMeta();
      this.setNewTableConfig();

      this.tableDataService.subscribeTable(this.tableCode, this.tableConfig);
  }

  private resetCurrentTableProperties(): void {
      this.tableMeta = null;
      this.rowSet = null;
      this.tableConfig = null;
      this.showLoadIcon = true;
  }

  private setNewTableMeta(): void  {
      for(let tableMeta of this.sessionService.getTableList())
        if(tableMeta.code == this.tableCode)
          this.tableMeta = tableMeta;
  }

  private setNewTableConfig(): void {
    this.tableConfig = new TableConfig(1, this.rowsOnPage, this.tableMeta.legend.i[0]);
  }

  //TODO сделать общее обновление tableConfig через ractive с проверкой повторов и задержкой.
  setSortColumn(column: string){
    this.tableConfig.setOrderBy(column);
    this.tableDataService.subscribeTable(this.tableCode, this.tableConfig);
  }
}
