
import {Injectable} from "@angular/core";
import {DatePipe} from "@angular/common";
import {Observable, Subscription} from "rxjs/Rx";

import {SessionService} from "../system/session.service";
import {WebSocketService} from "../system/websocket.servcie";

@Injectable()
export class HeartbitService {
    
    
    private interval: number = 5000;
    private sessionId: string;

    private timer: Observable<number>;
    private timerSubscription: Subscription;

    constructor (private webSocketService: WebSocketService){
        this.timer = Observable.interval(this.interval)
    }    

    startHeartbit():void {
        console.log('Start heartbit');
        this.sendHeartbitMessage();
        this.timerSubscription = this.timer.subscribe(x => this.sendHeartbitMessage());    
    }

    stopHeartbit():void {
        console.log('Stop heartbit');
        this.timerSubscription.unsubscribe();
    }

    sendHeartbitMessage():void {
        //console.log('Send heartbit');
        let currentDate = new Date();
        let dt =  new DatePipe('en-US').transform(currentDate, 'dd.MM.yyyy HH:mm:ss.') + currentDate.getMilliseconds();
        
        let heartbitStr = 'vc=HB&action=NHB&s=' + this.sessionId + '&data={"dt":"' + dt + '"}';
        //console.log(heartbitStr);
        this.webSocketService.sendMessage(heartbitStr);

    }

    setHeartbitInterval(interval: number):void {
        this.interval = interval;
    }

    setSessionId(sessionId: string):void {
        this.sessionId = sessionId;
    }

    
}