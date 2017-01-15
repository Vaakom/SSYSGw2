import {Component, OnInit} from '@angular/core';
import {SessionService} from "../session.service";
import {TopMenuService} from "./top-menu.service";

@Component({
    selector: 'top-menu',
    templateUrl: 'app/menu/top-menu.component.html'
})

export class TopMenuComponent implements OnInit{

    constructor(private topMenuService: TopMenuService, private sessionService: SessionService){}

    tablesList: [Object];

    ngOnInit(): void {
        this.sessionService.userInfoSubject.subscribe(userInfo => this.loadMenu());
    }

    loadMenu(){
        console.log("Load menu!");
        this.topMenuService.getTables().subscribe(
            tables => {
                this.tablesList = tables.rowSet;
                console.log(this.tablesList);
            }
        );
    }
}