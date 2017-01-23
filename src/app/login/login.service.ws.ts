import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {Subject, Observable, Subscription} from "rxjs/Rx";
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
import 'rxjs/add/operator/map';

import {LoginService} from './login.service'
import {WebSocketService} from "../websocket.servcie";
import {LoginData} from './login.data'

@Injectable()
export class LoginServiceWs extends LoginService {

    constructor (private webSocketService: WebSocketService){
        super();        
    }

    doLogin(loginData: LoginData){
        //return this.http.post(this.url, reqParamsStr, {withCredentials: true, headers: this.headers}).map(res => this.parseResponse(res));
        return null;
    }

    doLogout(){
        //return this.http.post(this.url, reqParamsStr, {withCredentials: true, headers: this.headers}).map(res => this.parseResponse(res));
        return null;
    }

    parseResponse(res){
            let json = res.json();
            if(json.r == false)
                throw new Error(json.d ? json.d : 'Something wrong, we are sorry');
            return json;        
    }
}
