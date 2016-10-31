from django.shortcuts import render
from django.http import HttpResponse

#https://docs.djangoproject.com/en/1.10/intro/tutorial03/

# Create your views here.
def view(request, event_id):
    pass

def index(request):
    return HttpResponse("Hello, BAA employee")
