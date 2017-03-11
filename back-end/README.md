# Jumbocode Boston Athletics Backend Django API Server

### 1. About


This is the Backend server running Django for this project. This server will serve the API end point and the managing interface for the super admins.

### 2. Setup


 1. Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [python3](https://www.python.org/downloads/mac-osx/) and [pip](http://stackoverflow.com/questions/17271319/installing-pip-on-mac-os-x).
 2. Checkout this current repository with `git clone`
 3. Install virtualenv with `sudo pip install virtualenv`
 4. `cd` into this folder (JumboCode_BostonAthleticsAssociation/back-end)
 5. Create a virtual environment with python3 by running `virtualenv -p python3 env`
 6. Activate your virtual environment with `source env/bin/activate`
 7. Use the correct settings by running `export DJANGO_SETTINGS_MODULE=BAA.settings.dev` on dev environments.
 8. Create a temporary email password with `export EMAIL_PASS=asdf`. The actual values will be replaced on the deploy server
 9. Install the python dependencies `pip install -r requirements.txt`
 10. Run `python manage.py migrate` to create/update the databse if necessary. On dev environment, this will create a sqlite3 file to simulate an actual database.
 11. Create a super admin account with: `python manage.py createsuperuser`
 12. Run the server with `python manage.py runserver`
 13. Visit the site at `localhost:8000`

P.S.: Run automated tests with `python manage.py test`

Note: Steps 4, 6, 7 and 11 are necessary every time! The admin page is at `localhost:8000/admin`

### 3. Notes

1) The current interface for the api can be read in nicely generated doc form by going to "localhost:8000/docs"

2) The current permission set allows for anyone to perform the GET requests, but requires the user to be signed in to
   django/admin in order to post or delete data.

### 4.  Dummy Data

1) In order to help with the acessibility and testing of the api, in the fixures folder of the api, there is a
  (currently) very small data set that can be used to seed local databases.

  In order to seed a local database - simply call python manage.py loaddata <filename> where in this case the file name
  is "data_small.json"

2) This data lives in the repo, so although the command will most likely only be called once - it can be called
   whenever a database needs to be re-initialized with data.
