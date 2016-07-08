Template.videoInfo.helpers({
  getPlayer: function(id, url){

    if(url.indexOf("vimeo.com") > -1){
      return "https://player.vimeo.com/video/"+id;
    }

    if(url.indexOf("youtube.com") > -1 || url.indexOf("youtu.be") > -1){
      return "https://www.youtube.com/embed/video/"+id;
    }
    return url;
  },
});