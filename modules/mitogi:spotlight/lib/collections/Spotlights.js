Spotlights = new Mongo.Collection('spotlight');   

Spotlights.allow({
  //if you're signed in, you're able to
  insert : function(userId, doc){
    return !!userId;
  },
  update : function(userId, doc){
    return !!userId;
  },
  remove : function(userId, doc){
    return !!userId;
  },

});


Upload = new SimpleSchema({
  name : {
    type: String,
    label: 'Name',
    optional: true,
  },
  filepath: {
      type: String,
      label: "Filepath",
      optional: true,
  },
  description: {
      type: String,
      label: "Description",
      optional: true,
  },
  size: {
      type: String,
      label: "Description",
      optional: true,
  },
  index: {
      type: Number,
      label: "Index",
      optional: true,
  },
  _id: {
      type: String,
      label: "UploadID",
      optional: true,
  },
});


SpotlightSchema = new SimpleSchema({
  video : {
    type:  [Upload],
    label: 'Links',
    optional: false
  },
  photo : {
    type:  [Upload],
    label: 'Links',
    optional: false
  },
  attachment : {
    type:  [Upload],
    label: 'Links',
    optional: false
  },
  resourceID : {
    type: String,
    label: 'Author',
    optional: true,
  }
});

Meteor.methods({ 
  deleteResourceSpotlight : function(resourceId){
    deleteSpotlight({'resourceID': resourceId});
  },
  deleteOneSpotlight: function(id){
    deleteSpotlight({_id: id});
  },
  cleanAttachmentDB: function(){
    deleteSpotlight({'resourceID': null});
  },
  deleteSpotlight : function(param){
    Spotlights.find(param).foreach(function(attachment){
      //UploadServer.delete(attachment.filepath);
    });
  }
});

Spotlights.attachSchema(SpotlightSchema);