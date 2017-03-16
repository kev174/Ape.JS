Resolutions = new Mongo.Collection('resolutions');


if (Meteor.isClient) {	
	Template.body.helpers({
		resolutions: function(){
			return Resolutions.find();
		}
});
}
	
	
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

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
// NOTE: when creating the class in the main.html the class has to be 
// only a few chars long. or the .js code will not work. FU
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.increment = new ReactiveVar(0);
  this.decrement = new ReactiveVar(20);
});

Template.hello.helpers({
  increment() {
    return Template.instance().increment.get();
  },
  decrement() {
    return Template.instance().decrement.get();
  },
});

Template.hello.events({
  'click .inc, click .both'(event, instance) {
    // increment the counter when button is clicked
    instance.increment.set(instance.increment.get() + 1);
  },
  'click .dec, click .both'(event, instance) {
    // increment the counter when button is clicked
    instance.decrement.set(instance.decrement.get() - 1);
  },
});

//Template.comments.helpers({
  //comments : function() {
    //return Comments.find();
  //}
//});

Template.data.helpers({
  roomsdb : function() {
	  console.log(roomsdb.findOne("Building" : building, "Room" : room).Room);
    return roomsdb.findOne("Building" : building, "Room" : room);
  }
});



Template.data.helpers({
  roomsdb : function() {
	  
	 //var building = event.target.Building.value;
	//var room = event.target.Room.value;
	
	 console.log("YEP");
	 
	 
	 
return roomsdb.findOne("Building" : building, "Room" : room);  }
});

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



Template.data.events({
  'click #delete' : function(event, instance) {
	  // Remove the vehicle with current id
	  rooms.remove(this._id)
  }
});
