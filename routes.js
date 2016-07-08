FlowRouter.route('/', {
    action: function() {
    	BlazeLayout.render('home');
 	 }
});

var resourceRoutes = FlowRouter.group({
    prefix: '/resources',
    name: 'resourcePath',
});


resourceRoutes.route('/',{
 	name :'resources',
 	action: function(){
 		BlazeLayout.render('home');
 	} 
 });

FlowRouter.route('/uploadMe',{
 	name :'uploadTest',
 	action: function(){
 		BlazeLayout.render('SpotlightUpload');
 	} 
 });

