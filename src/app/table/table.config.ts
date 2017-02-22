export class TableConfig {
    private currentPage: number;
    private rowsOnPage: number;
    private orderBy: string;
    private sortASC: boolean;
    private filter: string;

    private totalRows: number;
    
    constructor(currentPage: number, rowsOnPage: number, orderBy: string, sortASC: boolean, totalRows: number) {
        this.currentPage = currentPage;
        this.rowsOnPage = rowsOnPage;
        this.orderBy = orderBy;
        this.sortASC = sortASC;
        this.totalRows = totalRows;
    }

    getCurrentPage(): number {
        return this.currentPage
    }

    setCurrentPage(currentPage: number): void {
        this.currentPage = currentPage;
    }

    getFirstRow(): number {
        return (this.currentPage - 1) * this.rowsOnPage + 1;
    }

    getLastRow(): number {
        return this.currentPage * this.rowsOnPage + 1;
    }

    getOrderBy(): string {
        return this.orderBy;
    }

    setOrderBy(orderBy: string): void {
        this.orderBy = orderBy;
    }

    getTotalRows(): number {
        return this.totalRows;
    }

    setTotalRows(totalRows: number): void{
        this.totalRows = totalRows;
    }

    isSortASC(): boolean {
        return this.sortASC;
    }

    setSortASC(sortASC: boolean): void {
        this.sortASC = sortASC;
    }

    getFilter(): string{
        return this.filter;
    }

    setFilter(filter: string): void {
        this.filter = filter
    }

}