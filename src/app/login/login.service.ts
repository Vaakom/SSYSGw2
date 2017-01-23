import {Injectable} from "@angular/core";
import {LoginData} from './login.data'
import {Observable} from "rxjs/Rx";

@Injectable()
export class LoginService  {
    doLogin(loginData: LoginData){
        return null;
    }

    doLogout(){
        return null;
    }
}

