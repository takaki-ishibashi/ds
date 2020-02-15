#!/usr/bin/env node
'use strict';

var SomeList = function() {
  this.add = function(x) {};
  this.size = function() {
    return 3;
  }; // todo
  this.get = function() {};
  this.remove = function(i) {};
};
var ChainedHashTable = function() {
  this.t = []; // todo
  this.n = 0;
  this.find = function(x) {
    // todo
    var j = this.hash(x);
    for (var i = 0; i < this.t[j].size(); i++) {
      if (x === this.t[j].get(i)) {
	return this.t[j].get(i);
      }
    }
    return null;
  };
  this.resize = function() {};
  this.hash = function(x) {
    return 0; // todo
  };
  this.add = function(x) {
    if (this.find(x) !== null) return false;
    if (this.n + 1 > this.t.length) this.resize();
    if (this.t[this.hash(x)] === undefined) this.t[this.hash(x)] = new SomeList();
    this.t[this.hash(x)].add(x);
    this.n++;
    return true;
  };
  this.remove = function(x) {

    var j = this.hash(x);
    for (var i = 0; i < this.t[j].size(); i++) {
      var y = t[j].get(i);
      if (x === y) {
	this.t[j].remove(i);
	this.n--;
	return y;
      }
    }
    return null;
  };
};

var test = function() {
  var cht = new ChainedHashTable();
  // test for add() 
  if (cht.add(10) !== true) return;
  // test for find()
  if (cht.find(5) !== null) return;
  if (cht.find(10) !== 10) return;
  console.log('ok');
  };

test();

module.exports = ChainedHashTable; 
