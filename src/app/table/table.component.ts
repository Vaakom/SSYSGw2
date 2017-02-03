import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {Subject, Observable, Subscription} from "rxjs/Rx";

import {SessionService} from "../system/session.service";
import {ActivatedRoute} from "@angular/router";
import {TableDataServiceWs} from "../system/table.data.service.ws";
import {WebSocketService} from "../system/websocket.servcie";

@Component({
  selector: 'db-table',
  templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit, OnDestroy{
  
  private tableSubscription: Subscription;

  tableCode: string;

  tableName: string;
  
  tableData: Object;

  constructor(private tableDataService: TableDataServiceWs, 
              private route: ActivatedRoute, 
              private sessionService: SessionService,
              private webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    console.log('TableComponent init');
    this.tableSubscription = this.webSocketService.getMessageSubjectByName('table').subscribe(data => this.processTableResponse(data));
    
    this.route.params.subscribe(params => {
      this.tableCode = params["code"];
      this.tableName = params["name"];
      this.tableData = null;
      this.tableDataService.subscribeTable(this.tableCode);
    });
  }


  ngOnDestroy(): void {
    console.log('TableComponent destroy');
    this.tableSubscription.unsubscribe();
  }

  private processTableResponse(data): void {
      if(this.tableCode == data.data.params.type)
        this.tableData = data;        
  }

}
