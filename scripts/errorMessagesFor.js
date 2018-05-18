function buildErrorMessageFor(selectorString, message) {
  return message.replace(/{{placeholder}}/, selectorString);
}

module.exports = function($el, rule, tooltips) {
  let errors = [];

  if (rule.is) {
    if (!$el.is(rule.is)) {
      errors.push(buildErrorMessageFor(rule.is, tooltips.is));
    }
  }

  if (rule.parent) {
    if (!$el.parent(rule.parent).length) {
      errors.push(buildErrorMessageFor(rule.parent, tooltips.parent));
    }
  }

  if (rule.direct) {
    rule.direct.forEach((childSelector)=> {
      if (!$el.find(`>${childSelector}`).length) {
        errors.push(buildErrorMessageFor(childSelector, tooltips.direct));
      }
    });
  }

  if (rule.contains) {
    rule.contains.forEach((childSelector)=> {
      if (!$el.find(`${childSelector}`).length) {
        errors.push(buildErrorMessageFor(childSelector, tooltips.contains));
      }
    });
  }

  if (rule.attr) {
    rule.attr.forEach((attrSelector)=> {
      if (!$el.is(`[${attrSelector}]`)) {
        errors.push(buildErrorMessageFor(attrSelector, tooltips.attr));
      }
    });
  }

  if (rule.not) {
    if (rule.not.is) {
      if ($el.is(rule.not.is)) {
        errors.push(buildErrorMessageFor(rule.not.is, tooltips.not.is));
      }
    }

    if (rule.not.parent) {
      if ($el.parent(rule.not.parent).length) {
        errors.push(buildErrorMessageFor(rule.not.parent, tooltips.not.parent));
      }
    }

    if (rule.not.direct) {
      rule.not.direct.forEach((childSelector)=> {
        if ($el.find(`>${childSelector}`).length) {
          errors.push(buildErrorMessageFor(childSelector, tooltips.not.direct));
        }
      });
    }

    if (rule.not.contains) {
      rule.not.contains.forEach((childSelector)=> {
        if ($el.find(`${childSelector}`).length) {
          errors.push(buildErrorMessageFor(childSelector, tooltips.not.contains));
        }
      });
    }

    if (rule.not.attr) {
      rule.not.attr.forEach((attrSelector)=> {
        if ($el.is(`[${attrSelector}]`)) {
          errors.push(buildErrorMessageFor(attrSelector, tooltips.not.attr));
        }
      });
    }
  }

  return errors;
};
