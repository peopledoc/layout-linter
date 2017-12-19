import test from 'ava';
import { JSDOM } from 'jsdom';
import rule from './has-attributes.js';

test('should find single attribute when present', (t) => {
  const document = new JSDOM("<b class='my-class'></b>").window;
  t.true(rule('.my-class', document));
});

test('should fail when single attribute missing', (t) => {
  const document = new JSDOM("<b class=''></b>").window;
  t.false(rule('.my-class', document));
});

test('should find multiple attributes when present', (t) => {
  const document = new JSDOM("<b class='my-class other-class'></b>").window;
  t.true(rule('.my-class, .other-class', document));
});
