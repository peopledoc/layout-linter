1. Tests use Mocha
2. Every test-file must appear under the `/tests/modules` folder as `{something}-test.js`

3. Every test-file should look like this:

```
describe('some description for this test file', ()=> {

  it('will test something', function() {
    createScenario(...);
    const lintedHTML = lintLayout(...);
    const $html = $(lintedHTML);
    assert(something);
    assert(something else);
    ....
    ..
  });

  it('will test something else', function() {
    createScenario(...);
    const lintedHTML = lintLayout(...);
    const $html = $(lintedHTML);
    assert(something);
    assert(something else);
    ....
    ..
  });

  .....
  ...

});
```

4. Every test inside each test-file will consist of 3 parts: 
  (1) setting up the scenario
  (2) calling the layout-linter
  (3) asserting the resulting $html or any thrown errors

5. a scenario is created by calling `createScenario(options);`. What this helper does is, it creates a dummy-app folder, it makes that folder behave as the rootApp that would be using layout-linter, it creates and places (or not) a `.layoutrc` file (with customisable content) to some custom location within that folder etc.

With the above we are able to test broken, missing, badly-placed `.layoutrc` files, test all the different rules they could contain, test calling layout-linter from within a standard Node app or from within an npm module etc.
