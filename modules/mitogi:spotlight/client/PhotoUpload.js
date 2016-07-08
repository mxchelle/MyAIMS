Template.PhotoUpload.onCreated(function(){
	this.uploadPicsOption = new ReactiveVar();
	this.uploadThumb = this.data.spotlightData.photo;
	//console.log(this.data.photo);
});

Template.PhotoUpload.events({
	'click #cameraPicture' : function(e){
    	var template = Template.instance();
		MeteorCamera.getPicture({}, function(error, data){

			var dataUriToFile = function(dataUri, fileName) {
			  // https://en.wikipedia.org/wiki/Data_URI_scheme
			  // create a pattern to match the data uri
			  var patt = /^data:([^\/]+\/[^;]+)?(;charset=([^;]+))?(;base64)?,/i,
			    matches = dataUri.match(patt);
			  if (matches == null){
			    throw new Error("data: uri did not match scheme")
			  }
			  var 
			    prefix = matches[0],
			    contentType = matches[1],
			    // var charset = matches[3]; -- not used.
			    isBase64 = matches[4] != null,
			    // remove the prefix
			    encodedBytes = dataUri.slice(prefix.length),
			    // decode the bytes
			    decodedBytes = isBase64 ? atob(encodedBytes) : encodedBytes,
			    // return the file object
			    props = {};
			  if (contentType) {
			    props.type = contentType;
			  }
			  return new File([decodedBytes], fileName, props);
			}

			//var objectURL = dataUriToFile(data, 'filename' {type: 'JPEG'});
			//console.log('pictures!');
			//Uploader.startUpload(e, objectURL);
			//template.uploadThumb.push({'name':'', 'url':objectURL.src});
		});
	},
	'click #uploadPicture' : function(){
		Template.instance().uploadPicsOption.set('true');
	}
})



Template.PhotoUpload.helpers({
  uploadPicsOption: function(){
  	return Template.instance().uploadPicsOption.get();
  },
  myCallbacks: function () {
    var template = Template.instance();
    return {
        finished: function(index, fileInfo, context) {
          template.uploadThumb.push({filepath: fileInfo.url, 
            size: fileInfo.size, 
            name: fileInfo.name, _id: fileInfo._id, index: index });
        },
    }
  },
  filesToUpload: function() {
    return Template.instance().uploadThumb.list();//Template.instance().uploadThumb.get();
  },

})