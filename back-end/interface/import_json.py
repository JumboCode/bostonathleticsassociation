from django.db import models
import jsonfield 

#load data by running python manage.py loaddata myfixture.json
#TODO we need to create a front-end interface for this

#TODO should we change some of these to bool fields?
#TODO verify format??
class Volunteer(models.Model):
    name = models.CharField()
    status = models.CharField()
    city = models.CharField()
    state = models.CharField()
    phone = models.CharField()
    email = models.CharField()
    num_years = models.IntField()
    jacket = models.CharField()
    jacket_size = models.CharField()
    group_name = models.CharField()
    #TODO this isn't always here what do?

    def __unicode__(self):
        return u ('%s, %s, %s, %s, %s, %s, %d, %s, %s, %s' %
                (self.name, self.status, self.city, self.state, self.phone, 
                    self.email, self.num_years, self.jacket, self.jacket_size, self.group_name))