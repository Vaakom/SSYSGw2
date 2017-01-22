import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {LoginService} from "./login.service";
import {LoginData} from "./login.data";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {SessionService} from "../session.service";

@Component({
    selector: 'login-form',
    templateUrl: 'login-form.component.html'
})

export class LoginFormComponent implements OnInit{

    loginData: LoginData = new LoginData("version 2.0");

    errorMessage: string;

    form: FormGroup = new FormGroup({
        login: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    })

    constructor(private loginService: LoginService, private sessionService: SessionService) {
    }

    ngOnInit(): void {

    }

    isShowLogin() : boolean{
      return this.sessionService.userInfo == null;
    }

    onClickLogin(){
        var loginResults = this.loginService.doLogin(this.loginData);
        loginResults.subscribe( data => {this.processLoginResponse(data)}, data => this.processBadResponse(data));
    }

    onClickLogout(data){
        var logoutResults = this.loginService.doLogout();
        logoutResults.subscribe( data => this.processLogoutResponse(data), data => this.processBadResponse(data));
    }

    processLoginResponse(data){
        this.errorMessage = null;
        this.sessionService.setUserInfo(data);
    }

    processLogoutResponse(data){
        this.errorMessage = null;
        this.sessionService.setUserInfo(null);
    }

    processBadResponse(error: Error){
        this.errorMessage = error.message;
    }
}
