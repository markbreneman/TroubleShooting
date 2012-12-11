# -*- coding: utf-8 -*-
from mongoengine import *

from flask.ext.mongoengine.wtf import model_form
from wtforms.fields import * # for our custom signup form
from flask.ext.mongoengine.wtf.orm import validators
from flask.ext.mongoengine import *
from datetime import datetime

import logging

class Log(Document):
	text = StringField()
	timestamp = DateTimeField(default=datetime.now())

class Dog(Document):

	dog_name = StringField(max_length=120, required=True, verbose_name="Dog Name", help_text="Please enter your dogs name")
	breed = StringField(max_length=120, required=True, verbose_name="Breed", help_text="Please enter your dogs breed")
	age = IntField(required=True, verbose_name="Age", help_text="How old is your Dog")

	# Category is a list of Strings
	dogsize = ListField(StringField(max_length=30))


	# Timestamp will record the date and time idea was created.
	timestamp = DateTimeField(default=datetime.now())
	
	slug = StringField()

# DogForm = model_form(Dog) 

class User(Document):
	first_name = StringField(max_length=120, required=True, verbose_name="First Name", help_text="First Name")
	last_name = StringField(max_length=120, required=True, verbose_name="Last Name", help_text="Last Name")
	email = EmailField(max_length=120, required=True, verbose_name="First Name", help_text="Email")
	password = StringField(required=True, verbose_name="Password", help_text="Password")
	# dogs = ListField( EmbeddedDocumentField(Dog) )
	# Timestamp will record the date and time idea was created.
	timestamp = DateTimeField(default=datetime.now())
	
	slug = StringField()

# Create a Validation Form from the User model
UserForm = model_form(User)


class Venue(Document):

	venue_name = StringField(max_length=120, required=True, verbose_name="Venue Name", help_text="Please enter a Venue Name")
	venue_address = StringField(max_length=120, required=True, verbose_name="Venue Address", help_text="Please enter a Venue Address")
	timestamp = DateTimeField(default=datetime.now())

VenueForm =Venue

# FOR PHOTO UPLOAD

class Image(mongoengine.Document):

	# title = mongoengine.StringField(max_length=120, required=True)
	# description = mongoengine.StringField()
	# postedby = mongoengine.StringField(max_length=120, required=True, verbose_name="Your name")
	
	# tags = mongoengine.ListField( mongoengine.StringField())

	filename = mongoengine.StringField()

	# # Comments is a list of Document type 'Comments' defined above
	# comments = mongoengine.ListField( mongoengine.EmbeddedDocumentField(Comment) )

	# Timestamp will record the date and time idea was created.
	timestamp = mongoengine.DateTimeField(default=datetime.now())


photo_form = model_form(Image)

# Create a WTForm form for the photo upload.
# This form will inherit the Photo model above
# It will have all the fields of the Photo model
# We are adding in a separate field for the file upload called 'fileupload'
class photo_upload_form(photo_form):
	fileupload = FileField('Upload an image file', validators=[])



	

