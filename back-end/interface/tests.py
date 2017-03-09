from django.test import TestCase, Client


class InterfaceTests(TestCase):
    def test_homepage(self):
        "Make sure the home page is up"
        c = Client()
        res = c.get('/')
        self.assertEqual(200, res.status_code)

    def test_annonymous_login(self):
        "Annonymous users should be redirected"
        c = Client()
        res = c.get('/interface/main')
        self.assertIn(res.status_code, [301, 302])