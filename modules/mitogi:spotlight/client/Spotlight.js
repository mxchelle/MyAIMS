Template.Spotlight.onCreated(function(){
	var self = this;
	self.spotlight = new ReactiveVar();
	self.autorun(function () {
      // subscribe to the posts publication
      var subscription = self.subscribe( 'SingleSpotlight', self.data.resourceID );
      if (subscription.ready()) {

          self.spotlight.set(Spotlights.find().fetch()[0]);
          
      }
  });
});

Template.Spotlight.onRendered(function(){
	console.log(this.spotlight);
});

Template.Spotlight.helpers({
	attachment: function(){
		console.log(Template.instance().spotlight.attachment);
		return Template.instance().spotlight.get().attachment;
	},
	photo: function(){
		return Template.instance().spotlight.get().photo;
	},
	video: function(){
		return Template.instance().spotlight.get().video;
	},
});