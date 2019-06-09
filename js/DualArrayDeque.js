#!/usr/bin/env node
// reference: https://sites.google.com/view/open-data-structures-ja
/**
 * expect:
 *           front|back
 * [ ][ ][ ][a][b]|[c][d][ ][ ][ ]
 * add(3,x)
 * [ ][ ][ ][a][b]|[c][x][d][ ][ ]
 * add(4,y)
 * [ ][ ][ ][a][b]|[c][x][y][d][ ]
 * remove(0)
 * [ ][ ][ ][ ][b]|[c][x][y][d][ ]
 * [ ][ ][ ][b]|[c][x][y][d][ ][ ]
 */
'use strict';
var DualArrayDeque = function () {
  this.front = new Array(5); // NOTE: this is anti-pattern for performance.
  this.back = new Array(5);
  // TODO: from here
};