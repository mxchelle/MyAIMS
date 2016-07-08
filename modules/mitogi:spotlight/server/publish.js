Meteor.publish('SingleSpotlight', function(id) {
  return Spotlights.find({_id: id});
});