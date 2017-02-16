import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent}   from './app.component';
import {routing} from "./app.routing";
import {SessionService} from "./system/session.service";
import {HeartbitService} from "./system/heartbit.service";
import {WebSocketService} from "./system/websocket.servcie";

import {LoginFormComponent}   from './login/login-form.component';
import {LoginService} from "./login/login.service";
import {LoginServiceHttp} from "./login/login.service.http";
import {LoginServiceWs} from "./login/login.service.ws";
import {LoginServiceMock} from "./login/login.service.mock";

import {LogoutComponent}   from "./logout/logout.component";
import {LogoutServiceWs} from "./logout/logout.service";

import {TopMenuComponent} from "./menu/top-menu.component";
import {TopMenuService} from "./menu/top-menu.service";
import {TopMenuServiceHttp} from "./menu/top-menu.service.http";
import {TopMenuServiceMock} from "./menu/top-menu.service.mock";
import {TableComponent} from "./table/table.component";
import {PaginatorComponent} from "./table/paginator.component";

import {TableDataServiceWs} from "./system/table.data.service.ws";

import {SessionGuard} from "./system/session.guard";
import {SplitPipe} from "./system/split.pipe";

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, JsonpModule, routing, NgbModule, NgbModule.forRoot()],
    declarations: [AppComponent, TopMenuComponent, LoginFormComponent, LogoutComponent, TableComponent, PaginatorComponent, SplitPipe],
    providers: [
        LoginServiceWs,
        LogoutServiceWs,
        SessionGuard,
        TableDataServiceWs,
        SessionService,
        HeartbitService,
        WebSocketService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
