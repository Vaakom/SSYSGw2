import { Injectable } from "@angular/core";
import { Subject, Observable, Subscription } from "rxjs/Rx";
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
import { WebSocketService } from "../system/websocket.servcie";
import { SessionService } from "../system/session.service";

import { TableConfig } from "../table/table.config";

export class SubscriptionOptions {
    static subscribe = 'S';
    static unsubscribe = 'U';
    static modify = 'M';
}

@Injectable()
export class TableDataServiceWs {

    private tableSubscriptionMap = {}

    private sessionId;

    constructor(private webSocketService: WebSocketService, private sessionService: SessionService) {                
        this.subscribeForSessionIdChanging();
        this.subscribeForWebSocketClosing();
    }

    subscribeTable(tableCode: string, tableConfig?: TableConfig): void {
        let operationCode = SubscriptionOptions.subscribe;

        if (this.isAlreadySubscribed(tableCode))
            operationCode = SubscriptionOptions.modify;
        
        let params = {
            v: tableCode,
            a: operationCode            
        }

        if(tableConfig){
            let sortDirection = tableConfig.isSortASC() ? 'A' : 'D';
            params['o'] = tableConfig.getOrderBy() + ' ' + sortDirection;
            params['s'] = tableConfig.getFirstRow();
            params['e'] = tableConfig.getLastRow();
            
            if(tableConfig.getFilter())
                params['f'] = tableConfig.getFilter();
        }        
        
        let message = this.createMessageString(params);
        console.log(message);
        this.webSocketService.sendMessage(message);
        this.tableSubscriptionMap[tableCode] = operationCode;

        console.log('Subscribe table ' + tableCode + '  ' + operationCode + '  ' + message);
    }

    unsubscribeTable(tableCode: string): void {
        let params = {
            v: tableCode,
            a: SubscriptionOptions.unsubscribe
        };

        let message = this.createMessageString(params);
        this.webSocketService.sendMessage(message);
        delete this.tableSubscriptionMap[tableCode];
        
        console.log('Unsubscribe table ' + tableCode);
    }

    unsubscribeAllTables(): void {
        console.log('Unsubscribe All Tables');

        for (let tableCode in this.tableSubscriptionMap)
            this.unsubscribeTable(tableCode);
    }

    private isAlreadySubscribed(tableCode: string): boolean {
        return tableCode in this.tableSubscriptionMap;
    }

    private createMessageString(params: Object): string {
        let paramsJson = JSON.stringify(params);
        return 'vc=tableCommand&action=NSubscribe&data={s:[' + paramsJson + ']}&s:' + this.sessionId;
    }

    private subscribeForSessionIdChanging(): Subscription {
        return this.sessionService.getUserInfoSubject().subscribe(userInfo => this.sessionId = userInfo ? userInfo['s'] : null);
    }

    private subscribeForWebSocketClosing(): Subscription{
        return this.webSocketService.isOpenedSubject.subscribe((isWebsockedOpen: boolean) => {
            if (!isWebsockedOpen) {
                console.log("Reset tableSubscriptionMap because websocket closed");
                this.tableSubscriptionMap = {};
            }
        })
    }

}
