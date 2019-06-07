#!/usr/bin/env node
/**
 * expect:
 * [ ][ ][a][b][c][ ]
 * add(d)
 * [ ][ ][a][b][c][d]
 * add(e)
 * [e][ ][a][b][c][d]
 * remove()
 * [e][ ][ ][b][c][d]
 * add(f)
 * [e][f][ ][b][c][d]
 * add(g)
 * [e][f][g][b][c][d]
 * add(h)
 * [b][c][d][e][f][g][h][ ][ ][ ][ ][ ]
 * remove()
 * [ ][c][d][e][f][g][h][ ][ ][ ][ ][ ]
 */
'use strict';
var ArrayQueue = function () {
  this.a = [];
  this.a.length = 6;
  this.n = 0; // number of element
  this.j = 0; // index of tracking

  this.add = function (x) {
    // if (this.n+1 >= this.a.length) this.resize(); // todo
    if (this.n >= this.a.length) this.resize();
    this.a[(this.j+this.n) % this.a.length] = x;
    this.n++;
    return true;
  }
  
  this.remove = function () {
    var x = this.a[this.j];
    delete this.a[this.j];
    this.j = (this.j+1) % this.a.length;
    this.n--;
    if (this.a.length >= 3*this.n) this.resize();
    return x;
  }
  
  this.resize = function () {
    var b = [];
    b.length = this.n * 2;
    for (var k=0; k<this.n; k++) {
      b[k] = this.a[(this.j+k) % this.a.length]
    }
    this.a = b;
    this.j = 0;
  }
}

// run
var aq = new ArrayQueue();
aq.add('x');
aq.add('x');
aq.add('a');
aq.add('b');
aq.add('c');
aq.remove();
aq.remove();
console.log(aq.a, aq.n, aq.j);
aq.add('d');
aq.add('e');
aq.remove();
aq.add('f');
aq.add('g');
aq.add('h');
console.log(aq.a, aq.n, aq.j);
aq.remove();
console.log(aq.a, aq.n, aq.j);