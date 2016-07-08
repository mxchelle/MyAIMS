Template.SpotlightUpload.onCreated( function() {
  this.spotlightType = new ReactiveVar();
  this.spotlightData = new SpotlightData(this.data.resourceID);
  Session.set('submitSpotlight', false);
  var self = this;

  self.autorun(function () {
      // subscribe to the posts publication
      var subscription = self.subscribe( 'SingleSpotlight', ''+self.data.resourceID );

      if (subscription.ready()) {
          self.spotlightData.setInitial();
      }
  });

   self.autorun(function () {
      var submitMe = Session.get('submitSpotlight');
      if(submitMe){
        self.spotlightData.submit();
        if(!!Blog.Post.find({_id: self.data.resourceID}).fetch()[0]){

        }
        Session.set('submitSpotlight', false);
      }
  });
  
});

Template.SpotlightUpload.helpers({
  spotlightType: function() {
    return Template.instance().spotlightType.get();
  },
  templateType: function() {
  	var type = Template.instance().spotlightType.get();
    if(type){
    	return type+"Upload";
    }
    return null;
  },
  spotlightData: function() {
    return Template.instance().spotlightData;
  }
});

Template.SpotlightUpload.events({
  'click .resource-select': function( event, template ) {
  	template.spotlightType.set(event.target.value);
  }
});




function SpotlightData (resourceID) {
    this.initial = null;
    this.video = new ReactiveArray([]);
    this.photo = new ReactiveArray([]);
    this.attachment = new ReactiveArray([]);
    this.resourceID = resourceID;

    this.setInitial = function(){
      //console.log(this.resourceID);
      this.initial = Spotlights.find({_id: this.resourceID}).fetch()[0];
      //console.log(this.initial);
      //can I set?

      var loadInit = function(initArray, myArray){
        var arrayLength = initArray.length;
        for (var i = 0; i < arrayLength; i++) {
            myArray.push(initArray[i]);
        }
      }

      if(this.initial){
        loadInit(this.initial.video, this.video);
        loadInit(this.initial.photo, this.photo);
        loadInit(this.initial.attachment, this.attachment);
      }
    };

    this.submit = function(){
      var attrs = {
        video : this.video.array(),
        photo : this.photo.array(),
        attachment : this.attachment.array()
      }
      var select = {_id: this.resourceID};
  
      if(!!this.initial){
        Spotlights.update(select, {$set: attrs});
      }
      else{
        attrs._id = this.resourceID;
        Spotlights.insert(attrs);
        
      }
    };
    
}

function SpotlightData2 (resourceID) {
    this.init = function(resourceID, initial){
      this.initial = initial;
      this.video.set(this.initial.video);
      this.photo.set(this.initial.photo);
      this.attachment.set(this.initial.photo);
    };

    function unsavedChanges(initial, spotlight){
      unsavedChanges = false,
      this.types = ['video','photo','attachment'];

      var changed = false;

      if(!!this.initial && spotlight.exists()){
          this.unsavedChanges = true;
      }
      else{
        var arrayLen = this.types.length;
        for (var i = 0; i < arrayLen; i++) {
          if(_.isEqual(initial[this.types[i]], spotlight[this.types[i]])){
            var changed = true;
            break;
          }
        }
      }
      return changed;
    };

    
}