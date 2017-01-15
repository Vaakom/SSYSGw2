import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {LoginService} from "./login.service";
import {LoginData} from "./login.data";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {SessionService} from "../session.service";

@Component({
    selector: 'login-form',
    templateUrl: 'app/login/login-form.component.html'
})

export class LoginFormComponent {

    //@Output() onSuccessLogin = new EventEmitter<Object>();

    loginData: LoginData = new LoginData("version 2.0");

    errorMessage: string;

    form: FormGroup = new FormGroup({
        login: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    })

    constructor(private loginService: LoginService, private sessionService: SessionService) {
    }

    onClick(){
        var loginResults = this.loginService.doLogin(this.loginData);
        loginResults.subscribe(data => {this.processLoginResponse(data)});
    }

    processLoginResponse(loginResponse){
        if(loginResponse.r == true) {
            this.errorMessage = null;
            this.sessionService.setUserInfo(loginResponse);
            //this.onSuccessLogin.emit(loginResponse);
        } else {
            this.errorMessage = loginResponse.d;
        }
    }
}
