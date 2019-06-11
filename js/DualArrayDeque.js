#!/usr/bin/env node
// reference: https://sites.google.com/view/open-data-structures-ja/home
/**
 * expect:
 *       <= front # back =>
 * [ ][ ][ ][a][b]#[c][d][ ][ ][ ]
 * add(3,x)
 * [ ][ ][ ][a][b]#[c][x][d][ ][ ]
 * add(4,y)
 * [ ][ ][ ][a][b]#[c][x][y][d][ ]
 * remove(0)
 * [ ][ ][ ][ ][b]#[c][x][y][d][ ]
 * [ ][ ][ ][b][c]#[x][y][d][ ][ ]
 */
'use strict';
var ArrayStack = function () {
  this.n = 0;
  this.a = new Array(2); // NOTE: this is anti-pattern for performance.
  this.size = function () {
    return this.n;
  }
  this.get = function (i) {
    return this.a[i];
  }
  this.resize = function () {
    var b = new Array(this.n*2);
    for (var i=0; i<this.n; i++) {
      b[i] = this.a[i];
    }
    this.a = b;
  }
  this.add = function (i, x) {
    if (this.n >= this.a.length) this.resize();
    for (var j=this.n; j>i; j--) {
      this.a[j] = this.a[j-1];
    }
    this.a[i] = x;
    this.n++;
  }
  this.remove = function(i) {
    var x = this.a[i];
    delete this.a[i];
    for (var j=i; j<(this.n-1); i++) {
      this.a[j] = this.a[j-1];
    }
    this.n--;
    if (this.a.lnegth >= (3*this.n)) this.resize();
    return x;
  }
}
var DualArrayDeque = function () {
  this.front = new ArrayStack();
  this.back = new ArrayStack();
  this.size = function() {
    return this.front.size() + this.back.size();
  }
  this.get = function(i) {
    if (i < this.front.size()) {
      return this.front.get(this.front.size() - 1 - i);
    } else {
      return this.back.get(i - this.front.size());
    }
  }
  this.set = function (i, x) {
    if (i < this.front.size()) {
      return this.front.set(this.front.size() - i, x);
    } else {
      this.back.set(i - this.front.size(), x);
    }
  }
  this.balance = function () {
    if (
      3*this.front.size() < this.back.size() 
      || 3*this.back.size() < this.front.size()
    ) {
      var n = this.front.size() + this.back.size();
      var nf = Math.trunc(n/2);
      var af = new Array(nf);
      for (var i=0; i<nf; i++) {
        af[nf-i-1]=this.get(i);
      }
      var nb = n - nf;
      var ab = new Array(2*nb);
      for( var i=0; i<nb; i++) {
        ab[i] = this.get(nf+i);
      }
      this.front.a = af;
      this.front.n = nf;
      this.back.a = ab;
      this.back.n = nb;
    }
  }
  this.add = function (i, x) {
    if (i < this.front.size()) {
      this.front.add(this.front.size() - i, x);
    } else {
      this.back.add(i-this.front.size(), x);
    }
    this.balance();
  }
  this.remove = function (i) {
    var x;
    if (i < this.front.size()) {
      x = this.front.remove(this.front.size() - i - 1);
    } else {
      x = this.back.remove(i - this.front.size());
    }
    this.balance();
    return x;
  }
};

var test = function() {
  var dadt = new DualArrayDeque();
  dadt.front.add(0,'b');
  dadt.front.add(1,'a');
  dadt.back.add(0,'c');
  dadt.back.add(1,'d');
  dadt.add(3,'x');
  dadt.add(4,'y');
  dadt.remove(0);
  if (
    dadt.get(0) !== 'b'
    || dadt.get(1) !== 'c'
    || dadt.get(2) !== 'x'
    || dadt.get(3) !== 'y'
    || dadt.get(4) !== 'd'
  ) {
    console.log('NG');
  } else {
    console.log('OK')
  }
}

// run
var dad = new DualArrayDeque();
dad.front.add(0,'b');
dad.front.add(1,'a');
dad.back.add(0,'c');
dad.back.add(1,'d');
console.log([...dad.front.a].reverse(), [...dad.back.a]);
dad.add(3,'x');
dad.add(4,'y');
console.log([...dad.front.a].reverse(), [...dad.back.a]);
dad.remove(0)
console.log([...dad.front.a].reverse(), [...dad.back.a]);