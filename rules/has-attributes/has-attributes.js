import jquery from 'jquery';

export default (selector, document) => {
  return jquery(document)(selector).length === 1;
};
