import {Http, URLSearchParams, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

import {LoginData} from './login.data'

@Injectable()
export class LoginService{
    private url = '/proxy/SSYSGw/gw';

    constructor (private http: Http){}
    
    doLogin(loginData: LoginData){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let reqParamsStr = 'appver=123&action=NLogon&data={t:1484145452170,u:"DepoMonitor1",p:"2"}';
        
        return this.http.post(this.url, reqParamsStr, {headers: headers}).map(res => res.json());
    }

    doLogout(){
        return Observable.from(this.getMockLogoutResponse()).map(res => JSON.parse(res));
    }

    getMockLogoutResponse(){
        return ['{"success": "true"}'];
    }
}

