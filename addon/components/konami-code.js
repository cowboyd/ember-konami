import Ember from 'ember';
import layout from '../templates/components/konami-code';
import { task, TaskInstance } from 'ember-concurrency';

export default Ember.Component.extend({
  layout,

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

  up() {
    return this.matchKey(38);
  },

  down() {
    return this.matchKey(40);
  },

  left() {
    return this.matchKey(37);
  },

  right() {
    return this.matchKey(39);
  },

  b() {
    return this.matchKey(66);
  },

  a() {
    return this.matchKey(65);
  },

  matchKey(arg) {
    let eventName = `keyup.match-key-${arg}`;
    let promise = new Ember.RSVP.Promise((resolve, reject)=> {
      this.$().on(eventName, (e)=> {
        this.$().off(eventName);
        resolve(e.keyCode === arg);
      });
    });
    promise.__ec_cancel__ = ()=> {
      this.$().off(eventName);
    };
    return promise;
  },

  keyUp(event) {
    if (event.keyCode === 38) {
      this.get('match').perform();
    }
  }
});
