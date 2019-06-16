#!/usr/bin/env node
'use strict';
var Node = function (x) {
  this.x = x;
  this.next;
  this.prev;
}
var DoublyLinkedList = function () {
  this.dummy = new Node();
  this.dummy.next = this.dummy;
  this.dummy.prev = this.dummy;
  this.n = 0;

  this.getNode = function(i) {
    var target;
    if (i < this.n/2) { // 先頭から進む、探すわけじゃない
      target = this.dummy.next;
      for (var j=0; j<i; j++) {
        target = target.next;
      }
    } else {
      target = this.dummy;
      for (var j=this.n; j>i; j--) {
        target = target.prev;
      }
    }
    return target;
  }

  this.addBefore = function (w, x) { // なぜかノードはu/wが通例、wはuの直後のノード
    var u = new Node();
    u.x = x;
    u.next = w;
    u.prev = w.prev;
    u.prev.next = u;
    u.next.prev = u;
    this.n++;
    return u;
  }

  this.add = function (i, x) {
    this.addBefore(this.getNode(i), x);
  }

  this.get = function (i) {
    return this.getNode(i).x;
  }

  this.set = function (i, x) {
    var u = this.getNode(i);
    var y = u.x;
    u.x = x;
    return y;
  }

  this.removeBefore = function (w) {
    w.prev.next = w.next;
    w.next.prev = w.prev;
    this.n--;
  }

  this.remove = function (i) {
    var w = this.getNode(i);
    var x = w.x;
    this.removeBefore(w);
    return x;
  }
}

var assert = require('assert');
function test () {
  var dll = new DoublyLinkedList();
  dll.add(0, 10);
  dll.add(1, 20);
  dll.add(2, 30);
  assert.strictEqual(dll.get(1), 20);
  dll.set(1, 40);
  assert.strictEqual(dll.get(1), 40);
  dll.remove(1);
  assert.strictEqual(dll.get(1), 30);
}
// test();

module.exports = DoublyLinkedList;