import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {LoginData} from "./login.data";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'login-form',
    templateUrl: 'app/login/login-form.component.html'
})

export class LoginFormComponent implements OnInit {

    loginData: LoginData = new LoginData("version 2.0");

    errorMessage: string;

    form: FormGroup = new FormGroup({
        login: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    })

    constructor(private loginService: LoginService) {
    }

    ngOnInit(): void {
        this.loginData.login = "1"
        this.loginData.password = "2";
    }

    onClick(){
        var loginResults = this.loginService.doLogin(this.loginData);
        loginResults.subscribe(data => {this.processLoginResponse(data)});

    }

    processLoginResponse(loginResponse){
        if(loginResponse.r == true) {
            this.errorMessage = null;
        } else {
            this.errorMessage = loginResponse.d;
        }
    }
}
