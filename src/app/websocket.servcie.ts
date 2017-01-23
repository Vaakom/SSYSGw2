import {Injectable} from "@angular/core";
import {Subject, Observable, Subscription} from "rxjs/Rx";
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
import 'rxjs/add/operator/map';

@Injectable()
export class WebSocketService{

    private ws: WebSocketSubject<Object>;
    private socket: Subscription;

    public message: Subject<Object> = new Subject();
    public opened: Subject<boolean> = new Subject();
    
    
    public close():void{
        this.socket.unsubscribe();
        this.ws.complete();
        console.log("WebSocket closed");
    }

    public sendMessage( message:string ):void{
        this.ws.next( message );
    }
    
    
    public start(url:string){
        let self = this;        

        this.ws = Observable.webSocket(url);
        console.log("WebSocket created");
        this.socket = this.ws.subscribe({
            next: ( data:MessageEvent ) => {
                console.log("WebSocket subscription data:");
                console.log(data);

                if( data['type'] == 'welcome' ){
                    self.opened.next(true);
                }
                this.message.next( data );                
            },
            error: () => {

                self.opened.next( false );
                this.message.next( { type: 'closed' } );

                self.socket.unsubscribe();
                console.log("WebSocket error");
//                setTimeout( () => {
//                    self.start(self.url );
//                }, 1000 );

            },
            complete: () => {
                this.message.next( { type: 'closed' } );
                console.log("WebSocket complete");
            }            
        });
        console.log("WebSocket subscription complete");
    }
}