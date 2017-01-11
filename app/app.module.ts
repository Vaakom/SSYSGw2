import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent}   from './app.component';

import {LoginFormComponent}   from './login/login-form.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, JsonpModule, NgbModule, NgbModule.forRoot()],
  declarations: [ AppComponent, LoginFormComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
