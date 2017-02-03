import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";

import {HeartbitService} from "../system/heartbit.service";

@Injectable()
export class SessionService {

    userInfoSubject = new BehaviorSubject<Object>(null);
    
    sessionOpenSubject = new BehaviorSubject<boolean>(false);
    
    constructor(private heartbitService: HeartbitService){
    }

    openSession(userInfo: Object){
        this.userInfoSubject.next(userInfo);
        this.sessionOpenSubject.next(true);
        
        this.heartbitService.setHeartbitInterval(5000);
        this.heartbitService.setSessionId(this.getUserInfo()['s']);        
        this.heartbitService.startHeartbit();
    }

    closeSession(){
        //TODO some clean operations
        this.sessionOpenSubject.next(false);
        this.userInfoSubject.next(null);
        this.heartbitService.stopHeartbit();
    }

    isSessionOpen(): boolean {
        return this.sessionOpenSubject.getValue();
    }

    getUserInfo(): Object {
        return this.userInfoSubject.getValue();
    }



}
