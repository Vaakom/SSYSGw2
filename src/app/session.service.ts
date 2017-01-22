import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Rx";

@Injectable()
export class SessionService {

    userInfo: Object = null;

    userInfoSubject = new Subject<Object>();

    setUserInfo(value) {
        this.userInfo = value;
        this.userInfoSubject.next(this.userInfo);
    }
}
