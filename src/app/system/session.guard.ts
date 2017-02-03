import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";

import {SessionService} from "../system/session.service";

@Injectable( )
export class SessionGuard implements CanActivate {

    constructor(private sessionService: SessionService, private router: Router){
    }

    canActivate(){
        if(this.sessionService.isSessionOpen())
            return true;
        
        this.router.navigate(['LoginFormComponent'])
        return false;
    }
}