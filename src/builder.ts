import Pagination from './pagination.ts';
import Table from './table.ts';
import Utils from './utils.ts';

let o = new Utils();

export default class Builder{
    current: string;
    show: number;
    dom_table: HTMLElement;
    table: Table;
    ul_paginator: HTMLUListElement;
    input_current: HTMLInputElement;
    observer: MutationObserver;
    observerConfig: Object;

    constructor(table: any){
        this.current = table.dataset.current || "1";
        this.show = table.dataset.show || 5;
        this.ul_paginator = document.createElement("ul");
        this.input_current = document.createElement("input");
        this.dom_table = table;
        this.table = new Table(this.dom_table);
        this.observer = new MutationObserver(this.tableUpdate.bind(this));
        this.observerConfig = { attributes: true, childList: true, characterData: true };
    }

    tableUpdate(mutations: any){
        mutations.forEach((mutation: any) => {
            //console.log(this.table.tr);
            if (mutation.addedNodes[0]) {
                if (mutation.addedNodes[0].tagName == "TR"){
                    this.table.tr.push(mutation.addedNodes[0]);
                    this.hideRows();
                    this.ul_paginator.parentElement.removeChild(this.ul_paginator);
                    this.ul_paginator.innerHTML = "";
                    this.createPagination();
                }
            }

            if (mutation.removedNodes[0]) {
                if (mutation.removedNodes[0].tagName == "TR"){

                    this.table.tr.forEach((tr: HTMLElement, index: number) => {
                        if(mutation.removedNodes[0] == tr){
                            //console.log(index);
                            this.table.tr.splice(index,1);}
                    });

                    this.hideRows();
                    this.ul_paginator.parentElement.removeChild(this.ul_paginator);
                    this.ul_paginator.innerHTML = "";
                    this.createPagination();
                }
            }
        });
    }

    observe(){
        this.observer.observe(this.table.tbody[0], this.observerConfig);
    }

    createCurrentInput(){
        this.input_current.style.display = "none";
        this.input_current.type = "text";
        this.input_current.className = "current";
        this.input_current.value = this.current;

        o.nextTo(this.dom_table, this.input_current);
    }

    eventCurrentInput(){
        let that = this;
        this.input_current.onchange = function(){
            that.current = this.value;
            that.hideRows();

            that.ul_paginator.parentElement.removeChild(that.ul_paginator);
            that.ul_paginator.innerHTML = "";

            that.createPagination();
        };

    }

    hideRows(){
        let isBetween = (x: any)=> this.table.tr.indexOf(x) >= ((+this.current*this.show)-this.show) && this.table.tr.indexOf(x) < +this.current*this.show;

        o.dropWhile(this.table.tr, isBetween).forEach((row: HTMLElement)=>{
            row.style.color = "red";
            row.style.display = "none";
        });

        o.takeWhile(this.table.tr, isBetween).forEach((row: HTMLElement)=>{
            row.style.color = "black";
            row.style.display = "table-row";
        });
    }

    createPagination(){
        let pag = new Pagination(+this.current, Math.ceil(this.table.tr.length/this.show));
        pag.getCurrent(+this.current);

        this.ul_paginator.className = "pagination pull-right";

        this.ul_paginator.style.display = "visible";


        pag.rangeWithDots.forEach( (e) => {
            let li = document.createElement("li");
            if(e==this.current) li.className = "active";
            li.style.cursor = "pointer";
            let a = document.createElement("a");
            li.appendChild(a);
            let text = document.createTextNode(e);
            a.appendChild(text);
            this.ul_paginator.appendChild(li);

            li.onclick = (f) => {
                let move = 0;
                //this.dom_table.dataset.current = this.current;
                if(e=='»'){ move = +this.current + 2; }
                if(e=='«'){ move = +this.current - 2; }
                this.input_current.value = String((e=='»'||e=='«')?move:e);
                this.input_current.onchange(f);
            };

        });

        o.nextTo(this.dom_table, this.ul_paginator);
    }
}

