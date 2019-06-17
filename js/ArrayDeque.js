#!/usr/bin/env node
/**
 * expect:
 * [a][b][c][d][e][f][g][h][ ][ ][ ][ ]
 * remove(2)
 * [ ][a][b][d][e][f][g][h][ ][ ][ ][ ]
 * add(4,x)
 * [ ][a][b][d][e][x][f][g][h][ ][ ][ ]
 * add(3,y)
 * [a][b][d][y][e][x][f][g][h][ ][ ][ ]
 * add(3,z)
 * [b][d][y][z][e][x][f][g][h][ ][ ][a]
 */
'use strict';

var ArrayDeque = function() {
  this.a = new Array(12);
  this.j = 0;
  this.n = 0;

  this.get = function(i) {
    return this.a[(this.j + i) % this.a.length];
  }

  this.set = function(i,x) {
    this.a[(this.j + this.i) % this.a.length] = x;
  }

  this.resize = function() {
    var b = [];
    b.length = this.n * 2;
    for (var k = 0; k < this.n; k++) {
      b[k] = this.a[(this.j + k) % this.a.length];
    }
    this.a = b;
    this.j = 0;
  }

  this.add = function(i, x) {
    if ((this.n + 1) >= this.a.length) this.resize();
    if (i < this.n / 2) {
      this.j = (this.j === 0) ? this.a.length - 1 : this.j - 1;
      for (var k = 0; k <= i - 1; k++) {
        this.a[(this.j + k) % this.a.length] = this.a[(this.j + k + 1) % this.a.length];
      }
    } else {
      for (var k = this.n; k > i; k--) {
        this.a[(this.j + k) % this.a.length] = this.a[(this.j + k - 1) % this.a.length];
      }
    }
    this.a[(this.j + i) % this.a.length] = x;
    this.n++;
  }

  this.remove = function(i) {
    var x = this.a[(this.j + i) % this.a.length];
    if (i < this.n / 2) {
      for (var k = i; k > 0; k--) {
        this.a[(this.j + k) % this.a.length] = this.a[(this.j + k - 1) % this.a.length];
      }
      delete this.a[this.j];
      this.j = (this.j + 1) % this.a.length;
    } else {
      for (var k = i; k < this.n - 1; k++) {
        this.a[(this.j + k) % this.a.length] = this.a[(this.j + k + 1) % this.a.length];
      }
    }
    this.n--;
    if (3 * this.n < this.a.length) this.resize();
    return x;
  }
 }

 var assert = require('assert');
 function test () {
   var ad = new ArrayDeque();
   ad.add(0, 'a');
   ad.add(1, 'b');
   ad.add(2, 'c');
   ad.add(3, 'd');
   ad.add(4, 'e');
   ad.add(5, 'f');
   ad.add(6, 'g');
   ad.add(7, 'h');
   assert.strictEqual(ad.get(3), 'd');
   assert.strictEqual(ad.j, 0);
   assert.strictEqual(ad.n, 8);
   ad.remove(2);
   assert.strictEqual(ad.get(3), 'e');
   assert.strictEqual(ad.j, 1);
   assert.strictEqual(ad.n, 7);
   ad.add(4, 'x');
   ad.add(3, 'y');
   ad.add(3, 'z'); // todo: unmatch for expect
   assert.strictEqual(ad.get(0), 'a');
   console.log('ok');
 }
//  test();

module.exports = ArrayDeque;