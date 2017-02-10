import {Injectable} from "@angular/core";
import {Subject, BehaviorSubject, Observable, Subscription} from "rxjs/Rx";
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
import 'rxjs/add/operator/map';

import {SSYSGwResultSelector} from './ssysgw.result.selector';
import { SocketData} from "./socket.data";

@Injectable()
export class WebSocketService{

    private websocket: WebSocketSubject<Object>;
    private subscription: Subscription;

    public isOpenedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false)

    private messageMap = {
        login: new Subject<SocketData>(),
        logout: new Subject<SocketData>(),
        tableCommand: new Subject<SocketData>(),
        table: new Subject<SocketData>(),
        other: new Subject<SocketData>()
    }
    
    private url: string;

    public getMessageSubjectByName(name: string): Subject<SocketData> {
        return this.messageMap[name] ? this.messageMap[name] : this.messageMap['other'];
    }

    public start(url:string): void {
        this.url = url;
        
        let webSocketConfig = {
            url: url, 
            resultSelector: SSYSGwResultSelector.resultSelector 
        };

        this.websocket = Observable.webSocket(webSocketConfig);
        console.log('Websocket opened');

        this.isOpenedSubject.next(true);

        this.subscription = this.websocket.subscribe({
            next: (data: SocketData) => {
                let messageName = data.vc ? data.vc : 'other';                
                this.getMessageSubjectByName(messageName).next(data);
                this.getMessageSubjectByName('other').next(data);
            },
            error: (err) => {
                console.log('WebSocket error');
                console.log(err);
                this.close();
            },
            complete: () => {
                console.log("WebSocket complete by server");
                this.close();
            }            
        });
    }
        
    public sendMessage( message: string ):void{
        return this.websocket.next( message );
    }

    public close():void {        
        this.subscription.unsubscribe();
        this.websocket.complete();
        this.isOpenedSubject.next(false);
        console.log("WebSocket closed");
    }

    public isOpened(): boolean {
        return this.isOpenedSubject.getValue();
    }
}