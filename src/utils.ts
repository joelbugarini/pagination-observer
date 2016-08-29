export default class Utils {
    constructor(){}
    nextTo(target: HTMLElement,element: HTMLElement){
        target.parentNode.insertBefore(element, target.nextSibling);
    }

    toArray(thing: any) {
        if (Array.isArray(thing)) return thing;
        return Array.prototype.slice.call(thing);
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
