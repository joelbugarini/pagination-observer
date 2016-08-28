/*Code adapted from kottenator https://gist.github.com/kottenator/9d936eb3e4e3c3e02598*/
export default class Pagination {
        current: number;
        last: number;
        delta: number;
        left: number;
        right: number;
        range: Array<number>;
        rangeWithDots: Array<string>;
        l: number;

        constructor(current: number, size: number){
            this.current = current;
            this.last = size;
            this.delta = 2;
            this.left = this.current - this.delta;
            this.right = this.current + this.delta + 1;
            this.range = [];
            this.rangeWithDots = [];
        }

        getCurrent(current: number){
            this.current = current;
            for (let i = 1; i <= this.last; i++) {
                if (i == 1 || i == this.last || i >= this.left && i < this.right) {
                    this.range.push(i);
                }
            }

            for (let i of this.range) {
                if (this.l) {
                    if (i - this.l === 2) {
                        this.rangeWithDots.push(String(this.l + 1));
                    } else if (i - this.l !== 1) {
                        this.rangeWithDots.push(this.range[this.range.length-1]==i?'»':'«');
                    }
                }
                this.rangeWithDots.push(String(i));
                this.l = i;
            }
        }
}
