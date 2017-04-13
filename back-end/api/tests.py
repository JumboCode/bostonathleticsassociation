from django.test import TestCase, Client
from django.contrib.auth.models import User
from api.models import *
import datetime
import os
from django.core import mail

# Create your tests here.
class Model_tests(TestCase):
    def test_volunteer(self):
        store = Volunteer(first_name="Ian", last_name="Luo", email="ian@ianluo.com",
                          phone="1231231234", city="medford", state="MA")
        self.assertEqual(store.first_name, "Ian")
        store.save() # store into the db

        retrieved = Volunteer.objects.get(first_name="Ian")
        self.assertEqual(store.email, retrieved.email)

    def test_event(self):
        store = Event(name="Boston Marathon")
        store.date = "1994-12-02" # this is my birthday!
        store.save()

        retrieve = Event.objects.get(name="Boston Marathon")
        self.assertEqual(retrieve.date, datetime.date(1994, 12, 2))

    def test_attendee(self):
        self.test_volunteer()
        self.test_event()

        ian = Volunteer.objects.get(first_name="Ian")
        ians_bday = Event.objects.get(name="Boston Marathon")
        john_cena = Volunteer(first_name="John", last_name="Cena").save()

        new_attendee = Attendee(volunteer=ian, event=ians_bday, status=1, notes="Was lit", team_captain=john_cena,
                                assignment_id=123, job_descrip="Eat Food")
        new_attendee.save()

        retrieve = Attendee.objects.get(notes="Was lit")
        self.assertEqual(retrieve.volunteer.first_name, "Ian")

    def test_new_cool_profile(self):
        user = User.objects.create_user('holeyness', 'asdf@asdf.com')
        user.set_password('19941202')
        user.save()
        # This should have created a User object which alongside has a Profile object

        temp_volunteer = Volunteer.objects.create(first_name='Yoooo', email='asdf@asdf.com')
        temp_volunteer.save()
        user.volunteer = temp_volunteer
        user.save()

        # Let's retrieve it
        my_user = User.objects.get(username='holeyness')
        self.assertEqual(user.volunteer.first_name, 'Yoooo')

    def test_token(self):
        """Make sure a token was created"""
        myuser = User.objects.create_user('plzwork', 'work@work.com')
        myuser.set_password('123123123')
        myuser.save()

        self.assertIsNotNone(Token.objects.get(user=myuser))

class API_tests(TestCase):
    token = "k"

    def setUp(self):
        self.token = ""
        sampletestuser = User.objects.create(username='yourmom')
        sampletestuser.set_password('hihihihi')
        sampletestuser.save()
        # This should create a token and a Profile obj
        sampleEvent = Event.objects.create(name='My Super Cool Event', date='2017-12-02')
        sampleEvent.save()
        sampleVolunteer = Volunteer.objects.create(first_name='My Volunteer')
        sampleVolunteer.save()
        sampleTeamCap = Volunteer.objects.create(first_name='Sample Team Cap')
        sampleTeamCap.save()
        sampleTeamCapAttendee = Attendee.objects.create(volunteer=sampleTeamCap,
                                                        event=sampleEvent,
                                                        status=1,
                                                        team_captain=sampleTeamCap,
                                                        assignment_id=5)
        sampleTeamCapAttendee.save()
        sampletestuser.profile.volunteer = sampleVolunteer
        sampletestuser.save()
        sampletestuser.profile.save()

        # Create an attendee
        sampleAttendee = Attendee.objects.create(volunteer=sampleVolunteer,
                                                 event=sampleEvent,
                                                 status=0,
                                                 team_captain=sampleTeamCap,
                                                 assignment_id=5,
                                                 job_descrip='Wtf this kid didnt do shit'
                                                 )
        sampleAttendee.save()

        self.token = str(Token.objects.get(user=sampletestuser))

    def test_token(self):
        c = Client()
        response = c.post('/api-token-auth/', {'username': 'yourmom', 'password': 'hihihihi'})
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.json()['token'])
        self.assertIsNotNone(response.json()['first_name'])
        self.assertIsNotNone(response.json()['volunteers'])

    def test_events(self):
        c = Client()
        response = c.get('/api/events/', {}, HTTP_AUTHORIZATION='Token ' + self.token)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(any(x['name'] == 'My Super Cool Event' for x in response.json()))

        response = c.delete('/api/events/' + str(response.json()[0]['id']) + '/', {}, HTTP_AUTHORIZATION='Token ' + self.token)
        self.assertIn(response.status_code, range(200, 300))


class Integration_tests(TestCase):
    """This full integration test will test the entire pipeline"""
    c = Client()
    def setUp(self):
        """Set it up
        Get the token
        Get the file"""

        self.c = Client()

        # Create a superuser
        sampleSuperUser = User.objects.create(username='god', email='example@example.com')
        sampleSuperUser.set_password('iamthegod')
        sampleSuperUser.is_superuser = True
        sampleSuperUser.save()

        self.token = str(Token.objects.get(user=sampleSuperUser))

        self.file = open(os.path.join(os.path.dirname(__file__), 'testCSV.csv'))

    def testIntegrate(self):
        response = self.c.post('/api/events/', {'name': 'BAA Event', 'date': '2017-12-21', 'csv': self.file},
                               HTTP_AUTHORIZATION='Token ' + self.token)
        # Created the event
        # Lets send the emails
        eventid = str(response.json()['id'])
        response = self.c.get('/api/notify_captains/event/' + eventid + '/', {}, HTTP_AUTHORIZATION='Token ' + self.token)

        # Let's check the outbox
        self.assertEqual(response.status_code, 200)     # Make sure our emails sent

        # WOAH!?!?!?!? I just parsed some cool email and pw out of that
        email = mail.outbox[0].body.split("username is:  ")[1].split('\n')[0] or ""
        pw = mail.outbox[0].body.split("password is:  ")[1].split('\n')[0] or ""

        self.assertIsNot(email, "")
        self.assertIsNot(pw, "")

        # We are now a mobile client, we will use these username and pw to get my volunteers
        response = self.c.post('/api-token-auth/', {'username': email, 'password': pw})

        self.assertIsNotNone(response.json()['token']) # Make sure I have a token
        self.assertIsNotNone(response.json()['first_name'])
        self.assertIsNot(response.json()['first_name'], "") # Make sure my first name isnt empty
        self.assertIsNotNone(response.json()['volunteers'])

        # Lets do some specific checkings for thsi volunteer
        volunteers = response.json()['volunteers']
        self.assertTrue(any(vol['volunteer']['first_name'] == 'Mary' and vol['volunteer']['last_name'] =='Miller' for vol in volunteers))
        self.assertTrue(any(vol['volunteer']['first_name'] == 'Tufts' and vol['volunteer']['last_name'] =='University' for vol in volunteers))
        self.assertTrue(all(vol['team_captain']['first_name'] == 'Spencer' for vol in volunteers))


