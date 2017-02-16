import {PaginatorComponent} from './paginator.component'

describe('ComputePages', () => {
    let paginator = new PaginatorComponent();

    it('Return 0 page for totalRows == 0', () => {
        paginator = new PaginatorComponent();
        paginator.totalRows = 0;
        paginator.rowsOnPage = 10;

        const result = paginator.getTotalPages();
        expect(result).toBe(0);
    })

    it('Return 1 page for totalRows < rowsOnPage', () => {
        paginator = new PaginatorComponent();
        paginator.totalRows = 5;
        paginator.rowsOnPage = 10;

        const result = paginator.getTotalPages();
        expect(result).toBe(1);
    })

    it('Return 1 page for totalRows == rowsOnPage', () => {
        paginator = new PaginatorComponent();
        paginator.totalRows = 10;
        paginator.rowsOnPage = 10;

        const result = paginator.getTotalPages();
        expect(result).toBe(1);
    })

    it('Return 2 page for totalRows == 15 and rowsOnPage == 10', () => {
        paginator = new PaginatorComponent();
        paginator.totalRows = 15;
        paginator.rowsOnPage = 10;

        const result = paginator.getTotalPages();
        expect(result).toBe(2);
    })    

    it('Calculate middle page', () => {
        paginator = new PaginatorComponent();
        paginator.showPages = 10;
        let result = paginator.calculateMiddlePage();
        expect(result).toBe(5);

        paginator.showPages = 12;
        result = paginator.calculateMiddlePage();
        expect(result).toBe(6);        
    })

    it('Show 5 pages before selected currentPage and 4 pages after', () => {
        paginator = new PaginatorComponent();
        paginator.showPages = 10;
        paginator.totalPages = 20;
        paginator.currentPage = 10;

        const result = paginator.getPageArray();
        expect(result[0]).toBe(5);
        expect(result[result.length-1]).toBe(14);
    })    

    it('Show 10 first pages', () => {
        paginator = new PaginatorComponent();
        paginator.showPages = 10;
        paginator.totalPages = 20;
        paginator.currentPage = 3;

        const result = paginator.getPageArray();
        expect(result[0]).toBe(1);
        expect(result[result.length-1]).toBe(10);
    })    

    it('Show 10 last pages', () => {
        paginator = new PaginatorComponent();
        paginator.showPages = 10;
        paginator.totalPages = 20;
        paginator.currentPage = 18;

        const result = paginator.getPageArray();
        expect(result[0]).toBe(11);
        expect(result[result.length-1]).toBe(20);
    })    

    it('Show all pages', () => {
        paginator = new PaginatorComponent();
        paginator.showPages = 10;
        paginator.totalPages = 5;
        paginator.currentPage = 5;

        const result = paginator.getPageArray();
        expect(result[0]).toBe(1);
        expect(result[result.length-1]).toBe(5);
    })    
})