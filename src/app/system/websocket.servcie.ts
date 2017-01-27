import {Injectable} from "@angular/core";
import {Subject, Observable, Subscription} from "rxjs/Rx";
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
import 'rxjs/add/operator/map';
import {SSYSGwResultSelector} from './ssysgw.result.selector';

@Injectable()
export class WebSocketService{

    private messageMap = {
        login: new Subject(),
        logout: new Subject(),
        tableSign: new Subject(),
        tableUnsign: new Subject(),
        table: new Subject(),
        other: new Subject()
    }

    public getMessageForSubscription(name: string): Subject<Object> {
        //let messageName = name && name.startsWith('table') ? 'table' : name;

        return this.messageMap[name] ? this.messageMap[name] : this.messageMap['proxy'];
    }

    private websocket: WebSocketSubject<Object>;
    private subscription: Subscription;

    //public universalMessage: Subject<Object> = new Subject();
    // public opened: Subject<boolean> = new Subject();
    
    public start(url:string){
        let self = this;        
        
        let webSocketConfig = {
            url: url, 
            resultSelector: SSYSGwResultSelector.resultSelector 
        };

        this.websocket = Observable.webSocket(webSocketConfig);
        
        //TODO: process websocket connection crash
        this.subscription = this.websocket.subscribe({
            next: (data) => {
                // if( data['type'] == 'welcome' ){self.opened.next(true);// }
                let messageName = data['vc'] ? data['vc'] : 'other';                
                this.getMessageForSubscription(messageName).next(data);

                this.getMessageForSubscription('other').next(data);
            },
            error: (err) => {

                // self.opened.next( false );
                // this.message.next( { type: 'closed' } );

                // self.socket.unsubscribe();
                // console.log("WebSocket error");
                // setTimeout( () => {
                //     self.start(self.url );
                // }, 1000 );

            },
            complete: () => {
                // this.message.next( { type: 'closed' } );
                console.log("WebSocket complete");
            }            
        });
    }

    public sendMessage( message: string ):void{
        return this.websocket.next( message );
    }

    public close():void{
        this.subscription.unsubscribe();
        this.websocket.complete();
        console.log("WebSocket closed");
    }

    // private processResponse(data){
    //     if(data['r'] == true){
    //         return data;
    //     } else {
    //         throw new Error(data['d'] ? data['d'] : 'Sorry. Something wrong.');
    //     }            
    // }
    
}