# -*- coding: utf-8 -*-

import os, datetime #OS.environ is a dictionary of files in the .env file listing
import re # this is importing regex.

# This line imports Flask and its modules
from flask import Flask, request,render_template,redirect, abort 
#Flask is flask
#Request remote API?
#Render Template is templating module
#Redirect is pushing you somewhere else
#Abort is for 404's!

from mongoengine import * # This is how we communicate with MongoLabs this is included, because its in the requirements.txt
from unidecode import unidecode #unidecode is a slug helper module to create page slugs

# import all of mongoengine
# from mongoengine import *
from flask.ext.mongoengine import mongoengine

# import data models
import models

#import Boto - for Photos
import boto

from werkzeug import secure_filename

# Python Image Library
import StringIO

# conn = boto.connect_s3()

# for json needs
import json
from flask import jsonify

app = Flask(__name__)   # create our flask app
app.config['CSRF_ENABLED'] = False #Cross Site Request Forgery - our forms are good....no security needed...Turning it on causes error because there's not a module.
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # 16 megabyte file upload

# --------- Database Connection ---------
# MongoDB connection to MongoLab's database
connect('mydatabase', host=os.environ.get('MONGOLAB_URI'))
app.logger.debug("Connecting to MongoLabs")

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])


#----------	S3 Boto Connections -----------
from boto.s3.connection import S3Connection
from boto.s3.key import Key
conn = S3Connection(os.environ.get('AWS_ACCESS_KEY_ID'),os.environ.get('AWS_SECRET_ACCESS_KEY'))
app.logger.debug("Connecting to AWS")



# --------- Routes ----------

#This is the Home Page
@app.route("/")
def index():
	user_form = models.UserForm(request.form)

	templateData={
	'user': models.User.objects(),
	'form': user_form
	}
	app.logger.info(models.User.objects())
	return render_template('main.html', **templateData)


#For Adding a New Dog 
@app.route("/newdog", methods=["POST"])
def newdog():

	# Did the client make a POST request?
	if request.method == "POST":

		# get form data - create new user
		user = models.User()

		# get the form data submitted and store it in a variable
		user.first_name = request.form.get('first_name', 'you did not enter a first name!')

		user.last_name = request.form.get('last_name', 'you did not enter a last name!')
		# return custom HTML using the user submitted data
		
		user.email = request.form.get('email', 'you did not enter a email!')
		# return custom HTML using the user submitted data
		
		user.password = request.form.get('password', 'you did not enter a password!')
		# return custom HTML using the user submitted data
		user.save()

		templateData = {
			'userentries' :models.User.objects(),
		}

		return render_template('newdog.html', **templateData)

#This is the explore route 
@app.route("/finddogparks", methods=['GET','POST'])
def finddogparks():
	# get dog form model from models.py
	# dogsize = ['Large(>100)','Medium(>100)','Small(>0)']
	# dog_form = models.DogForm(request.form)

	
	
	# if request.method == "POST" and dog_form.validate():
	if request.method == "POST" :
		# get form data - create new dog

		dog = models.Dog()
		dog.dog_name = request.form.get('dog_name','anonymous')
		dog.breed = request.form.get('dog_breed','no title')
		dog.slug = slugify(dog.breed + " " + dog.dog_name)
		dog.age = request.form.get('dog_age','')
		dogsize = request.form.getlist('dog_size')
		dog.save()
		
		venue=models.Venue()
		
		templateData = {
					'dogsentries' :models.Dog.objects(),
					'venueentries' :models.Venue.objects()
				}
		
		
		return render_template('finddogparks.html',**templateData)
	else:

		templateData = {
			'dogsentries' :models.Dog.objects(),
			'venueentries' :models.Venue.objects()
			}

		
		return render_template('finddogparks.html',**templateData)
	

@app.route("/venueName")
def venueName():
	return render_template('venueName.html')



# This is the About Route
@app.route("/about")
def about():
	return render_template('about.html')



#Define an Error ROUTE
@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


# USING UNIDECODE TO CREATE SLUGS
# via http://flask.pocoo.org/snippets/5/
_punct_re = re.compile(r'[\t !"#$%&\'()*\-/<=>?@\[\\\]^_`{|},.]+')
def slugify(text, delim=u'-'):
	"""Generates an ASCII-only slug."""
	result = []
	for word in _punct_re.split(text.lower()):
		result.extend(unidecode(word).split())
	return unicode(delim.join(result))



# STARTING THE WEBSERVER
if __name__ == "__main__":
	app.debug = True
	
	port = int(os.environ.get('PORT', 5000)) # locally PORT 5000, Heroku will assign its own port
	app.run(host='127.0.0.1', port=port)
	# app.run(host='0.0.0.0', port=port)