Template.AttachmentUpload.onCreated(function(){
	this.uploadAttach = this.data.spotlightData.attachment; // new ReactiveArray([]);
});



Template.AttachmentUpload.helpers({
  attachCallback: function () {
    var template = Template.instance();
    return {
        finished: function(index, fileInfo, context) {
          template.uploadAttach.push({filepath: fileInfo.url, 
            size: fileInfo.size, 
            name: fileInfo.name, index: index } );
        },
    }
  },
  filesToUpload: function() {
    return Template.instance().uploadAttach.list();
  },

})