from django.test import TestCase, Client
from django.contrib.auth.models import User
from api.models import *
import os

# Create your tests here.
class Model_tests(TestCase):
    def test_volunteer(self):
        store = Volunteer(name="Ian", email="ian@ianluo.com", 
                          phone="1231231234", city="medford",
                          jacket="yes", jacket_size="M")
        self.assertEqual(store.name, "Ian")
        store.save() # store into the db

        retrieved = Volunteer.objects.get(name="Ian")
        self.assertEqual(store.email, retrieved.email)

    def test_event(self):
        store = Event(name="Boston Marathon")
        store.date = "12/02/1994" # this is my birthday!
        store.save()

        retrieve = Event.objects.get(name="Boston Marathon")
        self.assertEqual(retrieve.date, "12/02/1994")

    def test_attendee(self):
        self.test_volunteer()
        self.test_event()

        ian = Volunteer.objects.get(name="Ian")
        ians_bday = Event.objects.get(name="Boston Marathon")
        john_cena = Volunteer(name="John Cena").save()

        new_attendee = Attendee(volunteer=ian, event=ians_bday, at_event=True, notes="Was lit", team_captain=john_cena)
        new_attendee.save()

        retrieve = Attendee.objects.get(notes="Was lit")
        self.assertEqual(retrieve.volunteer.name, "Ian")


class API_tests(TestCase):

    def setUp(self):
        User.objects.create_user(username='test-user', password='asdfasdfasdf')

    def test_token(self):
        c = Client()
        response = c.post('/api-token-auth/', {'username': 'test-user', 'password': 'asdfasdfasdf'})
        self.assertIsNotNone(response.json()['token'])
        self.assertIsNotNone(response.json()['first_name'])



    def test_events(self):
        # gets an event and a teamcaptain and just tries to check someone in
        c = Client()
        token = c.post('/api-token-auth/', {'username': 'test-user', 'password': 'asdfasdfasdf'}).json()['token']
        response = c.get('/api/events/', HTTP_AUTHORIZATION = 'Token ' + token)
        # lets try to get the list of events through the database as well to check both are fine
        events = Event.objects.all()
        # self.assertEqual(len(response.json()), len(events))
        # self.assertNotEqual(len(response.json()), 0)



class Integration_tests(TestCase):
    def test_email(self):
        self.assertIsNotNone(os.getenv('EMAIL_PASS'))
