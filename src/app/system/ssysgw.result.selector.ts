import { SocketData} from "./socket.data";

export class SSYSGwResultSelector {
    
    static resultSelector = function(messageEvent: MessageEvent): Object {
        let socketData : SocketData;

        if(SSYSGwResultSelector.replyIsSystemMessage(messageEvent.data))
            socketData = SSYSGwResultSelector.stringToSystemMessage(messageEvent.data);
        else
            socketData =  SSYSGwResultSelector.stringToTableMessage(messageEvent.data);
        
        console.log(socketData);
        return socketData;
    }

    private static resultStringToObject(resultString: string) : SocketData {
        let socketData = new SocketData();
        if(!resultString)
            return socketData;
                
        let pairArray = resultString.split('&');
        
        for( let pair of pairArray){
            let attrAndValue = SSYSGwResultSelector.pairToArray(pair);
            socketData[attrAndValue[0]] = attrAndValue[1];
        }

        return socketData;
    }

    private static pairToArray(pair :string): string[] {
        let attrAndValue = pair.split('=');
        if(attrAndValue.length == 1)
            attrAndValue.push(null);
        
        return attrAndValue;
    }

    private static replyIsSystemMessage(data: string): boolean {
        return data && data.startsWith('type=reply');
    }

    private static stringToSystemMessage(data: string): SocketData {
        let socketData = SSYSGwResultSelector.resultStringToObject(data);
        try {
            if(socketData.data)
                socketData.data = JSON.parse(socketData.data);
        } catch (err){
            socketData = new SocketData();
            socketData.r = false;
            socketData.data =  err + ' data: '+ data;
            
            console.log(socketData);
        }

        return socketData;
    }
    
    private static stringToTableMessage(data: string): SocketData {
        let socketData = new SocketData();
        
        try {
            socketData.data = JSON.parse(data);
            socketData.vc = 'table';
            socketData.r = true;
            socketData.type = 'reply';
            
        } catch (err){
            socketData.vc = 'table';
            socketData.r = false;
            socketData.type = 'reply';
            socketData.data = err + ' data: '+ data;
            console.log('Result Selector error: ' + err);
        }

        return socketData;
    }
}