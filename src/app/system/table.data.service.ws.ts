import {Injectable} from "@angular/core";
import {Subject, Observable, Subscription} from "rxjs/Rx";
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
import {WebSocketService} from "../system/websocket.servcie";

@Injectable()
export class TableDataServiceWs {

    subscribe = 'S';
    unsubscribe = 'U';
    modify = 'M';

    private tableSubscriptionMap = {}

    constructor (private webSocketService: WebSocketService){
        this.webSocketService.isOpenedSubject.subscribe((isWebsockedOpen: boolean) => {         
            if(!isWebsockedOpen) {
                console.log("Reset tableSubscriptionMap because websocket closed");
                this.tableSubscriptionMap = {};
            }
        });
            
    }

    setTableSubscription(tableCode: string, operationCode: string): void{
        let operation = operationCode;
        if(this.tableAlreadySubscribedForOperation(tableCode, operationCode)) {
            if(this.unsubscribe == operationCode)
                return;
            
            operation = this.modify;
        }
        
        this.tableSubscriptionMap[tableCode] = operationCode;
        console.log('Set table subscription: ' + tableCode + ' ' + operationCode);

        let messageStr = this.createRequestString(tableCode, operationCode);
        this.webSocketService.sendMessage(messageStr);
        return null;        
    }

    private tableAlreadySubscribedForOperation(tableCode: string, operationCode: string): boolean{
        return this.tableSubscriptionMap[tableCode] == operationCode;
    }

    private createRequestString(tableCode: string, operationCode: string): string {
        return 'vc=tableCommand&action=NSubscribe&data={s:[{v:"' + tableCode + '",a:"' + operationCode + '"}]}'
    }

     unsubscribeAllTables(): void{
         console.log('Unsubscribe All Tables');
         for(let tableCode in this.tableSubscriptionMap)
            this.setTableSubscription(tableCode, this.unsubscribe);
     }

}
