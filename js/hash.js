'use strict'
function main(s) {
  var h = 0;
  var s = s;
  var hc = 0;
  for (var i=0,l=s.length; i<l; i++)  {
    hc = Math.imul(31, hc) + s.charCodeAt(i) | 0;
  }

  var w = 32;
  var d = 8;
  var z = 4102541685;
 h = (z * hc) >>> (w - d);
  // h = Math.trunc(((z * hc) % Math.pow(2, w)) / Math.pow(2,(w-d)));
  return h;
}
console.log(main('42'));
