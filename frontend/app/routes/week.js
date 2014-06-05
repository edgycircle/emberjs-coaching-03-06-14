export default Ember.Route.extend({
  counter: 0,
  numberOfVisibleWeeks: 4,
  direction: null,

  lastNumber: null,


  model: function(params) {
    var promises = [];
    var number = parseInt(params.week_number, 10);
    var startIndex = number - 1;

    if(this.get('lastNumber') !== null) {
      if(number > parseInt(this.get('lastNumber'), 10)) {
        this.set('direction', 'left-to-right');
        startIndex = number - 2;
      } else {
        this.set('direction', 'right-to-left');
        startIndex = number;
      }
    } else {

    }

    this.set('lastNumber', number);

    for(var i = startIndex; i <= number + this.get('numberOfVisibleWeeks'); i++) {
      // promises.push(new Ember.RSVP.Promise(function(resolve, reject) {
      //   resolve(Ember.Object.create({number: i}));
      // }));

      promises.push(this.store.find('week', i));
    }

    return Ember.RSVP.all(promises);
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('actualNumber', this.get('lastNumber'));

    // this.store.find('week', )
    // this.store.find('week', )

    var direction = this.get('direction');

    if(direction == 'left-to-right') {
      Ember.run.next(function() {
        controller.set('right', false);
        controller.set('left', true);
      });


      Ember.run.later(function() {
        controller.set('left', false);
        controller.get('model').removeAt(0);
      }, 500);
    }

    if(direction == 'right-to-left') {
      Ember.run.next(function() {
        controller.set('right', true);
        controller.set('left', false);
      });

      Ember.run.later(function() {
        controller.set('right', false);
        controller.get('model').removeAt(controller.get('model.length') - 1);
        controller.get('model').insertAt(0, controller.get('model')[0]);
      }, 500);
    }
  },
  deactivate: function() {
    console.log("deactive");
  }
});
