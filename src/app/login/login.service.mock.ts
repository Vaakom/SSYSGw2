import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

import {LoginService} from './login.service'
import {LoginData} from './login.data'

@Injectable()
export class LoginServiceMock extends LoginService {

    doLogin(loginData: LoginData){
        return Observable.from(this.getMockLoginResponse(loginData)).map(res => JSON.parse(res));
    }

    doLogout(){
        return Observable.from(this.getMockLogoutResponse()).map(res => JSON.parse(res));
    }

    getMockLoginResponse(loginData: LoginData): [string]{
        let goodResponse = '{"s":"8D495BE95A9E677CDA2001D7EDC5F11A","dt":"11.01.2017 17:37:29.196","nt":757104999525453,"p":{"lp":[],"lr":["ADMIN"],"pc":"INDOIDJPSUP","ak":"N","sr":"f567b77 2017-01-11 09:38:02 +0100","si":1800000},"st":"11.01.2017 17:06:20.040","tz":"Europe/Moscow","r":true,"id":"8D495BE95A9E677CDA2001D7EDC5F11A"}';
        let badResponse = '{"nt":0,"r":false,"c":"EA324","d":"Wrong workplace/client version, version is not specified"}';

        let badResponse1 = '{"nt":0,"r":false,"c":"SA15","d":"SID is not registered","i":"GET:A05408F13F541A2FB34DAC89187878AE"}';

        if(loginData.version && loginData.login == "DepoMonitor1" && loginData.password == "1")
            return [goodResponse];
        else
            return [badResponse];
    }

    getMockLogoutResponse(){
        return ['{"r": "true"}'];
    }
}
