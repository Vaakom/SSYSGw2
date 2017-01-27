import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Rx";

@Injectable()
export class SessionService {

    userInfo: Object = null;
    tablesList;

    userInfoSubject = new Subject<Object>();

    setUserInfo(value) {
        this.userInfo = value;
        this.userInfoSubject.next(this.userInfo);
    }

    setTablesList(tablesList){
        this.tablesList = tablesList;
    }
}
