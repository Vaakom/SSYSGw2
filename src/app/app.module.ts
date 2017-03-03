import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {MenuModule, MenuItem} from 'primeng/primeng'
import {DataTableModule, SharedModule, PaginatorModule} from 'primeng/primeng'
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent}   from './app.component';
import {routing} from "./app.routing";
import {SessionService} from "./system/session.service";
import {HeartbitService} from "./system/heartbit.service";
import {WebSocketService} from "./system/websocket.servcie";

import {LoginFormComponent}   from './login/login-form.component';
import {LoginServiceWs} from "./login/login.service.ws";

import {LogoutComponent}   from "./logout/logout.component";
import {LogoutServiceWs} from "./logout/logout.service";

import {TopMenuComponent} from "./menu/top-menu.component";
import {TopMenuComponentPrime} from "./menu/top-menu.component.prime";
import {TableComponent} from "./table/table.component";
import {TableComponentPrime} from "./table/table.component.prime";
import {PaginatorComponent} from "./table/paginator.component";

import {TableDataServiceWs} from "./system/table.data.service.ws";

import {ConfigGuard} from "./system/config.guard";
import {SessionGuard} from "./system/session.guard";
import {SplitPipe} from "./system/split.pipe";


@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, JsonpModule, routing, DataTableModule, SharedModule, MenuModule, PaginatorModule],
  declarations: [AppComponent, TopMenuComponent, TopMenuComponentPrime, LoginFormComponent, LogoutComponent, TableComponent, TableComponentPrime, PaginatorComponent, SplitPipe],
  providers: [
    LoginServiceWs,
    LogoutServiceWs,
    SessionGuard,
    ConfigGuard,
    TableDataServiceWs,
    SessionService,
    HeartbitService,
    WebSocketService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
