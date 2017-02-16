export class TableConfig {
    private currentPage: number;
    private rowsOnPage: number;
    private orderBy: string;
    private totalRows: number;
    
    constructor(currentPage: number, rowsOnPage: number, orderBy: string, totalRows: number) {
        this.currentPage = currentPage;
        this.rowsOnPage = rowsOnPage;
        this.orderBy = orderBy;
        this.totalRows = totalRows;
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

    getTotalRows(): number {
        return this.totalRows;
    }

    setTotalRows(totalRows: number){
        this.totalRows = totalRows;
    }

}