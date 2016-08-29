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
	var builder_ts_1 = __webpack_require__(4);
	var utils_ts_1 = __webpack_require__(3);
	var o = new utils_ts_1.default();
	function Main() {
	    var tables;
	    tables = o.toArray(document.getElementsByClassName("pagination-observer"));
	    tables.forEach(function (table) {
	        var builder = new builder_ts_1.default(table);
	        builder.hideRows();
	        builder.createCurrentInput();
	        builder.eventCurrentInput();
	        builder.createPagination();
	        builder.observe();
	    });
	}
	Main();


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
	        this.thead = [].slice.call(this.table.getElementsByTagName("thead"));
	        this.tbody = [].slice.call(this.table.getElementsByTagName("tbody"));
	        this.tr = [].slice.call(this.tbody[0].children);
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var pagination_ts_1 = __webpack_require__(1);
	var table_ts_1 = __webpack_require__(2);
	var utils_ts_1 = __webpack_require__(3);
	var o = new utils_ts_1.default();
	var Builder = (function () {
	    function Builder(table) {
	        this.current = table.dataset.current || "1";
	        this.show = table.dataset.show || 5;
	        this.ul_paginator = document.createElement("ul");
	        this.input_current = document.createElement("input");
	        this.dom_table = table;
	        this.table = new table_ts_1.default(this.dom_table);
	        this.observer = new MutationObserver(this.tableUpdate.bind(this));
	        this.observerConfig = { attributes: true, childList: true, characterData: true };
	    }
	    Builder.prototype.tableUpdate = function (mutations) {
	        var _this = this;
	        mutations.forEach(function (mutation) {
	            if (mutation.addedNodes[0]) {
	                if (mutation.addedNodes[0].tagName == "TR")
	                    _this.table.tr.push(mutation.addedNodes[0]);
	                _this.hideRows();
	                _this.ul_paginator.parentElement.removeChild(_this.ul_paginator);
	                _this.ul_paginator.innerHTML = "";
	                _this.createPagination();
	            }
	        });
	    };
	    Builder.prototype.observe = function () {
	        this.observer.observe(this.table.tbody[0], this.observerConfig);
	    };
	    Builder.prototype.createCurrentInput = function () {
	        this.input_current.style.display = "none";
	        this.input_current.type = "text";
	        this.input_current.className = "current";
	        this.input_current.value = this.current;
	        o.nextTo(this.dom_table, this.input_current);
	    };
	    Builder.prototype.eventCurrentInput = function () {
	        var that = this;
	        this.input_current.onchange = function () {
	            that.current = this.value;
	            that.hideRows();
	            that.ul_paginator.parentElement.removeChild(that.ul_paginator);
	            that.ul_paginator.innerHTML = "";
	            var p = new pagination_ts_1.default(+that.current, Math.ceil(that.table.tr.length / that.show));
	            that.createPagination();
	        };
	    };
	    Builder.prototype.hideRows = function () {
	        var _this = this;
	        var isBetween = function (x) { return _this.table.tr.indexOf(x) >= ((+_this.current * _this.show) - _this.show) && _this.table.tr.indexOf(x) < +_this.current * _this.show; };
	        o.dropWhile(this.table.tr, isBetween).forEach(function (row) {
	            row.style.color = "red";
	            row.style.display = "none";
	        });
	        o.takeWhile(this.table.tr, isBetween).forEach(function (row) {
	            row.style.color = "black";
	            row.style.display = "table-row";
	        });
	    };
	    Builder.prototype.createPagination = function () {
	        var _this = this;
	        var pag = new pagination_ts_1.default(+this.current, Math.ceil(this.table.tr.length / this.show));
	        pag.getCurrent(+this.current);
	        this.ul_paginator.className = "pagination pull-right";
	        this.ul_paginator.style.display = "visible";
	        pag.rangeWithDots.forEach(function (e) {
	            var li = document.createElement("li");
	            if (e == _this.current)
	                li.className = "active";
	            li.style.cursor = "pointer";
	            var a = document.createElement("a");
	            li.appendChild(a);
	            var text = document.createTextNode(e);
	            a.appendChild(text);
	            _this.ul_paginator.appendChild(li);
	            li.onclick = function (f) {
	                var move = 0;
	                if (e == '»') {
	                    move = +_this.current + 2;
	                }
	                if (e == '«') {
	                    move = +_this.current - 2;
	                }
	                _this.input_current.value = String((e == '»' || e == '«') ? move : e);
	                _this.input_current.onchange(f);
	            };
	        });
	        o.nextTo(this.dom_table, this.ul_paginator);
	    };
	    return Builder;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Builder;


/***/ }
/******/ ]);