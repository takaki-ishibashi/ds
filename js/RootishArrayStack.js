#!/usr/bin/env node
/**
 * expect:
 * [ ] [ ] [ ] [ ] [ ] [ ]
 * add(0,a)
 * [a] [ ] [ ] [ ] [ ] [ ]
 * add(1,b)
 * [a] [b] [ ] [ ] [ ] [ ] 
 * add(2,c)
 * [a] [b,c] [ ] [ ] [ ] [ ]
 * add(3,d)
 * [a] [b,c] [d] [ ] [ ] [ ]
 * add(4,e)
 * [a] [b,c] [d,e] [ ] [ ] [ ]
 * add(5,f)
 * [a] [b,c] [d,e,f] [ ] [ ] [ ]
 * remove(0)
 * [b] [c,d] [e,f,f] [ ] [ ] [ ]
 * remove(0)
 * [c] [d,e] [f,f,f] [ ] [ ] [ ]
 * remove(0)
 * [d] [e,f] [f,f,f] [ ] [ ] [ ]
 * remove(0)
 * [e] [f,f] [f,f,f] [ ] [ ] [ ]
 * remove(0)
 * [f] [f,f] [ ] [ ] [ ] [ ]
 */
'use strict';
var ArrayStack = require('./ArrayStack');
var assert = require('assert');

var RootishArrayStack = function () {
  this.blocks = new ArrayStack();
  this.n = 0;

  this.i2b = function (i) {
    var db = (-3.0 + Math.sqrt(9 + 8 * i)) / 2.0;
    var b = Math.ceil(db);
    return b;
  }

  this.get = function (i) {
    var b = this.i2b(i);
    var j = i - b*(b+1)/2;
    return this.blocks.get(b)[j];
  }

  this.set = function (i, x) {
    var b = this.i2b(i);
    var j = i - b*(b+1)/2;
    var y = this.blocks.get(b)[j];
    this.blocks.get(b)[j] = x;
    return y;
  }

  this.grow = function () {
    this.blocks.add(this.blocks.size(), new Array(this.blocks.size+1));
  }

  this.add = function (i, x) {
    var r = this.blocks.size();
    if (r*(r+1)/2 < this.n + 1) this.grow();
    this.n++;
    for (var j=this.n-1; j>i; j--) {
      this.set(j, this.get(j-1));
    }
    this.set(i, x);
  }

  this.shrink = function () {
    var r = this.blocks.size();
    while (r > 0 && (r-2)*(r-1)/2 >= this.n) {
      this.blocks.remove(this.blocks.size()-1);
      r--;
    }
  }

  this.remove = function (i) {
    var x = this.get(i);
    for (var j=i; j<this.n-1; j++) {
      this.set(j, this.get(j+1));
    }
    this.n--;
    var r = this.blocks.size();
    if ((r-2)*(r-1)/2 >= this.n) this.shrink();
    return x;
  }
};

function test() {
  var ras = new RootishArrayStack();
  ras.add(0,'a');
  ras.add(1,'b');
  ras.add(2,'c');
  ras.add(3,'d');
  ras.add(4,'e');
  ras.add(5,'f');
  assert.strictEqual(ras.get(0), 'a');
  assert.strictEqual(ras.get(1), 'b');
  assert.strictEqual(ras.get(2), 'c');
  assert.strictEqual(ras.get(3), 'd');
  assert.strictEqual(ras.get(4), 'e');
  assert.strictEqual(ras.get(5), 'f');
  ras.remove(0);
  ras.remove(0);
  ras.remove(0);
  ras.remove(0);
  ras.remove(0);
  assert.strictEqual(ras.get(2), 'f');
  assert.strictEqual(ras.get(0), 'f');
  assert.strictEqual(ras.get(1), 'f');
  assert.strictEqual(ras.get(2), 'f');
  console.log('ok')
}

// test();

module.exports = RootishArrayStack;