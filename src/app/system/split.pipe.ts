import { Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'splitPipe'})
export class SplitPipe implements PipeTransform {
  
  transform(str: string, maxLength: number) {
    let goodParams = str && maxLength >= 0;
    if(!goodParams)
        return null;
    
    if(maxLength == 0 || str.length < maxLength)
        return str;
    
    let newString = '';
    let counter = 0;
    for(let i=0; i<str.length; i++){
        let currentChar = str.charAt(i);
        newString = newString + currentChar;

        if(currentChar == ' ')
            counter == 0;
        
        let insertAfterMaxlength = counter == maxLength 
        let notLastCharacter = i < str.length-1;

        if(insertAfterMaxlength && notLastCharacter){
            newString = newString + ' ';
            counter = 0;
        }
        
        counter++;        
    }
    return newString;
  }

}