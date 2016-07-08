AutoForm.addInputType("fileUpload", {
  template: "afMyFileUpload",
  isHidden: false,
  valueOut: function () {
    var result = [];
    var data = this.find('.data-field');
    /*this.find('.data-field').each(function(index, element){
      
    });*/
    console.log(this);

    for(var i=0; i< data.length; i++){
      var element = data[i];
      result.push({"name":element.attr("id"), "filename": element.val()});
    }
    console.log(result);
    return result;//this.val();
  }
});

//template level subscription
 Template.afMyFileUpload.onCreated(function (){
  this.uploadThumb = new ReactiveArray([]); 
 });




Template.afMyFileUpload.helpers({
  thisId: function (){
    this.formId = new ReactiveVar(this.atts.id);
    return this.formId.get();// this.atts.id;
  },
  myCallbacks: function () {

    var self = this;
    var template = Template.instance();
    
    return {
        finished: function(index, fileInfo, context) {
         // console.log("fileinfo");
         // console.log(fileInfo);
          //$("#"+self.formId.get()).val(fileInfo.url);
          //self.uploadThumb = self.uploadThumb.push(fileInfo).splice(0);
          
          //console.log(Template.instance());
          template.uploadThumb.push(fileInfo);
          console.log(template.uploadThumb);
        },
    }
  },
  filesToUpload: function() {
    return Template.instance().uploadThumb.list();//Template.instance().uploadThumb.get();
  },

})


Template['uploadedInfo'].helpers({
  src: function() {
   // if (this.type.indexOf('image') >= 0) {
      return 'upload/' + this.path;
    //} else return 'file_icon.png';
  }
});

Template['uploadedInfo'].events({
  'click .deleteUpload':function() {
    if (confirm('Are you sure?')) {
      Meteor.call('deleteFile', this._id);
    }
  }
})

/*
Template.afInputFileUpload.helpers({
  myCallbacks: function() {
    return {
        ...
        validate: function(file) { ... }
    }
  }
})

*/

/*
Template["afMyFileUpload"].helpers({
  myCallbacks: function() {
    return {
        finished: function(index, fileInfo, context) {
            console.log(fileInfo.name);
            console.log("herjke");
            $("#"+this._id).val(fileInfo.name);
        }
    }
  }
});


Template.afMyFileUpload.helpers({
  myCallbacks: function() {
    return {
        finished: function(index, fileInfo, context) {
            console.log(fileInfo.name);
            console.log("herjke");
            $("#"+this._id).val(fileInfo.name);
        }
    }
  }
})

/*
Template["afMyFileUpload"].helpers({
  thisId : function(){
    console.log(this._id);
    return this._id;
  },
  insertIntoUpload: function() {
    return {
        finished: function(index, fileInfo, context) { 
          
        },
        
    }
  }
});

Template["afRadio"].helpers({
  atts: function selectedAttsAdjust() {
    var atts = _.clone(this.atts);
    if (this.selected) {
      atts.checked = "";
    }
    return atts;
  }
});

/*
Template.afMyFileUpload.helpers({
  
})*/


//get filename from server image(1).jpg, put it in a hidden field
//extract filename from field. that gets attached to schema, while image goes in folder.
//if imagename removed, remove file