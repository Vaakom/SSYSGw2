import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'paginator',
    templateUrl: 'paginator.component.html'
})

export class PaginatorComponent {
    @Input() showPages = 10;
    @Input() currentPage = 1;
    @Input() rowsOnPage = 10;
    @Input() totalRows = 0;

    @Output() onPageSelected = new EventEmitter<number>();

    totalPages: number;
    previousPage: number;
    nextPage: number;
    pageArray: Array<number>;

    ngOnChanges() {
        this.totalPages = this.getTotalPages();
        this.previousPage = this.getPreviousPage();
        this.nextPage = this.getNextPage();
        this.pageArray = this.getPageArray();
    }    

    getTotalPages(): number {
        return Math.ceil(this.totalRows / this.rowsOnPage);
    }

    getPageArray(): Array<number> {
        let middlePage = this.calculateMiddlePage();
        // console.log('middlePage: ' + middlePage);
        if(this.currentPage <= middlePage || this.totalPages < this.showPages)
            return this.createPageNumArray(1);

        if(this.totalPages - middlePage <= this.currentPage)
            return this.createPageNumArray(this.totalPages - this.showPages + 1);
        
        return this.createPageNumArray(this.currentPage - middlePage);
    }

    createPageNumArray(startPage: number): Array<number>{
        let array = new Array<number>();
        let pageNum = startPage; 
        let counter = 0;
        while((counter < this.showPages) && (pageNum <= this.totalPages)){
            array.push(pageNum);
            counter++;
            pageNum++;
        }
        // console.log('startPage:' + startPage + 'totalPages:' + this.totalPages);        
        // console.log(array);
        // console.log();
        return array;
    }    

    selectPage(pageNum: number): void {        
        this.onPageSelected.emit(pageNum);
        this.currentPage = pageNum;
    }

    getPreviousPage(): number {
        return this.currentPage == 1 ? 1 : this.currentPage - 1 ;
    }

    getNextPage(): number {
        return this.currentPage == this.totalPages ? this.currentPage : this.currentPage + 1 ;
    }

    calculateMiddlePage(): number {
        return Math.ceil(this.showPages / 2);
    }

}    
