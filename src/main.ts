import Pagination from './pagination.ts';
import Table from './table.ts';
import utils from './utils.ts';

let o = new utils();
let current: string = "3";
let show: number = 4;

function Main(){

    let element: HTMLTableElement = <HTMLTableElement> document.getElementById("po");
    let table = new Table(element);

    let inputCurrent: HTMLInputElement = <HTMLInputElement> document.createElement("input");
    //inputCurrent.style.display = "none";
    inputCurrent.type = "text";
    inputCurrent.className = "current";
    inputCurrent.value = current;
    o.nextTo(element, inputCurrent);


    let predicate = (x: any)=> table.tr.indexOf(x) >= ((+current*show)-show) && table.tr.indexOf(x) < +current*show;
    //Show tr's
    o.dropWhile(table.tr, predicate).forEach((row: HTMLElement)=>{
        row.style.color = "red";
    });

/*    o.take(table.tr, show).forEach(function(row: HTMLElement){
        row.style.display = "table-row";
    });
    //Hide tr's
    o.drop(table.tr, show).forEach(function(row: HTMLElement){
        row.style.display = "none";
    });
*/
    let p = new Pagination(1,Math.ceil(table.tr.length/show));
    PaginationDOM(p, element);
}
Main();

function PaginationDOM(p: Pagination, table: HTMLTableElement) {
    p.getCurrent(1);

    let paginator = document.createElement("ul");
    paginator.className += "pagination pull-right";

    p.rangeWithDots.forEach(function (e) {
        let li = document.createElement("li");
        li.style.cursor = "pointer";
        let a = document.createElement("a");
        li.appendChild(a);
        let text = document.createTextNode(e);
        a.appendChild(text);
        paginator.appendChild(li);
    });

    o.nextTo(table, paginator);
}
