'use strict';
var ArrayStack = function () {
  this.n = 0;
  this.a = [];
  this.a.length = 5;
  
  this.size = function () {
    return this.n;
  }
  
  this.get = function (i) {
    return this.a[i];
  }
  
  this.set = function (i, x) {
    if (0 <= i && i < (this.a.length - 1)) {
      var y = this.a[i];
      this.a[i] = x;
      return y;
    }
  }

  this.resize = function () {
    var b = [];
    b.length = this.n * 2;
    for (var i=0; i<this.n; i++) {
      b[i] = this.a[i];
    }
    this.a = b;
  }

  this.add = function (i, x) {
    if ((this.n+1) >= this.a.length) this.resize();
    for (var j=this.n; j>i; j--) {
      this.a[j] = this.a[j-1];
    }
    this.a[i] = x;
    this.n++;
  }

  this.remove = function(i) {
    var x = this.a[i];
    for (var j=i; j<(this.n-1); j++) {
      this.a[j] = this.a[j+1];
    }
    this.n--
    if (this.length >= (3*this.n)) resize();
    return x;
  }
}