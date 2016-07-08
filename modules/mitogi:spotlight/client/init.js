
Meteor.startup(function() {
  Uploader.uploadUrl = Meteor.absoluteUrl("upload");
  /*Uploader.finished = function(index, file) {
    Uploads.insert(file);
  }*/
});
