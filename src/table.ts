export default class Table {
    table: HTMLElement;
    tr: Array<HTMLElement>;
    thead: Array<HTMLElement>;
    tbody: Array<HTMLElement>;

    constructor(table: HTMLElement){
        this.table = table;
        this.thead = [].slice.call(this.table.getElementsByTagName("thead"));
        this.tbody = [].slice.call(this.table.getElementsByTagName("tbody"));
        this.tr = [].slice.call(this.tbody[0].children);
    }


}
