import Builder from './builder.ts';
import Utils from './utils.ts';

let o = new Utils();

function Main(){
    let tables: Array<HTMLElement>;
    tables = o.toArray(document.getElementsByClassName("pagination-observer"));

    tables.forEach((table: HTMLElement) => {
        let builder = new Builder(table);
        builder.hideRows();
        builder.createCurrentInput();
        builder.eventCurrentInput();
        builder.createPagination();
        builder.observe();
    });
}
Main();
