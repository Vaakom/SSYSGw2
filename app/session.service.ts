import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs/Rx";

@Injectable()
export class SessionService {

    userInfo: Object;

    userInfoSubject = new Subject<Object>();

    setUserInfo(value) {
        this.userInfo = value;
        this.userInfoSubject.next(this.userInfo);
    }
}