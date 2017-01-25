import {Component, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Subject, Observable, Subscription} from "rxjs/Rx";

import {LoginService} from "./login.service";
import {LoginData} from "./login.data";
import {SessionService} from "../session.service";
import {WebSocketService} from "../websocket.servcie";

@Component({
    selector: 'login-form',
    templateUrl: 'login-form.component.html'
})

export class LoginFormComponent implements OnInit, OnDestroy{

    private loginSubscription: Subscription;
    private logoutSubscriptioon: Subscription;

    loginData: LoginData = new LoginData("version 2.0");

    errorMessage: string;

    form: FormGroup = new FormGroup({
        login: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    })
    
    constructor(private loginService: LoginService, private sessionService: SessionService, private webSocketService: WebSocketService) {
    }

    ngOnInit(): void {
        this.loginSubscription = this.webSocketService.getMessageForSubscription('login').subscribe(
            data => {console.log(data); this.processLoginResponse(data)}, 
            error => {console.log("process login error...");this.processBadResponse(error)}
        );

        this.logoutSubscriptioon = this.webSocketService.getMessageForSubscription('logout').subscribe(
            data => {this.processLogoutResponse(data)}, 
            error => {this.processBadResponse(error)}
        );
        
    }

    ngOnDestroy(): void {
        this.loginSubscription.unsubscribe();
        this.logoutSubscriptioon.unsubscribe(); 
    }

    isSignedIn() : boolean{
      return this.sessionService.userInfo != null;
    }

    onClickLogin(){        
        this.loginService.doLogin(this.loginData);
    }

    onClickLogout(data){
        this.loginService.doLogout();
    }

    processLoginResponse(data){
        this.errorMessage = null;
        this.sessionService.setUserInfo(data);
    }

    processLogoutResponse(data){
        this.errorMessage = null;
        this.sessionService.setUserInfo(null);
    }

    processBadResponse(error){
        this.errorMessage = error;        
    }
}
