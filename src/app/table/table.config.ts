export class TableConfig {
    private currentPage: number;
    private rowsOnPage: number;
    private orderBy: string;
    
    constructor(currentPage: number, maxRows: number, orderBy: string) {
        this.currentPage = currentPage;
        this.rowsOnPage = maxRows;
        this.orderBy = orderBy;
    }

    getCurrentPage(): number {
        return this.currentPage
    }

    setCurrentPage(currentPage: number): void{
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

}