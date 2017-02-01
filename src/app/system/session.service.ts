import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class SessionService {

    private userInfo: Object;
    
    sessionOpenSubject = new BehaviorSubject<boolean>(false);

    openSession(){
        this.sessionOpenSubject.next(true);
    }

    closeSession(){
        //TODO some clean operations
        this.sessionOpenSubject.next(false);
        this.userInfo = null;
    }

    isSessionOpen(): boolean {
        return this.sessionOpenSubject.getValue();
    }

    setUserInfo(userInfo: Object){
        this.userInfo = userInfo
    }

    getUserInfo(): Object {
        return this.userInfo;
    }



}
