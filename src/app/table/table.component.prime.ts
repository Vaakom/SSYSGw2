import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup, FormControl} from '@angular/forms';
import {Subject, Observable, Subscription} from "rxjs/Rx";

import {SessionService} from "../system/session.service";
import {TableDataServiceWs} from "../system/table.data.service.ws";
import {WebSocketService} from "../system/websocket.servcie";

import {SocketData} from "../system/socket.data";
import {TableConfig} from "./table.config";
import {TableMeta} from "./table.meta";

@Component({
  selector: 'db-table',
  templateUrl: 'table.component.prime.html'
})

export class TableComponentPrime implements OnInit, OnDestroy{
  private tableSubscription: Subscription;

  private rowsOnPage = 40;
  private showPages = 10;
  
  tableCode: string;

  tableMeta: TableMeta;
  
  tableRows: Array<Object> = [];

  rowSet;//

  tableConfig: TableConfig;

  showLoadIcon: boolean = true;

  filterForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tableDataService: TableDataServiceWs,                
              private sessionService: SessionService,
              private webSocketService: WebSocketService) {
  }

  ngOnInit(): void {      
    console.log('TableComponent init');
    this.tableSubscription = this.webSocketService.getMessageSubjectByName('table')
      .filter((data: SocketData) => this.tableCode == data.data.params.type)
      .subscribe((data: SocketData) => this.processTableResponse(data));
    
    this.route.params.subscribe(params => {
      if(!params["code"])      
        this.router.navigate(['LoginFormComponent'])
      else
        this.initNewTable(params["code"]);
    });
  
  }

  ngOnDestroy(): void {
    console.log('TableComponent destroy');
    this.tableSubscription.unsubscribe();
  }

  
  setSortColumn(column: string){
    let sortASC = column == this.tableConfig.getOrderBy() ? !this.tableConfig.isSortASC() : true;

    this.tableConfig.setSortASC(sortASC);
    this.tableConfig.setOrderBy(column);
    this.tableDataService.subscribeTable(this.tableCode, this.tableConfig);
  }

  getSortIcon(i){
    if(this.tableMeta.legend.t[i] == "STRING")
      return this.tableConfig.isSortASC() ? "fa-sort-alpha-asc" : "fa-sort-alpha-desc";

    return this.tableConfig.isSortASC() ? "fa-sort-numeric-asc" : "fa-sort-numeric-desc";
  }

  

  private selectNewPage(pageNum: number){
    this.tableConfig.setCurrentPage(pageNum);
    this.tableDataService.subscribeTable(this.tableCode, this.tableConfig);
  }

  private processTableResponse(data: SocketData): void {
      this.showLoadIcon = false;
      this.tableConfig.setTotalRows(data.data.params.nm);
      this.tableRows = this.createTableRows(data.data.rowSet);

      this.rowSet = data.data.rowSet;
  }

  private initNewTable(tableCode: string): void {
      this.tableCode = tableCode;
      this.resetCurrentTableProperties();
      this.setNewTableMeta();
      this.setNewTableConfig();      
      this.setNewTableFilters();

      this.tableDataService.subscribeTable(this.tableCode, this.tableConfig);
  }

  private resetCurrentTableProperties(): void {
      this.tableMeta = null;
      this.rowSet = null;
      this.tableRows = null;
      this.tableConfig = null;
      this.showLoadIcon = true;
  }

  private setNewTableMeta(): void  {
      for(let tableMeta of this.sessionService.getTableList())
        if(tableMeta.code == this.tableCode)
          this.tableMeta = tableMeta;
  }

  private setNewTableConfig(): void {
    this.tableConfig = new TableConfig(1, this.rowsOnPage, this.tableMeta.legend.i[0], true, 0);
  }

  private setNewTableFilters(): void {
    this.filterForm = this.createTableFiltersForm();

    this.filterForm.valueChanges.debounceTime(1000).subscribe(filters => { 
      this.tableConfig.setFilter(this.createFilterString(filters));      
      this.tableDataService.subscribeTable(this.tableCode, this.tableConfig);
    });
  }

  private createTableFiltersForm(): FormGroup {
    let columnFilters = {};
    for(let columnName of this.tableMeta.legend.i)
      columnFilters[columnName] = new FormControl();
    
    return new FormGroup(columnFilters)
  }

  createFilterString(filters: Object): string {
    let filterStr = '';
    for(let filter in filters)
      if(filters[filter]){
        if(filterStr.length > 0)
          filterStr = filterStr + ' AND ';
        filterStr = filterStr + filter + ' LIKE ' + '\'' + filters[filter] +'*\'';
      }
    
      
    return filterStr.length > 0 ? filterStr : null;
  }  

  private createTableRows(rowSet: Array<Object>): Array<Object> {
    let tableRows = new Array<Object>();    
    for(let row of rowSet)
        tableRows.push(this.createTableRowObject(row));
    
    return tableRows;
  }

  private createTableRowObject(row): Object {
    let tableRow = {};
    for(let i = 0; i < this.tableMeta.legend.i.length; i++){
        let name = this.tableMeta.legend.i[i];
        let value = row[i];
        tableRow[name] = value;
    }      
    
    return tableRow;
  }


}