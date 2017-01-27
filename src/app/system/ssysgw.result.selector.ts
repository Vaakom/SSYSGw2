export class SSYSGwResultSelector {
    
    static resultSelector = function(messageEvent: MessageEvent){
        if(SSYSGwResultSelector.isSystemMessageReply(messageEvent.data))
            return SSYSGwResultSelector.processSystemMessageReply(messageEvent.data);
        else
            return SSYSGwResultSelector.processTableMessageReply(messageEvent.data);
    }

    private static resultStringToObject(resultString: string) : Object {
        if(!resultString)
            return {};
                
        let pairArray = resultString.split('&');
        
        let resultObject = {};
        for( let pair of pairArray){
            let attrAndValue = SSYSGwResultSelector.pairToArray(pair);
            resultObject[attrAndValue[0]] = attrAndValue[1];
        }

        return resultObject;
    }

    private static pairToArray(pair :string): string[] {
        let attrAndValue = pair.split('=');
        if(attrAndValue.length == 1)
            attrAndValue.push(null);
        
        return attrAndValue;
    }

    private static isSystemMessageReply(data: string): boolean {
        return data && data.startsWith('type=reply');
    }

    private static processSystemMessageReply(data: string): Object {
        let resultObject = SSYSGwResultSelector.resultStringToObject(data);
        
        if(resultObject['data'])
            resultObject['data'] = JSON.parse(resultObject['data']);
        console.log(resultObject);
        return resultObject;        
    }
    
    private static processTableMessageReply(data: string): Object {
        let resultObject;
        
        try {
            let resultData = JSON.parse(data);
            resultObject = {vc: 'table', r: 'true', data: resultData};
        } catch (err){
            resultObject = {vc: 'table', r: 'false', data: err + ' data: '+ data};
        }
        console.log(resultObject);
        return resultObject;
    }
}