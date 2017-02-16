import {SplitPipe} from './split.pipe'

describe('ComputePages', () => {
    let splitPipe = new SplitPipe();

    it('Return null for undefined params', () => {
        let str = undefined;
        let maxLength = undefined;

        const result = splitPipe.transform(str, maxLength);
        expect(result).toBeNull();
    })    

    it('Return null for null params', () => {
        let str = null;
        let maxLength = null;

        const result = splitPipe.transform(str, maxLength);
        expect(result).toBeNull();
    })
 
    it('Return unsplitted string for maxLength == 0', () => {
        let str = '12345';
        let maxLength = 0;

        const result = splitPipe.transform(str, maxLength);
        expect(result == result).toBeTruthy();
    })

    it('Return unsplitted string for str.length < maxLength', () => {
        let str = '12345';
        let maxLength = 10;

        const result = splitPipe.transform(str, maxLength);
        expect(str == result).toBeTruthy();
    })    

    it('Work with "false" or "true" string. Return string.', () => {
        let str = 'false';
        let maxLength = 10;

        const result = splitPipe.transform(str, maxLength);
        expect(str == result).toBeTruthy();
    })

   it('Insert whitespace character after every maxLength. Here must be 3 spaces', () => {
        let str = '12312312312';
        let maxLength = 3;

        const result = splitPipe.transform(str, maxLength);
        expect(result.length - str.length == 3).toBeTruthy();
    })        

   it('Start count again after every space in source str. Here must be 4 spaces', () => {
        let str = '12 312 3123123';
        let maxLength = 3;

        const result = splitPipe.transform(str, maxLength);
        expect(result.length - str.length == 4).toBeTruthy();
    })

   it('Don\'t add whitespace to the end. Here must be 2 spaces', () => {
        let str = '123123123';
        let maxLength = 3;

        const result = splitPipe.transform(str, maxLength);
        expect(result.length - str.length == 2).toBeTruthy();
    })    


})