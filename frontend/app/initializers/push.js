export default {
  name: 'push',
  after: 'store',
  initialize: function(container, app) {
    var store = container.lookup('store:main');
    var eventSource = new EventSource('http://0.0.0.0:4242');

    eventSource.onmessage = function (event) {
      store.pushPayload('card', JSON.parse(event.data));
    };
  }
};
