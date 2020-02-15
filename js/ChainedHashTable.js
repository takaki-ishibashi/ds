#!/usr/bin/env node
/**
 * ChainedHashTable.js
 * Created on: 2019-08-16
 * Autohr: Takaki.Ishibashi
 * Restriction: number of list element <= length of hash table
 */
'use strict';

var SomeList = function() {
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
  this.t = [new SomeList()];
  this.n = 0;

  this.find = function(x) {
    var j = this.hash(x);
    if (this.t[j] !== undefined) {
     for (var i = 0; i < this.t[j].size(); i++) {
       if (x === this.t[j].get(i)) {
         return this.t[j].get(i);
       }
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

  this.z = 4102541685;
  this.d = 8;
  this.w = 32;
  this.hashCode = function (x) {
    var hc = 0;
    for (var i = 0, l = x.length; i < l; i++) {
      hc = Math.imul(31, hc) + x.charCodeAt(i) | 0;
    }
    return hc;
  }

  /**
   * Create the index for the list
   * @param {string} x - data before hashed
   * @return {integer} - number of integer after hashed
   */
  this.hash = function(x) {
    return Math.trunc(((this.z * this.hashCode(x)) % Math.pow(2, this.w)) / Math.pow(2, (this.w - this.d)));
    // return (this.z * this.hashCode(x)) >> (this.w - this.d);
  };

  this.add = function(x) {
    if (this.find(x) !== null) return false;
    if (this.n + 1 > this.t.length) this.resize(x);
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
  assert.strictEqual(cht.add('a'), true);
  return console.log('ok');
}
test();

module.exports = ChainedHashTable;
