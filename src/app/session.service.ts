import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs/Rx";
import {userInfo} from "os";

@Injectable()
export class SessionService {

    userInfo: Object = null;

    userInfoSubject = new Subject<Object>();

    setUserInfo(value) {
        this.userInfo = value;
        this.userInfoSubject.next(this.userInfo);
    }
}