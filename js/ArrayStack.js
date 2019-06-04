'use strict';
const ArrayStack = function () {
  this.n = 0; // number of element
  this.a = [];
  this.a.length = 5; // initial length of the list
  
  this.size = function () {
    return this.n;
  }
  
  this.get = function (i) {
    return this.a[i];
  }
  
  this.set = function (i, x) {
    if (0 <= i && i < (this.a.length - 1)) {
      let y = this.a[i];
      this.a[i] = x;
      return y;
    }
  }

  this.resize = function () {
    let b = [];
    b.length = this.n * 2;
    for (let i = 0; i < this.n; i++) {
      b[i] = this.a[i];
    }
    this.a = b;
  }

  this.add = function (i, x) {
    if ((this.n + 1) >= this.a.length) this.resize();
    for (let j = this.n; j > i; j--) { // 末尾に新規要素を追加して、１つ前の要素を後ろの要素にシフト
      this.a[j] = this.a[j-1]; // resizeを無視するとO(n-i)
    }
    this.a[i] = x;
    this.n++;
  }

  this.remove = function(i) {
    let x = this.a[i];
    for (let j = i; j < (this.n - 1); j++) { // １つ前の要素に後ろの要素をシフト
      this.a[j] = this.a[j + 1]; // O(n-i)
    }
    this.n--
    if (this.a.length >= (3 * this.n)) this.resize();
    return x;
  }
}

let as = new ArrayStack();
as.add(0,2)
as.add(1,5)
as.add(2,1)
as.get(1)
console.log(as.size())
as.remove(1)