/*!
 * mask-object <https://github.com/doowb/mask-object>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';
var stringify = require('stringify-keys');
var get = require('get-object');
var set = require('set-object');

module.exports = function mask () {
  var len = arguments.length, i = 1;
  if (len === 0) {
    return {};
  }
  if (len === 1) {
    return arguments[0];
  }

  var obj = arguments[0];

  while (--len) {
    obj = pick(obj, arguments[i++]);
  }
  return obj;
}

function pick (src, picks) {
  var keys = stringify(picks);
  var len = keys.length, i = 0;
  var o = {};
  while (len--) {
    var key = keys[i++];
    var val = get(src, key);
    var include = get(picks, key);
    if (typeof include === 'object') {
      continue;
    }
    if (val && include) {
      set(o, key, val);
    }
  }
  return o;
}
