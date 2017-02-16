import {Injectable} from "@angular/core";

import {WebSocketService} from "../system/websocket.servcie";

@Injectable()
export class LogoutServiceWs {

    constructor (private webSocketService: WebSocketService){
    }

    doLogout(): void{
        let logoutStr = 'vc=logout&action=NLogoff&data={u:""}';
        this.webSocketService.sendMessage(logoutStr);
        return null;
    }
}
