
Meteor.methods({
  vimeo_token : function(){
    return Meteor.settings.private.VIMEO_TOKEN;
  },
  'deleteFile': function(_id) {
      check(_id, String);
      UploadServer.delete(upload.path);
  }
});