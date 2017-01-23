import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

import {LoginService} from './login.service'
import {LoginData} from './login.data'

@Injectable()
export class LoginServiceHttp extends LoginService{
    private url = '/proxy/SSYSGw/gw';
    private headers = new Headers();

    constructor (private http: Http){
        super();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    
    doLogin(loginData: LoginData){
        let options = new RequestOptions({withCredentials: true, headers: this.headers});

        let reqParamsStr = 'appver=123&action=NLogon&data={t:' + new Date().getTime() + ',u:' + loginData.login + ',p:' + loginData.password + '}';
        return this.http.post(this.url, reqParamsStr, {withCredentials: true, headers: this.headers}).map(res => this.parseResponse(res));
    }

    doLogout(){
        let options = new RequestOptions({withCredentials: true, headers: this.headers});
        let reqParamsStr = 'action=NLogoff&data={u:""}';
        return this.http.post(this.url, reqParamsStr, {withCredentials: true, headers: this.headers}).map(res => this.parseResponse(res));
    }

    parseResponse(res){
            let json = res.json();
            if(json.r == false)
                throw new Error(json.d ? json.d : 'Something wrong, we are sorry');
            return json;        
    }

}