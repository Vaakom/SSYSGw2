import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";

import {SessionService} from "../system/session.service";
import {Http} from "@angular/http";
import {Observable} from "rxjs";

@Injectable( )
export class ConfigGuard implements CanActivate {

  constructor(private sessionService: SessionService, private http: Http){
  }

  canActivate() {
    return this.http.get("./assets/config.json").map(res => res.json()).map(json => this.successLoad(json)).catch(err	=> this.failedLoad(err));
  }

  successLoad(json: Object): boolean{
    this.sessionService.setConfig(json);
    console.log(json);
    return true;
  }

  failedLoad(err: string){
    this.sessionService.setConfig(null);
    this.sessionService.setGlobalError(err);
    console.log(err);
    return Observable.of(true);
  }
}
