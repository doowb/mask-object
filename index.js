/*!
 * mask-object <https://github.com/doowb/mask-object>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';
var stringify = require('stringify-keys');
var get = require('get-value');
var set = require('set-value');

/**
 * Return only properties specified in an object mask.
 *
 * *Example*
 * ```
 * var contact = {
 *   name: 'Brian',
 *   address: {
 *     street: '123 Main St.',
 *     city: 'Cincinnati',
 *     state: 'OH',
 *     zip: '45241'
 *   },
 *   billing_address: {
 *     street: '567 Main St.',
 *     street2: 'Suite #1',
 *     city: 'Cincinnati',
 *     state: 'OH',
 *     zip: '45241'
 *   }
 * };
 *
 * // pull the streets out
 * console.log(mask(contact, [
 *   'address.street',
 *   'address.street2',
 *   'billing_address.street',
 *   'billing_address.street2'
 * ]));
 *
 * //=> {
 * //=>   address: { street: '123 Main St.' },
 * //=>   billing_address: { street: '567 Main St.', street2: 'Suite #1' }
 * //=> }
 *
 * ```
 *
 * @name  mask
 * @param  {Object} `obj` Original source object.
 * @param  {Object} `mask` Mask object(s) to use to pick properties off the source.
 * @return {Object} Masked object with only the properties specified in the mask
 * @api public
 */

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

/**
 * Pick off only the properties specified in the picks.
 *
 * @param  {Object} `src` Source object to pick properties off of.
 * @param  {Object} `picks` Propreties to pick off.
 * @return {Object} Resulting object after picks have been made.
 */

function pick (src, picks) {
  // var keys = stringify(picks);
  var keys = picks;
  var len = keys.length, i = 0;
  var o = {};
  while (len--) {
    var key = keys[i++];
    var val = get(src, key);
    if (val || typeof val !== 'undefined') {
      set(o, key, val);
    }
  }
  return o;
}
