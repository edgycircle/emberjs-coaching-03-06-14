export default Ember.ArrayController.extend({
  previous: function() {
    return parseInt(this.get('actualNumber'), 10) - 1;
  }.property('actualNumber'),
  next: function() {
    return parseInt(this.get('actualNumber'), 10) + 1;
  }.property('actualNumber')
});
