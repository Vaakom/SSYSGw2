import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {Subject, Observable, Subscription} from "rxjs/Rx";

import {SessionService} from "../system/session.service";
import {ActivatedRoute} from "@angular/router";
import {TopMenuService} from "../menu/top-menu.service";
import {WebSocketService} from "../system/websocket.servcie";

@Component({
  selector: 'table',
  templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit, OnDestroy , OnChanges{
  
  private tableSubscription: Subscription;

  tableCode: string;
  tableMeta;
  tableData;

  constructor(private tableDataService: TopMenuService, 
              private route: ActivatedRoute, 
              private sessionService: SessionService,
              private webSocketService: WebSocketService) {
  }

  ngOnChanges(){
    console.log('ngOnChanges');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tableCode = params["code"];
    });

    this.tableSubscription = this.webSocketService.getMessageForSubscription('table').subscribe(data => this.processTableResponse(data));
    this.tableDataService.startGettingTableData(this.tableCode);//TODO process bad response    
    this.getTableInfoByCode();
  }


  ngOnDestroy(): void {
    this.tableDataService.stopGettingTableData(this.tableCode);
    this.tableSubscription.unsubscribe();
  }

  processTableResponse(data): void {
    console.log("Table Response!");  
      // console.log("Table Response!");  
      // if(this.tableCode == data.data.params.type) {
      //   console.log('Table data!!!');
      //   console.log(data);
      //   this.tableData = data;
      // }
  }

  getTableInfoByCode(){
    for(let table of this.sessionService.tablesList)
      if(this.tableCode == table[2])
        this.tableMeta = table;
  }
}
