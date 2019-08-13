#!/usr/bin/env node
'use strict';

var TempList = function() {
  this.n = 0;
  this.a = [];
  this.resize = function() {
    var b = new Array(this.n * 2);
    for (var i = 0; i < this.n; i++) {
      b[i] = this.a[i];
    }
    this.a = b;
  };
  this.add = function(x) {
    if (this.n >= this.a.length) this.resize();
    this.a[this.n + 1] = x;
    this.n++;
  };
  this.remove = function(i) {
    var x = this.a[i];
    for (var j = i; j < this.n - 1; j++) {
      this.a[j] = this.a[j + 1];
    }
    delete this.a[this.a.length - 1];
    this.n--;
    if (this.a.length >= 3 * this.n) this.resize();
    return x;
  };
  this.size = function() {
    return this.n;
  };
  this.get = function(i) {
    return this.a[i];
  };
};

var ChainedHashTable = function() {
  this.t = [new TempList()];
  this.n = 0;

  this.find = function(x) {
    var j = this.hash(x);
    for (var i = 0; i < this.t[j].size(); i++) {
      if (x === t[j].get(i)) {
        return t[j].get(i);
      }
    }
    return null;
  };

  this.resize = function() {
    var b = new Array(this.n * 2);
    for (var i = 0; i < this.n; i++) {
      b[i] = this.t[i];
    }
    this.t = b;
  };
  
  this.z = 123456789;
  this.d = 8;
  this.hashCode = function (x) {
    let h = 0;
      for (let i = 0, l = x.length; i < l; i++) {
        h = Math.imul(31, h) + x.charCodeAt(i) | 0;
      }
    return h;
  }
  this.hash = function(x) {
    return (this.z * this.hashCode(x)) >> (this.w - this.d); 
  };

  this.add = function(x) {
    if (this.find(x) !== null) return false;
    if (n + 1 > this.t.length) this.resize(x);
    this.t[this.hash(x)].add(x);
    this.n++;
    return true;
  }

  this.remove = function(x) {
    var j = this.hash(x);
    for (var i = 0 ; i < t[j].size(); i++) {
      var y = this.t[j].get(i);
      if (x === y) {
        t[j].remove(i);
        this.n--;
        return y;
      }
    }
    return null;
  }
};

var assert = require('assert');
function test() {
  var cht = new ChainedHashTable();
  console.log(cht.hash('a'));
	return
  cht.add('a');
  assert.notStrictEqual(cht.find('a'), null);
}
test();

module.exports = ChainedHashTable;
