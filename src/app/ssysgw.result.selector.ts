export class SSYSGwResultSelector {
    static resultSelector = function(messageEvent: MessageEvent){
//        console.log("messageEvent.data: " + messageEvent.data);
        let resultObject = SSYSGwResultSelector.resultStringToObject(messageEvent.data);
        
        if(resultObject['data'])
            resultObject['data'] = JSON.parse(resultObject['data']);

        return resultObject;
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
}