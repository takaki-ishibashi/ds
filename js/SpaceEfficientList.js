#!/usr/bin/env node
'use strict';
/**
 * expect:
 * <-[*][][*]->
 * add(a),add(b),add(c),add(d),add(e)
 * <-[*][][*]<->[*][[a][b][c][d]][*]<->[*][[e]][*]<->[*][][*]->
 * add(f),add(g),add(h),add(i),add(j)
 * <-[*][][*]<->[*][[a][b][c][d]][*]<->[*][[e][f][g][h]][*]<->[*][[i][j][ ][ ][*]<->[*][][*]->
 * add(1,x)
 * <-[*][][*]<->[*][[a][x][b][c]][*]<->[*][[d][e][f][g]][*]<->[*][[h][i][j][ ][*]<->[*][][*]->
 * remove(1), remove(6)x3, remove(1)
 * <-[*][][*]<->[*][[a][x][b][c]][*]<->[*][[d][e][f][g]][*]<->[*][[h][i][j][ ][*]<->[*][][*]->
 * todo:
 * - calculate big-O notation
 */

var BoundedDeque = function (b) {
  this.a = new Array(b + 1);
  this.j = 0;
  this.n = 0;
  
  this.get = function (i) {
    return this.a[((this.j + i) % this.a.length)];
  }
  
  this.set = function (i, x) {
    this.a[(this.j + i) % this.a.length] = x;
  }
  
  this.size = function () { // special
    return this.n;
  }

  this.addWithIndex = function (i, x) {
    // if ((this.n + 1) >= this.a.length) this.resize(); // not resize in bounded-deque
    if (i < this.n / 2) {
      this.j = (this.j === 0) ? this.a.length - 1 : this.j -1;
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
  
  this.add = function(x) {
    this.addWithIndex(this.size(), x);
    return true;
  }

  this.remove = function (i) {
    var x = this.a[(this.j + i) % this.a.length];
    if (i < this.n / 2) {
      for (var k = i; k > 0; k--) {
        this.a[(this.j + k) % this.a.length] = this.a[(this.j + k - 1) % this.a.length];
      }
      this.j = (this.j + 1) % this.a.length;
    } else {
      for (var k = i; k < this.n - 1; k++) {
        this.a[(this.j + k) % this.a.length] = this.a[(this.j + k + 1) % this.a.length];
      }
    }
    this.n--;
    // if (3 * this.n < this.a.length) this.resize(); // not resize in bounded-deque
    return x;
  }
}

var Node = function (b) {
  this.d = new BoundedDeque(b);
  this.prev;
  this.next;
}

var Location = function () {
  this.u;
  this.j;
}

var SpaceEfficientList = function () {
  this.b = 3;
  this.dummy = new Node(this.b);
  this.dummy.next = this.dummy;
  this.dummy.prev = this.dummy;
  this.n = 0;

  this.getLocation = function (i, loc) {
    if (i < this.n / 2) {
      var u = this.dummy.next;
      while (i >= u.d.size()) {
        i -= u.d.size();
        u = u.next;
      }
      loc.u = u;
      loc.j = i;
    } else {
      var u = this.dummy;
      var idx = this.n;
      while (i < idx) {
        u = u.prev;
        idx -= u.d.size();
      }
      loc.u = u;
      loc.j = i - idx;
    }
  }

  this.get = function (i) {
    var loc = new Location();
    this.getLocation(i, loc);
    return loc.u.d.get(loc.j);
  }

  this.set = function (i, x) {
    var loc = new Location();
    this.getLocation(i, loc);
    var y = loc.u.d.get(loc.j);
    loc.u.d.set(loc.j, x);
    return y;
  }

  this.addBefore = function (w) {
    var u = new Node(this.b);
    u.next = w;
    u.prev = w.prev;
    u.prev.next = u;
    u.next.prev = u;
    return u;
  }

  this.add = function (x) {
    var last = this.dummy.prev;
    if (last === this.dummy || last.d.size() == this.b + 1) {
      last = this.addBefore(this.dummy);
    }
    last.d.add(x);
    this.n++;
  }

  this.spread = function (u) {
    var w = u;
    for (var j = 0; j < this.b; j++) { // b番目のノードまで進む
      w = w.next;
    }
    w = this.addBefore(w); // 新しいノードを直後に追加
    while (w !== u) { // 最初のノードまで戻る
      while (w.d.size() < this.b) {
        // 新しいノードのスペースを使って、それぞれのブロック要素数がb未満になるようデータシフト
        w.d.add(0, w.prev.d.remove(w.prev.d.size() - 1));
      }
      w = w.prev;
    }
  };

  this.addWithIndex = function (i, x) {
    if (i === this.n) {
      this.add(x);
      return;
    }
    var loc = new Location();
    this.getLocation(i, loc);
    var u = loc.u;
    var r = 0;
    // i~i+b番目のノードを探索、末尾に未到達かつノードのブロックが全て一杯または空きがないか調べる
    while (r < this.b && u !== this.dummy && u.d.size() == this.b + 1) {
      u = u.next;
      r++;
    }
    if (r === this.b) { // case3: 調べた範囲で満室、調べたノードの全てのブロックにb+1個の要素があった
      this.spread(loc.u);
      u = loc.u;
    }
    if (u === this.dummy) { // case2: 末尾に到達、調べたノードの全てのブロックにb+1個の要素があった、かつ末尾に到達
      u = this.addBefore(u);
    }
    while (u != loc.u) { // case1: 空きを発見、直前の要素を削除、同時に直後の要素にシフト
      u.d.addWithIndex(0, u.prev.d.remove(u.prev.d.size() - 1));
      u = u.prev;
    }
    debugger;
    u.d.addWithIndex(loc.j, x);
    this.n++;
  };

  this.garther = function (u) {
    var w = u;
    for (var j = 0; j < this.b - 1; j++) { // それぞれのブロックの要素数がb-1個になるように分配
      while (w.d.size() < this.b) {
        w.d.add(w.next.d.remove(0));
      }
      w = w.next;
    }
  }

  this.removeBefore = function (w) {
    w.prev.next = w.next;
    w.next.prev = w.prev;
  }

  this.remove = function (i) {
    var loc = new Location();
    this.getLocation(i, loc);
    var y = loc.u.d.get(loc.j);
    var u = loc.u;
    var r = 0;
    while (r < this.b && u !== this.dummy && u.d.size() === this.b - 1) {
      u = u.next;
      r++;
    }
    if (r === this.b) { // case3: 調べた範囲の全てのブロックにb-1個の要素があった
      this.garther(loc.u);
    }
    u = loc.u;
    u.d.remove(loc.j);
    while (u.d.size() < this.b - 1 && u.next !== this.dummy) {
      u.d.add(u.next.d.remove(0));
      u = u.next;
    }
    if (u.d.size() == 0) {
      this.removeBefore(u);
    }
    this.n--;
    return y;
  }
}

var assert = require('assert');
function test() {
  var sel = new SpaceEfficientList();
  sel.add('a');
  sel.add('b');
  sel.add('c');
  sel.add('d');
  sel.add('e');
  assert.strictEqual(sel.get(0), 'a');
  assert.strictEqual(sel.get(1), 'b');
  assert.strictEqual(sel.get(2), 'c');
  assert.strictEqual(sel.get(3), 'd');
  assert.strictEqual(sel.get(4), 'e');
  assert.strictEqual(sel.n, 5);
  sel.add('f');
  sel.add('g');
  sel.add('h');
  sel.add('i');
  sel.add('j');
  sel.addWithIndex(1, 'x'); // todo
  assert.strictEqual(sel.get(0), 'a');
  assert.strictEqual(sel.get(1), 'x');
  sel.remove(1);
  sel.remove(6);
  sel.remove(6);
  sel.remove(6);
  sel.remove(1);
  assert.strictEqual(sel.get(0), 'a');
  assert.strictEqual(sel.get(1), 'c');
  console.log('ok');
}
test();

module.exports = SpaceEfficientList;