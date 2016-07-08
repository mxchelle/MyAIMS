import './vimeo/vimeo-upload.js';

//template level subscription
Template.VideoUpload.onCreated(function (){
  this.uploadOption = new ReactiveVar(false);
  this.uploadDocs = new ReactiveVar();
  this.uploadVid = this.data.spotlightData.video;
  this.test = "test";
  createVimeo(this);
});



Template.VideoUpload.helpers({
  uploadOption : function(){
        return Template.instance().uploadOption.get();
  },

  filesToUpload: function() {
    return Template.instance().uploadVid.list();
  },
  opts: function() {
    var self= this;
    var opts ={
      maxTime: 15*60, 
      // androidQuality: 0, 
      // videoDisplay: { 
      //   width: 600, 
      //   height: 460 
      // }, 
      // classes: { 
      //   recordBtn: 'video-capture-basic-record-btn', 
      //   stopBtn: 'video-capture-basic-stop-btn' 
      // }, 
      onVideoRecorded: function(err, base64Data) {
        //console.log('onVideoRecorded');
        self.videoData = base64Data;
        //Template.instance().uploadDocs.set({data: base64Data});

        var byteCharacters = atob(base64Data);

        function b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
              var slice = byteCharacters.slice(offset, offset + sliceSize);

              var byteNumbers = new Array(slice.length);
              for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
              }

              var byteArray = new Uint8Array(byteNumbers);

              byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {type: contentType});
            return blob;
        }

        var blob = b64toBlob(b64Data, contentType);
        var blobUrl = URL.createObjectURL(blob);

        
      }
    };
    return opts;
  }
});

Template.VideoUpload.events({
  'click .js-makeBtn' : function(evt){
      Template.instance().uploadOption.set('make');
      console.log(Template.instance().uploadOption.get());
  },
  'click .js-cancelBtn' : function(evt){
      Template.instance().uploadOption.set(false);
  },
  'click .js-uploadBtn' : function(evt){
      Template.instance().uploadOption.set('upload');
      console.log(Template.instance().uploadOption.get());
  },
  'click .js-saveBtn' : function(evt){
      
  },
  'change .myFileInput': function handleFileSelect(evt, template) {
            evt.stopPropagation()
            evt.preventDefault()
            console.log("upload time");
            var files = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files;//$(this).get(0).files
            var results = document.getElementById('results')

            /* Clear the results div */
            while (results.hasChildNodes()) results.removeChild(results.firstChild)

           
            var progressBar = {
              
              /**
               * Updat progress bar.
               */
              updateProgress: function (progress) {
                  progress = Math.floor(progress * 100)
                  var element = document.getElementById('progress')
                  element.setAttribute('style', 'width:' + progress + '%')
                  element.innerHTML = '&nbsp;' + progress + '%'
              },

              /* local function: show a user message */
              showMessage: function (html, type) {
                      /* hide progress bar */
                      document.getElementById('progress-container').style.display = 'none'

                      /* display alert message */
                      var element = document.createElement('div')
                      element.setAttribute('class', 'alert alert-' + (type || 'success'))
                      element.innerHTML = html
                      results.appendChild(element)
              }
            }

            /* Rest the progress bar and show it */
            progressBar.updateProgress(0);
            document.getElementById('progress-container').style.display = 'block';
            console.log(document.getElementById('accessToken').value);
            console.log(document.getElementById('upgrade_to_1080').checked);

            //console.log(template.test);
            //console.log(template.VimeoUpload);
            /* Instantiate Vimeo Uploader */
            var name  = document.getElementById('videoName').value
            var description = document.getElementById('videoDescription').value;
            (new template.VimeoUpload({
                name: name,
                description: description,
                private: document.getElementById('upgrade_to_1080').checked,
                file: files[0],
                token: document.getElementById('accessToken').value,
                upgrade_to_1080: document.getElementById('upgrade_to_1080').checked,
                onError: function(data) {
                    progressBar.showMessage('<strong>Error</strong>: ' + JSON.parse(data).error, 'danger')
                },
                onProgress: function(data) {
                    Session.set('unsavedChanges', true);
                    progressBar.updateProgress(data.loaded / data.total)
                },
                onComplete: function(videoId, index) {
                    var url = 'https://vimeo.com/' + videoId

                    if (index > -1) {

                        /* The metadata contains all of the uploaded video(s) details see: https://developer.vimeo.com/api/endpoints/videos#/{video_id} */
                        url = this.metadata[index].link //

                        /* add stringify the json object for displaying in a text area */
                        var pretty = JSON.stringify(this.metadata[index], null, 2)

                        console.log(pretty) /* echo server data */
                    }

                    Session.set('unsavedChanges', true);

                    template.uploadVid.push({filepath: url,
                      name: name, _id: videoId, index: index,
                      description: description });
                    console.log(template.uploadVid.array());
                  

                    progressBar.showMessage('<strong>Upload Successful</strong>: check uploaded video @ <a href="' + url + '">' + url + '</a>.')
                }
            })).upload();


        },
})