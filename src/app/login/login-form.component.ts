import {Component, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Subject, Observable, Subscription} from "rxjs/Rx";

import {LoginService} from "./login.service";
import {LoginData} from "./login.data";
import {SessionService} from "../system/session.service";
import {WebSocketService} from "../system/websocket.servcie";

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
        this.loginSubscription = this.webSocketService.getMessageForSubscription('login').subscribe(data => {this.processLoginResponse(data)});        
        this.logoutSubscriptioon = this.webSocketService.getMessageForSubscription('logout').subscribe(data => {this.processLogoutResponse(data)});        
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
        let json = data['data'];
        if(this.dataContainErrorMessage(json)){
            this.errorMessage = json['d'];
        } else {
            this.errorMessage = null;
            this.sessionService.setUserInfo(json);
        }
    }

    processLogoutResponse(data){
        let json = data['data'];
        if(this.dataContainErrorMessage(json)){
            this.errorMessage = json;
        } else {
            this.errorMessage = null;
            this.sessionService.setUserInfo(null);
        }   
    }

    dataContainErrorMessage(data): boolean {
        return data['r'] == false;
    }
    
}
