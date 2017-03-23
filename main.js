

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
	
	
Template.email.events({ // https://www.youtube.com/watch?v=IxDW1yL2R2o
  'submit #email-form':function(e,t){
	  e.preventDefault();
	  var toAddr=t.find('#inputEmail').value;
	  var subj=t.find('#inputSubject').value;
	  var body=t.call('#inputBody').value;
	  Meteor.call('sendEmail',toAddr,subj,body);
  }
});

if (Meteor.isServer) {	
	Meteor.startup(function(){
		// code to run server at startup
		process.env.MAIL_URL='smtp://postmaster%40sandboxbb0bf5d9b4514bd3bba5cb8bc2af9df1.mailgun.org:4eca808630d7c9b0aac50dac62a60121@smtp.mailgun.org:587';
		Accounts.emailTemplates.from='kev17404@yahoo.co.uk';
		Accounts.emailTemplates.sitename='My Site';
		
		Accounts.emailTemplates.verifyEmail.subject = function(user) {
			return 'Confirm Your Email Address';
		};
		Accounts.emailTemplates.verifyEmail.text = function(user, url) {
			return 'Click on the following link to verify your eMail address.' + url;
		};
});
}

//import { Template } from 'meteor/templating';
//import { ReactiveVar } from 'meteor/reactive-var';

//import './main.html';
// NOTE: when creating the class in the main.html the class has to be 
// only a few chars long. or the .js code will not work. FU




Template.showComments.helpers({
  comments : function() {
	  console.log("Comments: " +comments.find().count());
  return comments.find({}, {sort: {_id:-1}, limit: 5});
  }
});



Template.searchForm.events ({
	'submit .addDataForm' : function(event, instance){
		event.preventDefault();
		console.log("YOUR SEARCHING!");
		
		building = event.target.Building.value;
		 room = event.target.Room.value;
		 console.log(comments.find().count());
		 
		 var desc = roomsdb.findOne({"Building" : building , "Room" : room});
		 console.log(desc.Description);
		 window.alert(desc.Description);
		 
		 // 
		 //return desc.Description;
		 //document.getElementById("roomToDisplay").innerHTML =(desc.Description);​
	 
	}
});
Template.comments.events ({
	'submit .addCommentForm' : function(event, instance){
		event.preventDefault();
		var userD= Meteor.users.findOne(Meteor.userId);
		var date = new Date();
		var newDate = moment(date).format("DD.MM.YYYY");
		var commentto = event.target.Comment.value;
		
		if(event.target.dropdown.value == "anonymous"){
			console.log(event.target.dropdown.value);
		comments.insert({"Comment":commentto,"User": "Anonymous user","Date": newDate});
		}else{
		comments.insert({"Comment":commentto,"User": userD.emails[0].address,"Date": newDate});
		}
		event.target.Comment.value = "Please Enter Comment Here";
	}
});


Template.posts.helpers({
	charsRemaining: function(){
		return Session.get('CharactersRemaining');
	}
});

Template.posts.onRendered(function(){
	$("#postForm").validate();
});

Template.posts.events({
	'keyup #inputPost': function(event){
		var inputText = event.target.value;
		Session.set("CharactersRemaining",(500 - inputText.length) +" characters remaining");
	}
});

Template.posts.events({
	'keyup #inputPost': function(event){
		var inputText = event.target.value;
		Session.set("CharactersRemaining",(500 - inputText.length) +" characters remaining");
	},
	'submit #postForm': function(event){
		event.preventDefault();
		console.log("SUBMUT");
		var post = event.target.inputPost.value;
		var userD= Meteor.users.findOne(Meteor.userId);
		var date = new Date();
		var newDate = moment(date).format("DD.MM.YYYY");
		Session.set("CharactersRemaining",500 +" characters remaining");
		//comments.insert({"Comment":post,"User": userD.emails[0].address,"Date": newDate});
		
		if(event.target.dropdown.value == "anonymous"){
			console.log(event.target.dropdown.value);
		comments.insert({"Comment":post,"User": "Anonymous","Date": newDate});
		}else{
		comments.insert({"Comment":post,"User": userD.emails[0].address,"Date": newDate});
		}
		event.target.inputPost.value = "";

	}
});








		


  


