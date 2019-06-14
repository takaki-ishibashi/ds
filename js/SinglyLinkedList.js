#!/usr/bin/env node
'use strict';
/**
 * expect:
 * [a][*]->[b][*]->[c][*]->[d][*]->[e][ ]
 * add(x)
 * [a][*]->[b][*]->[c][*]->[d][*]->[e][*]->[x][ ]
 * remove()
 * [b][*]->[c][*]->[d][*]->[e][*]->[x][ ]
 * pop()
 * [c][*]->[d][*]->[e][*]->[x][ ]
 * push(y)
 * [y][*]->[c][*]->[d][*]->[e][*]->[x][ ]
 */
var assert = require('assert');

var Node = function (y) {
  this.x = y;
  this.next = null;
}

var SinglyLinkedList = function () {
  this.head;
  this.tail;
  this.n = 0;

  this.push = function (x) {
    var u = new Node(x);
    u.next = this.head;
    this.head = u;
    if (this.n == 0) this.tail = u;
    this.n++;
    return x;
  };
  
  this.add = function (x) {
    var u = new Node(x);
    if (this.n === 0) {
      this.head = u;
    } else {
      this.tail.next = u;
    }
    this.tail = u;
    this.n++;
    return true;
  }
  
  this.remove = function () {
    if (this.n === 0) return null;
    var x = this.head.x;
    var u = this.head;
    this.head = this.head.next;
    // delete u;
    if (--this.n === 0) this.tail = null
    return x;
  }
  
  this.pop = function () {
    this.remove();
  }
};

function test () {
  var sll = new SinglyLinkedList();
  sll.push('e')
  sll.push('d')
  sll.push('c')
  sll.push('b')
  sll.push('a')
  assert.strictEqual(sll.head.x, 'a');
  sll.add('x');
  assert.strictEqual(sll.tail.x, 'x');  
  sll.remove();
  assert.strictEqual(sll.head.x, 'b');
  sll.pop();
  assert.strictEqual(sll.head.x, 'c');
}
// test();

module.exports = SinglyLinkedList;