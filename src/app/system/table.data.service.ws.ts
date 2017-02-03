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

    private userInfo;

    constructor (private webSocketService: WebSocketService){
        this.webSocketService.isOpenedSubject.subscribe((isWebsockedOpen: boolean) => {         
            if(!isWebsockedOpen) {
                console.log("Reset tableSubscriptionMap because websocket closed");
                this.tableSubscriptionMap = {};
            }
        });
            
    }

    subscribeTable(tableCode: string): void {
        let operationCode = this.subscribe;

        if(this.isSubscriptionActive(tableCode))
            operationCode = this.modify;
        
        this.changeTableSubscription(tableCode, operationCode);
    }
    

    unsubscribeTable(tableCode: string): void {
        if(this.unsubscribe != this.tableSubscriptionMap[tableCode])
            this.changeTableSubscription(tableCode, this.unsubscribe);
    }

    private isSubscriptionActive(tableCode: string): boolean {
        return this.subscribe == this.tableSubscriptionMap[tableCode] || this.modify == this.tableSubscriptionMap[tableCode];
    }

    private createRequestString(tableCode: string, operationCode: string): string {
        return 'vc=tableCommand&action=NSubscribe&data={s:[{v:"' + tableCode + '",a:"' + operationCode + '"}]}&s:' + this.userInfo.s;
    }

    private changeTableSubscription(tableCode: string, operationCode: string){
        console.log('Change table subscrption: ' + tableCode + ' ' + operationCode);
        
        let messageStr = this.createRequestString(tableCode, operationCode);
        this.webSocketService.sendMessage(messageStr); 
        this.tableSubscriptionMap[tableCode] = operationCode;
        
        console.log(this.tableSubscriptionMap);
    }

     unsubscribeAllTables(): void{
         console.log('Unsubscribe All Tables');
         for(let tableCode in this.tableSubscriptionMap)
            this.unsubscribeTable(tableCode);
     }

     setUserInfo(userInfo: Object){
         this.userInfo = userInfo;
     }
}
