import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

@Injectable()
export class TopMenuService {
    getTables(){
        return null;
    }

    setTableSubscription(tableCode: string, operationCode: string): void{}

    startGettingTableData(tableCode: string){
        return null;
    }

    stopGettingTableData(tableCode: string){
        return null;
    }

    modifyGettingTableData(tableCode: string){
        return null;
    }
    
    parseResponse(res){
        return null;
    }

}
