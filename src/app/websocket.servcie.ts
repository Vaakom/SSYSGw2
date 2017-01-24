import {Injectable} from "@angular/core";
import {Subject, Observable, Subscription} from "rxjs/Rx";
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
import 'rxjs/add/operator/map';

@Injectable()
export class WebSocketService{

    ws: WebSocketSubject<Object>;
//    public socket: Subscription;

//    public message: Subject<Object> = new Subject();
    // public opened: Subject<boolean> = new Subject();
    
        
    public start(url:string){
        let self = this;        
        
        let webSocketConfig = {
            url: url, 
            resultSelector: (messageEvent: MessageEvent) => {
                let braceIndex: number = messageEvent.data ? messageEvent.data.indexOf('{') : -1;
                let jsonStr = braceIndex > -1 ? messageEvent.data.substring(braceIndex) : '{}';
                return JSON.parse(jsonStr);
            } 
        };

        this.ws = Observable.webSocket(webSocketConfig);
        
        console.log("WebSocket created");
        // this.socket = this.ws.subscribe({
        //     next: ( data:MessageEvent ) => {
        //         console.log("WebSocket subscription data:");
        //         console.log(data);

        //         if( data['type'] == 'welcome' ){
        //             self.opened.next(true);
        //         }
        //         this.message.next( data );                
        //     },
        //     error: () => {

        //         self.opened.next( false );
        //         this.message.next( { type: 'closed' } );

        //         self.socket.unsubscribe();
        //         console.log("WebSocket error");
        //         setTimeout( () => {
        //             self.start(self.url );
        //         }, 1000 );

        //     },
        //     complete: () => {
        //         this.message.next( { type: 'closed' } );
        //         console.log("WebSocket complete");
        //     }            
        // });
        // console.log("WebSocket subscription complete");
    }

    public sendMessage( message: string ):void{
        return this.ws.next( message );
    }

    public close():void{
//        this.socket.unsubscribe();
        this.ws.complete();
        console.log("WebSocket closed");
    }

    
}