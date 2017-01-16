import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {LoginService} from "./login.service";
import {LoginData} from "./login.data";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {SessionService} from "../session.service";
import {userInfo} from "os";

@Component({
    selector: 'login-form',
    templateUrl: 'login-form.component.html'
})

export class LoginFormComponent implements OnInit{

    showLoginForm: boolean = true;

    loginData: LoginData = new LoginData("version 2.0");

    errorMessage: string;

    form: FormGroup = new FormGroup({
        login: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    })

    constructor(private loginService: LoginService, private sessionService: SessionService) {
    }

    ngOnInit(): void {
        this.sessionService.userInfoSubject.subscribe(userInfo => {this.showLoginForm = userInfo == null});
    }

    onClickLogin(){
        var loginResults = this.loginService.doLogin(this.loginData);
        loginResults.subscribe(data => this.processLoginResponse(data));
    }

    onClickLogout(){
        var logoutResults = this.loginService.doLogout();
        logoutResults.subscribe(data => this.processLogoutResponse(data));
    }

    processLoginResponse(response){
        if(response.r == true) {
            this.errorMessage = null;
            this.sessionService.setUserInfo(response);
        } else {
            this.errorMessage = response.d;
        }
    }

    processLogoutResponse(response){
        this.sessionService.setUserInfo(null);
    }
}
