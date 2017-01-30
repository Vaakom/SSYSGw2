import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {Subject, Observable, Subscription} from "rxjs/Rx";

import {SessionService} from "../system/session.service";
import {ActivatedRoute} from "@angular/router";
import {TopMenuService} from "../menu/top-menu.service";
import {WebSocketService} from "../system/websocket.servcie";

@Component({
  selector: 'db-table',
  templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit, OnDestroy{
  
  private tableSubscription: Subscription;

  tableCode: string;
  
  tableData: Object;

  constructor(private tableDataService: TopMenuService, 
              private route: ActivatedRoute, 
              private sessionService: SessionService,
              private webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {      
      this.unsubscribe();
      this.tableCode = params["code"];
      this.subscribe();
    });
  }


  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private processTableResponse(data): void {
      if(this.tableCode == data.data.params.type) {        
        console.log('We got some data for ' + data.data.params.type);
        console.log(data);
        this.tableData = data;
      }
  }

  private subscribe(){
      console.log("SUBSCRIBE: " + this.tableCode);
      this.tableDataService.startGettingTableData(this.tableCode);
      this.tableSubscription = this.webSocketService.getMessageForSubscription('table').subscribe(data => this.processTableResponse(data));    
  }

  private unsubscribe(){
    if(this.tableSubscription){
      console.log("UNSUBSCRIBE: " + this.tableCode);
      this.tableSubscription.unsubscribe();
      this.tableDataService.stopGettingTableData(this.tableCode);    
      this.tableCode = null;
      this.tableData = null;
    }  
  }
}
