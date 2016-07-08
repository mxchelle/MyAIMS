
 Template.UploadForm.onCreated(function (){
    this.spotlightArray = ReactiveArray();
    var self = this;

    var hooksObject = {
      after: {
        insert: function(error, result) {
          if (error) {
            console.log("Insert Error:", error);
            Meteoris.Flash.set('error', 'Error inserting');
          } else {
            Meteoris.Flash.set('success', 'Successfully added');
            console.log("Document inserted:", result);
            Session.set('currentType', 'Success');
            console.log(this.docId);
            //FlowRouter.go('singleResource', {id: this.docId });
          }
        },
        update: function(error, result) {
           console.log("this: " + this._id);
          if (error) {
            console.log("Update Error:", error);
          } else {
            console.log("Document updated: " + result);
            Session.set('currentType', 'Success');
            FlowRouter.go('singleResource', {id: this.docId });
          }
        }
      }
    };
    
    AutoForm.addHooks("insertSpotlightForm", hooksObject);
 });

Template.UploadForm.helpers({
  type: function(){
    return Session.get('currentType');
  }
});