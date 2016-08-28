import Pagination from './pagination.ts';
import Table from './table.ts';
import Utils from './utils.ts';

let o = new Utils();
let current: string = "1";
let show: number = 4;
let paginator = document.createElement("ul");
let inputCurrent: HTMLInputElement = <HTMLInputElement> document.createElement("input");

function Main(){

    let element: HTMLTableElement = <HTMLTableElement> document.getElementById("po");
    let table = new Table(element);

    CurrentDOM(element)


    let isBetween = (x: any)=> table.tr.indexOf(x) >= ((+current*show)-show) && table.tr.indexOf(x) < +current*show;
    //Show tr's
    o.dropWhile(table.tr, isBetween).forEach((row: HTMLElement)=>{
        row.style.color = "red";
        row.style.display = "none";
    });

    o.takeWhile(table.tr, isBetween).forEach((row: HTMLElement)=>{
        row.style.color = "black";
        row.style.display = "table-row";
    });

    let p = new Pagination(+current,Math.ceil(table.tr.length/show));
    PaginationDOM(p, element);



}
Main();

function CurrentDOM(element: HTMLTableElement) {

    let table = new Table(element);

    inputCurrent.style.display = "none";
    inputCurrent.type = "text";
    inputCurrent.className = "current";
    inputCurrent.value = current;

    o.nextTo(element, inputCurrent);

    let isBetween = (x: any)=> table.tr.indexOf(x) >= ((+current*show)-show) && table.tr.indexOf(x) < +current*show;

    inputCurrent.onchange = function(){
        current = this.value;

        o.dropWhile(table.tr, isBetween).forEach((row: HTMLElement)=>{
            row.style.color = "red";
            row.style.display = "none";
        });

        o.takeWhile(table.tr, isBetween).forEach((row: HTMLElement)=>{
            row.style.color = "black";
            row.style.display = "table-row";
        });

        paginator.parentElement.removeChild(paginator);
        paginator.innerHTML = "";
        let p = new Pagination(+current,Math.ceil(table.tr.length/show));
        PaginationDOM(p, element);
    };
}

function PaginationDOM(p: Pagination, table: HTMLTableElement) {
    p.getCurrent(1);

    paginator.className = "pagination pull-right";

    p.rangeWithDots.forEach(function (e) {
        let li = document.createElement("li");
        if(e==current) li.className = "active";
        li.style.cursor = "pointer";
        let a = document.createElement("a");
        li.appendChild(a);
        let text = document.createTextNode(e);
        a.appendChild(text);
        paginator.appendChild(li);

        li.onclick = function () {
            let move = 0;
            if(e=='»'){ move = +current + 2; }
            if(e=='«'){ move = +current - 2; }
            inputCurrent.value = String((e=='»'||e=='«')?move:e);
            inputCurrent.onchange(this);
        }
    });

    o.nextTo(table, paginator);
}
