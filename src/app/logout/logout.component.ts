import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router'
import {Observable, Subscription} from "rxjs/Rx";

import {SessionService} from "../system/session.service";
import {WebSocketService} from "../system/websocket.servcie";
import {TableDataServiceWs} from "../system/table.data.service.ws";
import {LoginService} from "../login/login.service";

@Component({
    selector: 'logout',
    template: `
        <button class="btn btn-outline-secondary btn-block mb-2" (click)="onClickLogout()">Sign out</button><br>
    `
        // <button class="btn btn-outline-secondary btn-block mb-2" (click)="onClickTestSign()">Test subscribe/unsubscribe</button>
        // <button class="btn btn-outline-secondary btn-block mb-2" (click)="onClickTestModify()">Test subscribe/modify</button>
})

export class LogoutComponent implements OnInit, OnDestroy{
    
    private termsSybscribed = false;
    private logoutSubscriptioon: Subscription;

    constructor(private tableDataService: TableDataServiceWs,
                private loginService: LoginService, 
                private sessionService: SessionService, 
                private webSocketService: WebSocketService,
                private router: Router){}

    ngOnInit(): void {
        this.logoutSubscriptioon = this.webSocketService.getMessageSubjectByName('logout').subscribe(data => {this.processLogoutResponse(data)});        
    }    

    ngOnDestroy(): void {
        this.logoutSubscriptioon.unsubscribe(); 
    }    

    onClickLogout(data){
        this.loginService.doLogout();        
    }
    
    processLogoutResponse(data){
        let json = data['data'];
        if(this.dataContainErrorMessage(json))
            console.log("Logout error: " + json);
        else {
            this.tableDataService.unsubscribeAllTables();
            this.sessionService.closeSession();
            this.router.navigate(['/'])
        }    
    }

    dataContainErrorMessage(data): boolean {
        return data['r'] == false;
    }

    onClickTestSign(data){
        console.log("subscribe/unsubscribe FV_D_PARAMS");
        this.tableDataService.setTableSubscription("FV_D_PARAMS", this.tableDataService.subscribe);
        this.tableDataService.setTableSubscription("FV_D_PARAMS", this.tableDataService.unsubscribe);
    }    

    onClickTestModify(data){        
        if(this.termsSybscribed){
            console.log("modify subscription FV_TERMS");
            this.tableDataService.setTableSubscription("FV_TERMS", this.tableDataService.modify);
        } else {
            this.termsSybscribed = true;
            console.log("subscribe FV_TERMS");
            this.tableDataService.setTableSubscription("FV_TERMS", this.tableDataService.subscribe);
        }    
    }
}