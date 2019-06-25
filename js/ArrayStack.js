#!/usr/bin/env node
'use strict';
/**
 * expect:
 * [b][r][e][d][ ]
 * add(2, e)
 * [b][r][e][e][d][ ]
 * add(5,r)
 * [b][r][e][e][d][r]
 * add(5, e)
 * resize()
 * [b][r][e][e][d][r][ ][ ][ ][ ][ ][ ]
 * [b][r][e][e][d][e][r][ ][ ][ ][ ][ ]
 * remove(4)
 * [b][r][e][e][e][r][ ][ ][ ][ ][ ][ ]
 * remove(4)
 * [b][r][e][e][r][ ][ ][ ][ ][ ][ ][ ]
 * remove(4)
 * [b][r][e][e][ ][ ][ ][ ][ ][ ][ ][ ]
 * resize()
 * [b][r][e][e][ ][ ][ ][ ]
 * set(2, i)
 * [b][r][i][e][ ][ ][ ][ ]
 */
var assert = require('assert');
var ArrayStack = function () {
  this.n = 0; // number of element
  this.a = new Array(6); // initial length of the list

  this.size = function () {
    return this.n;
  }
  
  this.get = function (i) {
    return this.a[i];
  }
  
  this.set = function (i, x) {
    if (0 <= i && i < (this.a.length - 1)) {
      var y = this.a[i];
      this.a[i] = x;
      return y;
    }
  }

  this.resize = function () {
    var b = [];
    b.length = this.n*2;
    for (var i=0; i<this.n; i++) {
      b[i] = this.a[i];
    }
    this.a = b;
  }

  this.add = function (i, x) {
    // if ((this.n + 1) >= this.a.length) this.resize(); // todo
    if (this.n >= this.a.length) this.resize();
    for (var j = this.n; j > i; j--) { // 末尾に新規要素を追加して、１つ前の要素を後ろの要素にシフト
      this.a[j] = this.a[j-1]; // resizeを無視するとO(n-i)
    }
    this.a[i] = x;
    this.n++;
  }

  this.remove = function (i) {
    var x = this.a[i];
    for (var j = i; j < (this.n - 1); j++) { // １つ前の要素に後ろの要素をシフト
      this.a[j] = this.a[j + 1]; // O(n-i)
    }
    this.n--
    if (this.a.length >= (3 * this.n)) this.resize();
    return x;
  }
}

function test() {
  var as = new ArrayStack();
  as.add(0, 'b');
  as.add(1, 'r');
  as.add(2, 'e');
  as.add(3, 'd');
  assert.strictEqual(as.size(), 4);
  as.add(2, 'e');
  as.add(5, 'r');
  as.add(5, 'e');
  assert.strictEqual(as.get(5), 'e');
  as.remove(4);  
  as.remove(4);  
  as.remove(4);  
  assert.strictEqual(as.get(4), undefined);
  assert.strictEqual(as.a.length, 8);
  as.set(2, 'i');
  assert.strictEqual(as.get(2), 'i');
}
// test();

module.exports = ArrayStack;