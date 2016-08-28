export default class Table {
    table: HTMLTableElement;
    tr: Array<HTMLElement>;

    constructor(table: HTMLTableElement){
        this.table = table;
        this.tr = [].slice.call(this.table.getElementsByTagName("tr"));
    }

}
