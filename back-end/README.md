Jumbocode Boston Athletics Backend
===============

## Table of Contents ##
----------------------------------------------------------

1. About
2. Setup
3. Who's doing what?

----------------------------------------------------------

1. About
========

This is the Backend server running Django for this project. This server will serve the API end point and the managing interface for the super admins.

2. Setup
=======

 1. Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [python3](https://www.python.org/downloads/mac-osx/) and [pip](http://stackoverflow.com/questions/17271319/installing-pip-on-mac-os-x).
 2. Checkout this current repository with `git clone`
 3. Install virtualenv with `sudo pip install virtualenv`
 4. `cd` into this folder (JumboCode_BostonAthleticsAssociation/back-end)
 5. Create a virtual environment with python3 by running `virtualenv -p python3 env`
 6. Activate your virtual environment with `source env/bin/activate`
 7. Use the correct settings by running `export DJANGO_SETTINGS_MODULE=BAA.settings.dev` on dev environments.
 8. Install the python dependencies `pip install -r requirements.txt`
 9. Run `python manage.py migrate` to create/update the databse if necessary. On dev environment, this will create a sqlite3 file to simulate an actual database.
 10. Create a super admin account with: `python manage.py createsuperuser`
 11. Run the server with `python manage.py runserver`
 12. Visit the site at `localhost:8000`


Note: Steps 4, 6, 7 and 11 are necessary every time! The admin page is at `localhost:8000/admin`


3. Who's Doing What?
======

4. API:

Interface:

1) The current interface for the api can be read in nicely generated doc form by going to "localhost:8000/docs"

2) The current permission set allows for anyone to perform the GET requests, but requires the user to be signed in to
   django/admin in order to post or delete data.

======