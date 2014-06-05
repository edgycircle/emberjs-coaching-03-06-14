export default Ember.Route.extend({
  actions: {
    save: function() {
      this.modelFor('card').save();
    }
  },
  model: function(params) {
    return this.store.find('card', params.id);
  }
});
