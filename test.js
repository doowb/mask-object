'use strict';

var mask = require('./');
var assert = require('assert');

describe('mask-object', function () {
  describe('simple objects', function () {
    it('some properties', function () {
      assert.deepEqual(mask({a: 'A', b: 'B'}, { a: 1}), {a: 'A'});
    });

    it('with no matches', function () {
      assert.deepEqual(mask({a: 'A', b: 'B'}, { c: 1}), {});
    });

    it('with all matches and extract properties', function () {
      assert.deepEqual(mask({a: 'A', b: 'B'}, { a: 1, b: 1, c: 1}), {a: 'A', b: 'B'});
    });
  });

  describe('complex objects', function () {
    it('some properties', function () {
      var srcObj = {a: 'A', b: { b1: 'B1', b2: { c1: { d1: 'D1' }, c2: 'C2' } } };
      var maskObj = { a: 1, b: { b2: { c1: 1 } } };
      var expected = {a: 'A', b: { b2: { c1: { d1: 'D1' } } } };
      assert.deepEqual(mask(srcObj, maskObj), expected);
    });

    it('with no matches', function () {
      var srcObj = {a: 'A', b: { b1: 'B1', b2: { c1: { d1: 'D1' }, c2: 'C2' } } };
      var maskObj = { c: 1, d: { b2: { c1: 1 } } };
      assert.deepEqual(mask(srcObj, maskObj), {});

      assert.deepEqual(mask({a: 'A', b: 'B'}, { c: 1}), {});
    });

    it('with all matches and extract properties', function () {
      var srcObj = {a: 'A', b: { b1: 'B1', b2: { c1: { d1: 'D1' }, c2: 'C2' } } };
      var maskObj = {a: 1, b: { b1: 1, b2: { c1: { d1: 1 }, c2: 1 } }, foo: 1 };
      var expected = {a: 'A', b: { b1: 'B1', b2: { c1: { d1: 'D1' }, c2: 'C2' } } };
      assert.deepEqual(mask(srcObj, maskObj), expected);
    });
  });
});
