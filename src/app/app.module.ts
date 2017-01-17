import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent}   from './app.component';

import {LoginFormComponent}   from './login/login-form.component';
import {LoginService} from "./login/login.service";
import {LoginServiceMock} from "./login/login.service.mock";
import {TopMenuComponent} from "./menu/top-menu.component";

import {routing} from "./app.routing";
import {SessionService} from "./session.service";
import {TopMenuService} from "./menu/top-menu.service";

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, JsonpModule, routing, NgbModule, NgbModule.forRoot()],
    declarations: [AppComponent, TopMenuComponent, LoginFormComponent],
    providers: [{provide: LoginService, useClass: LoginService}, SessionService, TopMenuService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
