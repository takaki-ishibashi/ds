// Array Stack IF
'use strict';
var a = [];
var n = 0;

function size() {
  return n;
}
function get(i) {
  return a[i];
}
function set(i, x) {
  if (0 <= i && i < (a.length - 1)) {
    var y = a[i];
    a[i] = x;
    return y;
  }
}
function resize() {
  var b = [];
  b.length = n * 2;
  for (var i = 0; i < n; i++) {
    b[i] = a[i];
  }
  a = b;
}
function add(i, x) {
  if (n + 1 >= a.length) resize();
  for (var j = n; j > i; j--) {
    a[j] = a[j - 1];
  }
  a[i] = x;
  n++;
}
function remove(i) {
  var x = a[i];
  for (var j = i; j < (n - 1); j++) {
    a[j] = a[j + 1];
  }
  n--;
  return x;
}