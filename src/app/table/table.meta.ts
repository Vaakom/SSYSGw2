import {TableLegend} from "./table.legend";

export class TableMeta {
    id: number;
    name: string;
    code: string;
    mode: string;
    date: string;
    legend: TableLegend;
    isArchSupport: string;
    changeId: number;

    isVisible: boolean = true;
}
