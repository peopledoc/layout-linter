import test from 'ava';
import { JSDOM } from 'jsdom';
import jquery from 'jquery';
import validator from './has-attributes.js';

test('should valid when attribute is present', (t) => {
  const { window } = new JSDOM(`<b class='my-class'></b>`);
  const node = jquery(window)('.my-class');

  t.true(validator(node, 'class'));
});

test('should not valid when attribute is missing', (t) => {
  const { window } = new JSDOM(`<b class='my-class'></b>`);
  const node = jquery(window)('.my-class');

  t.false(validator(node, 'role'));
});
