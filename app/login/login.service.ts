import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {LoginData} from './login.data'

@Injectable()
export class LoginService{

    constructor (private http: Http){}
    
    doLogin(data: LoginData){
        let responseStr = 
        '{"s":"8D495BE95A9E677CDA2001D7EDC5F11A","dt":"11.01.2017 17:37:29.196","nt":757104999525453,"p":{"lp":[],"lr":["ADMIN"],"pc":"INDOIDJPSUP","ak":"N","sr":"f567b77 2017-01-11 09:38:02 +0100","si":1800000},"st":"11.01.2017 17:06:20.040","tz":"Europe/Moscow","r":true,"id":"8D495BE95A9E677CDA2001D7EDC5F11A"}';
        
        return Observable.from(responseStr).map(resp => JSON.parse(resp));
    }
}