import {Component, OnInit} from '@angular/core';
import {SessionService} from "../session.service";
import {TopMenuService} from "./top-menu.service";

@Component({
    selector: 'top-menu',
    templateUrl: 'top-menu.component.html'
})

export class TopMenuComponent implements OnInit{

    constructor(private topMenuService: TopMenuService, private sessionService: SessionService){}

    tablesList: [Object];

    ngOnInit(): void {
        this.sessionService.userInfoSubject.subscribe(userInfo => this.loadMenu(userInfo));
    }

    loadMenu(userInfo){
        if(userInfo)
            this.topMenuService.getTables().subscribe(data => this.tablesList = data.rowSet, data => this.processBadResponse(data));
        else
            this.tablesList = null;
    }

    processBadResponse(error: Error){
        console.log(error.message);
    }

}
