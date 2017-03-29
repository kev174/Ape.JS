if (Meteor.isClient) {	
	Template.body.helpers({
		resolutions: function(){
			return Resolutions.find();
		}
});
}

UI.registerHelper("getImageUser", function (userId) {
    var user= Meteor.users.findOne(userId);
    if (user.services)
    {
        if (user.services.facebook)
            return user.services.facebook.picture;
        if (user.services.twitter)
            return user.services.twitter.profile_image_url;
        if (user.services.google)
            return user.services.google.picture;
    }
    else
    {
        return "images/alien.gif";
    }
});

if (Meteor.isServer) {	
	Meteor.startup(function(){
		// code to run server at startup
		process.env.MAIL_URL='smtp://postmaster%40sandboxbb0bf5d9b4514bd3bba5cb8bc2af9df1.mailgun.org:4eca808630d7c9b0aac50dac62a60121@smtp.mailgun.org:587';
		//Accounts.emailTemplates.from='kev17404@yahoo.co.uk';
		Accounts.emailTemplates.sitename='My Site';
		
		Accounts.emailTemplates.verifyEmail.subject = function(user) {
			return 'Confirm Your Email Address';
		};
		Accounts.emailTemplates.verifyEmail.text = function(user, url) {
			return 'Click on the following link to verify your eMail address.' + url;
		};
});
}

Template.searchForm.events ({
	'submit .addDataForm' : function(event, instance){
		event.preventDefault();
		console.log("YOUR SEARCHING!");
		
		building = event.target.Building.value;
		 room = event.target.Room.value;
		 
		 var desc = roomsdb.findOne({"Building" : building , "Room" : room});
		 console.log(desc.Description);
		 window.alert(desc.Description);
		 // 
		 //return desc.Description;
		 //document.getElementById("roomToDisplay").innerHTML =(desc.Description);​
	 
	}
});

Template.searchForm.helpers({
  roomsdb : function() {
	  
	 //var building = event.target.Building.value;
	//var room = event.target.Room.value;
	 console.log("HI"); 
	 //var desc = roomsdb.findOne({fields: {building: "MainConcourse","Building" : "AC213"} });
    //console.log(desc.Description); 
    //return roomsdb.find();
  }
});
