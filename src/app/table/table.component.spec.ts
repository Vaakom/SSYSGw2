import {TableComponent} from './table.component'

describe('ComputePages', () => {
    let tableComponent = new TableComponent(null, null, null, null);

    it('null string for null or empty filters', () => {        
        // const result = tableComponent.createFilterString({pId: 'aaa', name: 'bbb', code: 'code'});
        const result = tableComponent.createFilterString({pId: null, name: null});
        expect(result).toBeNull();
    })

    it('Simple filter', () => {        
        const result = tableComponent.createFilterString({pId: 'aaa'});
        expect(result).toBe("pId LIKE 'aaa*'");
    })    

    it('Multi column filter', () => {        
        const result = tableComponent.createFilterString({pId: 'aaa', name: 'bbb'});
        expect(result).toBe("pId LIKE 'aaa*' AND name LIKE 'bbb*'");
    })    
})