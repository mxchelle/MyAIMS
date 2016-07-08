

 Template.afArrayField_spotlight.helpers({
    templateType : function(){
      if(Session.get('currentType')==='Video'){
        return "makeVideo";
      }
      else if(Session.get('currentType')==='Photo'){
        return "fileUpload";
      }
      else if(Session.get('currentType')==='Text'){
        return "text";
      }
      else {
        return "text";
      }
    }
 });
