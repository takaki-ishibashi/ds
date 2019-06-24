#!/usr/bin/env node
'use strict';
/**
 * expect:
 *  note: 'height' field is not always same on each Node.
 * [ ][ ][*]
 * add(0,0)
 *    [1][*]---->[ ][*]
 *    [1][*]---->[ ][*]
 *    [1][*]---->[ ][*]
 * [ ][1][*]->[0][ ][*]
 * add(1,1)
 *    [1][*]---->[ ][*]
 *    [1][*]---->[ ][*]
 *    [1][*]---->[ ][*]
 * [ ][1][*]->[0][1][*]->[1][ ][*]
 * add(2,12)
 *    [1][*]---->[ ][*]
 *    [1][*]---->[ ][*]
 *    [1][*]---->[ ][*]
 * [ ][1][*]->[0][1][*]->[1][1][*]->[12][ ][*]
 * add(3,3)
 *    [1][*]---->[ ][*]
 *    [1][*]---->[ ][*]
 *    [1][*]---->[3][*]--------------------------->[ ][*]
 * [ ][1][*]->[0][1][*]->[1][1][*]->[12][1][*]->[3][ ][*]
 * add(4,4)
 *    [1][*]---->[ ][*]
 *    [1][*]---->[ ][*]
 *    [1][*]---->[3][*]--------------------------->[ ][*]
 * [ ][1][*]->[0][1][*]->[1][1][*]->[12][1][*]->[3][1][*]->[4][ ][*]
 * add(5,15)
 *    [1][*]---->[ ][*]
 *    [1][*]---->[ ][*]
 *    [1][*]---->[3][*]--------------------------->[ ][*]
 * [ ][1][*]->[0][1][*]->[1][1][*]->[12][1][*]->[3][1][*]->[4][1][*]->[15][ ][*]
 * add(6,6)
 *    [1][*]---->[ ][*]
 *    [1][*]---->[ ][*]
 *    [1][*]---->[3][*]--------------------------->[ ][*]
 * [ ][1][*]->[0][1][*]->[1][1][*]->[12][1][*]->[3][1][*]->[4][1][*]->[15][1][*]->[6][ ][*]
 * remove(3)
 *    [1][*]---->[ ][*]
 *    [1][*]---->[ ][*]
 *    [1][*]---->[ ][*]
 * [ ][1][*]->[0][1][*]->[1][1][*]->[12][1][*]->[4][1][*]->[15][1][*]->[6][ ][*]
 */

var Node = function (x, height) {
  this.x = x;
  this.height = height;
  this.length = []; // 次のノードまでの距離の配列
  this.next = [];
};

var SkiplistList = function () {
  this.sentinel = new Node(undefined, undefined);
  this.h = 0;

  this.findPred = function (i) {
    var u = this.sentinel;
    var r = this.h;
    var j = -1;
    while (r >= 0) {
      while (u.next[r] !== undefined && j + u.length[r] < i) {
        j += u.length[r];
        u = u.next[r];
      }
      r--;
    }
    return u;
  }

  this.get = function (i) {
    return this.findPred(i).next[0].x;
  }

  this.set = function (i, x) {
    var u = this.findPred(i).next[0];
    var y = u.x;
    u.x = x;
    return y;
  }
  
  this.pickHeight = function () {
    var z = Number.parseInt(Math.random() * 10, 10); // todo
    var k = 0;
    var m = 1;
    while ((z & m) !== 0) {
      k++;
      m <<= 1;
    }
    return k;
  }
  this.addWithNode = function (i, w) {
    var u = this.sentinel;
    var k = w.height;
    var r = this.h;
    var j = -1;
    while (r >= 0) {
      while (u.next[r] !== undefined && j + u.length[r] < i) {
        j += u.length[r];
        u = u.next[r];
      }
      u.length[r]++;
      if (r <= k) {
        w.next[r] = u.next[r];
        u.next[r] = w;
        w.length[r] = u.length[r] - (i - j);
        u.length[r] = i - j;
      }
      r--;
    }
    this.n++;
    return u;
  };
  this.add = function (i, x) {
    var w = new Node(x, this.pickHeight());
    if (w.height > this.h) {
      this.h = w.height;
    }
    this.addWithNode(i, w);
  };

  this.remove = function (i) {
    var x = null;
    var u = this.sentinel;
    var r = this.h;
    var j = -1;
    while (r >= 0) {
      // 削除ノードまでの距離<指定インデックス
      while (u.next[r] !== undefined && j + u.length[r] < i) {
        j += u.length[r];
        u = u.next[r];
      }
      u.length[r]--; // 削除ノードまでの距離を１づつ削る
      if (j + u.length[r] + 1 === i && u.next[r] !== undefined) {
        x = u.next[r].x;
        u.length[r] += u.next[r].length[r];
        u.next[r] = u.next[r].next[r];
        if (u === this.sentinel && u.next[r] === undefined) {
          h--;
        }
      }
      r--;
    }
    this.n--;
    return x;
  };
};

var assert = require('assert');
function test() {
  var sl = new SkiplistList();
  sl.add(0,0);
  sl.add(1,1);
  sl.add(2,12);
  sl.add(3,3);
  sl.add(4,4);
  sl.add(5,15);
  sl.add(6,6);
  assert.strictEqual(sl.get(0), 0);
  assert.strictEqual(sl.get(2), 12);
  assert.strictEqual(sl.get(6), 6);
  sl.remove(3);
  assert.strictEqual(sl.get(3), 4);
  console.log('ok');
}
// test();

module.exports = SkiplistList;