/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var pagination_ts_1 = __webpack_require__(1);
	var table_ts_1 = __webpack_require__(2);
	var utils_ts_1 = __webpack_require__(3);
	var o = new utils_ts_1.default();
	var current = "1";
	var show = 4;
	var paginator = document.createElement("ul");
	var inputCurrent = document.createElement("input");
	function Main() {
	    var element = document.getElementById("po");
	    var table = new table_ts_1.default(element);
	    CurrentDOM(element);
	    var isBetween = function (x) { return table.tr.indexOf(x) >= ((+current * show) - show) && table.tr.indexOf(x) < +current * show; };
	    //Show tr's
	    o.dropWhile(table.tr, isBetween).forEach(function (row) {
	        row.style.color = "red";
	        row.style.display = "none";
	    });
	    o.takeWhile(table.tr, isBetween).forEach(function (row) {
	        row.style.color = "black";
	        row.style.display = "table-row";
	    });
	    var p = new pagination_ts_1.default(+current, Math.ceil(table.tr.length / show));
	    PaginationDOM(p, element);
	}
	Main();
	function CurrentDOM(element) {
	    var table = new table_ts_1.default(element);
	    inputCurrent.style.display = "none";
	    inputCurrent.type = "text";
	    inputCurrent.className = "current";
	    inputCurrent.value = current;
	    o.nextTo(element, inputCurrent);
	    var isBetween = function (x) { return table.tr.indexOf(x) >= ((+current * show) - show) && table.tr.indexOf(x) < +current * show; };
	    inputCurrent.onchange = function () {
	        current = this.value;
	        o.dropWhile(table.tr, isBetween).forEach(function (row) {
	            row.style.color = "red";
	            row.style.display = "none";
	        });
	        o.takeWhile(table.tr, isBetween).forEach(function (row) {
	            row.style.color = "black";
	            row.style.display = "table-row";
	        });
	        paginator.parentElement.removeChild(paginator);
	        paginator.innerHTML = "";
	        var p = new pagination_ts_1.default(+current, Math.ceil(table.tr.length / show));
	        PaginationDOM(p, element);
	    };
	}
	function PaginationDOM(p, table) {
	    p.getCurrent(1);
	    paginator.className = "pagination pull-right";
	    p.rangeWithDots.forEach(function (e) {
	        var li = document.createElement("li");
	        if (e == current)
	            li.className = "active";
	        li.style.cursor = "pointer";
	        var a = document.createElement("a");
	        li.appendChild(a);
	        var text = document.createTextNode(e);
	        a.appendChild(text);
	        paginator.appendChild(li);
	        li.onclick = function () {
	            var move = 0;
	            if (e == '»') {
	                move = +current + 2;
	            }
	            if (e == '«') {
	                move = +current - 2;
	            }
	            inputCurrent.value = String((e == '»' || e == '«') ? move : e);
	            inputCurrent.onchange(this);
	        };
	    });
	    o.nextTo(table, paginator);
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	/*Code adapted from kottenator https://gist.github.com/kottenator/9d936eb3e4e3c3e02598*/
	var Pagination = (function () {
	    function Pagination(current, size) {
	        this.current = current;
	        this.last = size;
	        this.delta = 2;
	        this.left = this.current - this.delta;
	        this.right = this.current + this.delta + 1;
	        this.range = [];
	        this.rangeWithDots = [];
	    }
	    Pagination.prototype.getCurrent = function (current) {
	        this.current = current;
	        for (var i = 1; i <= this.last; i++) {
	            if (i == 1 || i == this.last || i >= this.left && i < this.right) {
	                this.range.push(i);
	            }
	        }
	        for (var _i = 0, _a = this.range; _i < _a.length; _i++) {
	            var i = _a[_i];
	            if (this.l) {
	                if (i - this.l === 2) {
	                    this.rangeWithDots.push(String(this.l + 1));
	                }
	                else if (i - this.l !== 1) {
	                    this.rangeWithDots.push(this.range[this.range.length - 1] == i ? '»' : '«');
	                }
	            }
	            this.rangeWithDots.push(String(i));
	            this.l = i;
	        }
	    };
	    return Pagination;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Pagination;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var Table = (function () {
	    function Table(table) {
	        this.table = table;
	        this.tr = [].slice.call(this.table.getElementsByTagName("tr"));
	    }
	    return Table;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Table;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var Utils = (function () {
	    function Utils() {
	    }
	    Utils.prototype.nextTo = function (target, element) {
	        target.parentNode.insertBefore(element, target.nextSibling);
	    };
	    Utils.prototype.toArray = function (thing) {
	        if (Array.isArray(thing))
	            return thing;
	        return Array.prototype.slice.call(thing);
	    };
	    Utils.prototype.head = function (arr) {
	        return arr[0];
	    };
	    Utils.prototype.tail = function (arr) {
	        return this.toArray(arr).slice(1);
	    };
	    Utils.prototype.take = function (arr, num) {
	        return this.toArray(arr).slice(0, num);
	    };
	    Utils.prototype.drop = function (arr, num) {
	        return this.toArray(arr).slice(num, arr.length);
	    };
	    Utils.prototype.concat = function (head, tail) {
	        return [head].concat(tail);
	    };
	    Utils.prototype.curry = function (fn) {
	        var Arguments = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            Arguments[_i - 1] = arguments[_i];
	        }
	        var args = this.tail(Arguments);
	        return function () {
	            return fn.apply(this, args.concat(this.toArray(Arguments)));
	        };
	    };
	    Utils.prototype.foldr = function (fn, init, xs) {
	        if (xs.length === 0)
	            return init;
	        return fn(this.head(xs), this.foldr(fn, init, this.tail(xs)));
	    };
	    Utils.prototype.foldl = function (fn, init, xs) {
	        if (xs.length === 0)
	            return init;
	        return fn(this.foldr(fn, init, this.tail(xs)), this.head(xs));
	    };
	    Utils.prototype.map = function (fn, xs) {
	        var m = function (head, tail) {
	            return this.concat(fn(head), tail);
	        };
	        return this.foldr(m, [], xs);
	    };
	    Utils.prototype.filter = function (fn, xs) {
	        var f = function (head, tail) {
	            if (fn(head))
	                return this.concat(head, tail);
	            return tail;
	        };
	        return this.foldr(f, [], xs);
	    };
	    Utils.prototype.append = function (xs, ys) {
	        return this.foldr(this.concat, ys, xs);
	    };
	    Utils.prototype.takeWhile = function (source, predicate) {
	        var i = 0;
	        var result = new Array();
	        while (i < source.length) {
	            if (predicate(source[i], i)) {
	                result.push(source[i]);
	            }
	            i += 1;
	        }
	        return result;
	    };
	    Utils.prototype.dropWhile = function (source, predicate) {
	        var i = 0;
	        var result = new Array();
	        while (i < source.length) {
	            if (!predicate(source[i], i)) {
	                result.push(source[i]);
	            }
	            i += 1;
	        }
	        return result;
	    };
	    return Utils;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Utils;


/***/ }
/******/ ]);