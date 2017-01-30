import {Injectable} from "@angular/core";
import {Subject, Observable, Subscription} from "rxjs/Rx";
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
import {TopMenuService} from '../menu/top-menu.service'
import {WebSocketService} from "../system/websocket.servcie";

@Injectable()
export class TableDataServiceWs extends TopMenuService{

    constructor (private webSocketService: WebSocketService){
        super();
    }

    startGettingTableData(tableCode: string){
        let reqParamsStr = 'vc=tableSign&action=NSubscribe&data={s:[{v:"' + tableCode + '",a:"S"}]}';
        this.webSocketService.sendMessage(reqParamsStr);
        return null;
    }

    stopGettingTableData(tableCode: string){
        let reqParamsStr = 'vc=tableUnsign&action=NSubscribe&data={s:[{v:"' + tableCode + '",a:"U"}]}';
        this.webSocketService.sendMessage(reqParamsStr);
        return null;
    }
}
