#!/usr/bin/env node
'use strict';
var ArrayQueue = function () {
  this.a = [];
  this.a.length = 5;
  this.n = 0;
  this.j = 0; // tracking index

  this.add = function (x) {
    if (this.n+1 >= this.a.length) this.resize();
    this.a[(this.j+this.n) % this.a.length] = x;
    this.n++;
    return true;
  }
  
  this.remove = function () {
    var x = this.a[this.j];
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

var aq = new ArrayQueue();
console.log(aq.add(1))
console.log(aq.add(2))
console.log(aq.add(3))
console.log(aq.add(4))
console.log(aq.a, aq.n, aq.j)
console.log(aq.add(5))
console.log(aq.a, aq.n, aq.j)
aq.remove()
console.log(aq.a, aq.n, aq.j)
console.log(aq.add(6))
console.log(aq.add(7))
console.log(aq.a, aq.n, aq.j)
aq.remove()
aq.remove()
aq.remove()
aq.remove()
console.log(aq.a, aq.n, aq.j)