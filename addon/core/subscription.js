import EmberObject, { computed } from '@ember/object';
import Ember from 'ember';

const {
  get
} = Ember;

var Subscription = EmberObject.extend({
  subscriptions: null,
  params: {},

  identifier: computed('params', function() {
    return JSON.stringify(get(this,'params'));
  }),

  init() {
    this._super(...arguments);
    get(this,'subscriptions').add(this);
  },

  perform(action, data = {}) {
    data.action = action;
    this.send(data);
  },

  send(data) {
    get(this,'subscriptions.consumer').send({
      command: 'message',
      identifier: get(this,'identifier'),
      data: JSON.stringify(data)
    });
  },

  unsubscribe() {
    return get(this,'subscriptions').remove(this);
  }

});

Subscription[Ember.NAME_KEY] = 'Subscription';

export default Subscription;
