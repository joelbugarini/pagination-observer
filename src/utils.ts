export default class Utils {
    constructor(){}
    nextTo(target: HTMLElement,element: HTMLElement){
        target.parentNode.insertBefore(element, target.nextSibling);
    }

    toArray(thing: any) {
        if (Array.isArray(thing)) return thing;
        return Array.prototype.slice.call(thing);
    }

    head(arr: Array<any>) {
        return arr[0];
    }

    tail(arr: Array<any>) {
        return this.toArray(arr).slice(1);
    }

    take(arr: Array<any>, num: number) {
        return this.toArray(arr).slice(0, num);
    }

    drop(arr: Array<any>, num: number) {
        return this.toArray(arr).slice(num, arr.length);
    }


    concat(head: Array<any>, tail: Array<any>) {
        return [head].concat(tail);
    }

    curry(fn: Function, ...Arguments: any[] ) {
        var args = this.tail(Arguments);
        return function() {
            return fn.apply(this, args.concat(this.toArray(Arguments)));
        };
    }

    foldr(fn: Function, init: Array<any>, xs: Array<any>): any {
        if (xs.length === 0) return init;
        return fn(this.head(xs), this.foldr(fn, init, this.tail(xs)));
    }

    foldl(fn: Function, init: Array<any>, xs: Array<any>) {
        if (xs.length === 0) return init;
        return fn(this.foldr(fn, init, this.tail(xs)), this.head(xs));
    }

    map(fn: Function, xs: Array<any>) {
        var m = function(head: Array<any>, tail: Array<any>) {
            return this.concat(fn(head), tail);
        };
        return this.foldr(m, [], xs);
    }

    filter(fn: Function, xs: Array<any>) {
        var f = function(head: Array<any>, tail: Array<any>) {
            if (fn(head)) return this.concat(head, tail);
            return tail;
        };
        return this.foldr(f, [], xs);
    }

    append(xs: Array<any>, ys: Array<any>) {
        return this.foldr(this.concat, ys, xs);
    }

    takeWhile(source: Array<any>, predicate: Function) {
      let i = 0;
      let result: Array<any> = new Array<any>();
      while(i < source.length){
          if(predicate(source[i],i)){
              result.push(source[i]);
          }
          i+=1;
      }
      return result;
    }

    dropWhile(source: Array<any>, predicate: Function) {
      let i = 0;
      let result: Array<any> = new Array<any>();
      while(i < source.length){
          if(!predicate(source[i],i)){
              result.push(source[i]);
          }
          i+=1;
      }
      return result;
    }


}
