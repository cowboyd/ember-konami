import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    lock() {
      this.set('unlocked', false);
    },
    unlock() {
      this.set('unlocked', true);
    }
  }
});
