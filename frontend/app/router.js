var Router = Ember.Router.extend({
  rootURL: ENV.rootURL,
  location: 'auto'
});

Router.map(function() {
  this.resource('card', { path: 'cards/:id' });
  this.resource('week', { path: 'week/:week_number' });
});

export default Router;
