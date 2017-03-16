//Resolutions = new Mongo.Collection('resolutions');

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
        return "images/withOutPhoto.png";
    }
});

/*Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
    }
    return user;
});*/
	
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

Template.comments.helpers({
  comments : function() {
    return Comments.find();
  }
});

Template.data.helpers({
  vehicles : function() {
    return Vehicles.find();
  }
});

Template.addData.events({
	'submit .addDataForm' : function(event, instance) {
		event.preventDefault();
		Vehicles.insert({make:event.target.make.value,
			model:event.target.model.value,
			age:event.target.age.value,
			milage:event.target.milage.value});
  }
});

Template.data.helpers({
  vehicles : function() {
	  console.log(Vehicles.find().fetch());
    return Vehicles.find();
  }
});

Template.findUs.helpers({
  loggedIn : function() {
    return !!Meteor.user();
  }
});

Template.data.events({
  'click #delete' : function(event, instance) {
	  // Remove the vehicle with current id
	  Vehicles.remove(this._id)
  }
});
