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

    loginData: LoginData = new LoginData("version 2.0");

    errorMessage: string;

    form: FormGroup = new FormGroup({
        login: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    })
    
    constructor(private loginService: LoginService, private sessionService: SessionService, private webSocketService: WebSocketService) {
    }

    ngOnInit(): void {
        console.log('Login component init');
        this.loginSubscription = this.webSocketService.getMessageSubjectByName('login').subscribe(data => {this.processLoginResponse(data)});
    }

    ngOnDestroy(): void {
        console.log('Login component destroy');
        this.loginSubscription.unsubscribe();
    }

    isSignedIn() : boolean{
      return this.sessionService.isSessionOpen();
    }

    onClickLogin(){
        if(!this.webSocketService.isOpened())
            this.webSocketService.reconnect();

        this.loginService.doLogin(this.loginData);
    }

    processLoginResponse(data){
        let json = data['data'];
        if(this.dataContainErrorMessage(json)){
            this.errorMessage = json['d'];
        } else {
            this.errorMessage = null;
            this.sessionService.openSession(json);
        }
    }

    dataContainErrorMessage(data): boolean {
        return data['r'] == false;
    }
    
}
