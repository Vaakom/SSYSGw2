import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

@Injectable()
export class TopMenuService {

    private url = '/proxy/SSYSGw/gw';
    private headers = new Headers();

    constructor (private http: Http){
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    getTables(){
        let reqParamsStr = 'action=NSubscribe&data={s:[{v:"FV_SYSTEM",a:"S"}]';
        return this.http.post(this.url, reqParamsStr, {headers: this.headers}).map(res => this.parseResponse(res));
    }

    parseResponse(res){
			console.log(res);
            let json = res.json();
			console.log(json);
            if(json.r == false)
                throw new Error(json.d ? json.d : 'Something wrong, we are sorry');

            return json;        
    }

}