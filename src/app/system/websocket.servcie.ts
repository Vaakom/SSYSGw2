import {Injectable} from "@angular/core";
import {Subject, BehaviorSubject, Observable, Subscription} from "rxjs/Rx";
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
import 'rxjs/add/operator/map';
import {SSYSGwResultSelector} from './ssysgw.result.selector';

@Injectable()
export class WebSocketService{

    private websocket: WebSocketSubject<Object>;
    private subscription: Subscription;

    public isOpenedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false)

    private messageMap = {
        login: new Subject(),
        logout: new Subject(),
        tableCommand: new Subject(),
        table: new Subject(),
        other: new Subject()
    }
    
    private url: string;

    public getMessageSubjectByName(name: string): Subject<Object> {
        return this.messageMap[name] ? this.messageMap[name] : this.messageMap['other'];
    }

    //public universalMessage: Subject<Object> = new Subject();
    // public opened: Subject<boolean> = new Subject();
    
    public start(url:string):void {
        // if(this.isOpen){
        //      console.log('Websocket is already opened')
        //      return;
        // }

        this.url = url;
        
        let webSocketConfig = {
            url: url, 
            resultSelector: SSYSGwResultSelector.resultSelector 
        };

        this.websocket = Observable.webSocket(webSocketConfig);
        // this.reconnectAttemptsCounter = 0;
        console.log('Websocket opened');

        this.isOpenedSubject.next(true);

        this.subscription = this.websocket.subscribe({
            next: (data) => {
                let messageName = data['vc'] ? data['vc'] : 'other';                
                this.getMessageSubjectByName(messageName).next(data);
                this.getMessageSubjectByName('other').next(data);
            },
            error: (err) => {
                console.log('WebSocket error');
                console.log(err);
                this.close();
                //this.reconnect();
            },
            complete: () => {
                console.log("WebSocket complete by server");
                this.close();
                //this.reconnect();
            }            
        });
    }
        
    public sendMessage( message: string ):void{
        return this.websocket.next( message );
    }

    public close():void {        
        //this.disposeAllMessages();
        this.subscription.unsubscribe();
        this.websocket.complete();
        this.isOpenedSubject.next(false);
        console.log("WebSocket closed");
    }

    // private disposeAllMessages(){
    //     console.log('Unsubscribe all messages');
    //     for(let message in this.messageMap){            
    //         console.log(message);
    //         this.messageMap[message].unsubscribe();
    //     }
    // }
    
    public reconnect() :void {
        console.log('Reconnect websocket');
        this.start(this.url);
    }

    public isOpened(): boolean {
        return this.isOpenedSubject.getValue();
    }
    // private reconnect(){
    //     setTimeout( () => {
    //         console.log('Reconnect attempt (' + this.reconnectAttemptsCounter + ')');
    //         this.start(this.url);
    //     }, 3000 );
    // }
    
}