#!/usr/bin/env node
'use strict';
/**
 * expect:
 *  NOTE: height field is not always same on each Node.
 * [ ][*]
 * add(0)
 *    [*]---->[*]
 * [ ][*]->[0][*]
 * add(1),add(4)
 *    [*]-------------------->[*]
 *    [*]---->[*]------------>[*]
 * [ ][*]->[0][*]->[1][*]->[4][*]
 * add(2),add(3)
 *    [*]-----------------------------[*]---->[*]
 *    [*]---->[*]------------>[*]-----[*]---->[*]
 * [ ][*]->[0][*]->[1][*]->[2][*]->[3][*]->[4][*]
 * add(5),add(7)
 *    [*]-----------------------------[*]---->[*]
 *    [*]---->[*]------------>[*]-----[*]---->[*]---->[*]
 * [ ][*]->[0][*]->[1][*]->[2][*]->[3][*]->[4][*]->[5][*]->[7][*]
 * remove(2)
 *    [*]---------------------[*]---->[*]
 *    [*]---->[*]-------------[*]---->[*]---->[*]
 * [ ][*]->[0][*]->[1][*]->[3][*]->[4][*]->[5][*]->[7][*]
 * find(2)
 * 3
 */
var Node = function (x, height) {
  this.x = x; // ノードのデータフィールド、SLList[0]で保持
  this.height = height;
  this.next = []; // 各SLList要素の直後へのポインタ
};

var SkiplistSortedSet = function () {
  this.sentinel = new Node(null, 0);
  this.h = 0;
  this.n = 0;

  // this.size = function () {};
  
  /**
   * コイントスのシュミレーター、表が出た回数を返す
   */
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
  this.add = function (x) {
    var u = this.sentinel;
    var r = this.h;
    var comp = 0;
    var stack = []; // SSList要素内で１つ下がった時のノードを記録するための変数

    while (r >= 0) {
      while (u.next[r] !== undefined && (comp = this.compare(u.next[r].x, x)) < 0) {
        // 追加xより大きいor等しいノードxに到達するまで、右に探索
        u = u.next[r];
      }
      if (u.next[r] !== undefined && comp === 0) {
        // 追加xと等しいノードxがあったら終了
        return false;
      }
      stack[r--] = u;
    }
    var w = new Node(x, this.pickHeight()); // 追加x用のノード作成
    while (this.h < w.height) { // 追加xの新しいノードが今より高ければsentinelも合わせて増やす
      stack[++this.h] = this.sentinel; // ステップリストの高さを増やす
    }
    for (var i = 0; i <= w.height; i++) { // ポインタを更新
      w.next[i] = stack[i].next[i];
      stack[i].next[i] = w;
    }
    this.n++;
    return true;
  };

  this.remove = function (x) {
    var removed = false;
    var u = this.sentinel;
    var del;
    var r = this.h;
    var comp = 0;
    while (r >= 0) {
      while (u.next[r] !== undefined && (comp = this.compare(u.next[r].x, x)) < 0
      ) {
        u = u.next[r];
      }
      if (u.next[r] !== undefined && comp == 0) {
        removed = true;
        del = u.next[r];
        u.next[r] = u.next[r].next[r];
        if (u == this.sentinel && u.next[r] == undefined) {
          this.h--;
        }
      }
      r--;
    }
    if (removed) {
      this.n--;
    }
    return removed;
  };

  this.compare = function (x, y) {
    if (x < y) {
      return -1;
    } else if (x > y) {
      return 1
    } else {
      return 0;
    }
  };
  this.findPredNode = function (x) {
    var u = this.sentinel;
    var r = this.h;
    while (r >= 0) {
      while (u.next[r] !== undefined && this.compare(u.next[r].x, x) < 0) {
        u = u.next[r]; // １つ右に進む
      }
      r--; // １つ下に下がる
    }
    return u;
  }
  /**
   * SSetの小さい要素から探して、y(要素)>=x(入力)を満たす最小のyを特定する
   * @param {number}
   * @return {number} 入力以上または等しい数値
   */
  this.find = function (x) {
    var u = this.findPredNode(x);
    return u.next[0] == undefined ? undefined : u.next[0].x; // undefined=ノードなし
  };
}

var assert = require('assert');
function test () {
  var sss = new SkiplistSortedSet();
  sss.add(0);
  sss.add(1);
  sss.add(4);
  sss.add(2);
  sss.add(3);
  sss.add(5);
  sss.add(7);
  assert.strictEqual(sss.n, 7);
  assert.strictEqual(sss.sentinel.next[0].next[0].next[0].next[0].next[0].x, 4);
  sss.remove(2);
  assert.strictEqual(sss.find(2), 3);
  assert.strictEqual(sss.n, 6);
  console.log('ok');
}
// test();

module.exports = SkiplistSortedSet;
