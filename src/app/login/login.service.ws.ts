import {Injectable} from "@angular/core";

import {WebSocketService} from "../system/websocket.servcie";
import {LoginData} from './login.data'

@Injectable()
export class LoginServiceWs {

    constructor (private webSocketService: WebSocketService) {
    }

    doLogin(loginData: LoginData): void {
        let loginStr = 'vc=login&appver=123&action=NLogon&data={t:' + new Date().getTime() + ',u:' + loginData.login + ',p:' + loginData.password + '}';
        this.webSocketService.sendMessage(loginStr);
    }
}
