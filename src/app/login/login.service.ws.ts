import {Injectable} from "@angular/core";
import {Subject, Observable, Subscription} from "rxjs/Rx";
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
import 'rxjs/add/operator/map';

import {LoginService} from './login.service'
import {WebSocketService} from "../system/websocket.servcie";
import {LoginData} from './login.data'

@Injectable()
export class LoginServiceWs extends LoginService {

    constructor (private webSocketService: WebSocketService){
        super();        
    }

    doLogin(loginData: LoginData){
        let loginStr = 'vc=login&appver=123&action=NLogon&data={t:' + new Date().getTime() + ',u:' + loginData.login + ',p:' + loginData.password + '}';
        this.webSocketService.sendMessage(loginStr);
        return null;
    }

    doLogout(){
        let logoutStr = 'vc=logout&action=NLogoff&data={u:""}';
        this.webSocketService.sendMessage(logoutStr);
        return null;
    }
}
