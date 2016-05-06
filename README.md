# Ember-konami

A component to recognize the konami code.

``` handlebars
{{#konami-code action=(action "codeWasMatched")}}
    {{!keyboard input inside here will be recognized}}
{{/konamic-code}}
```

The main point was to have some fun with [ember-concurrency][1] to see if
the entire sequence recognition could be modeled as a single if statement, and
lo and behold it worked!

The main component looks like this.

``` javascript
export default Ember.Component.extend({
  layout: layout,

  match: task(function* () {
    if (yield this.up()) {
      if (yield this.down()) {
        if (yield this.down()) {
          if (yield this.left()) {
            if (yield this.right()) {
              if (yield this.left()) {
                if (yield this.right()) {
                  if (yield this.b()) {
                    if (yield this.a()) {
                      if (yield this.b()) {
                        if (yield this.a()) {
                          this.sendAction('action');
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }).drop(),
})
```
fun!

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

[1]: http://ember-concurrency.com/
