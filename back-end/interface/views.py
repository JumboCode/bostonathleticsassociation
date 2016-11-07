from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse

#https://docs.djangoproject.com/en/1.10/intro/tutorial03/

# Create your views here.
def view(request, event_id):
    pass

def index(request):
    context = {}
    return render(request, "signin.html", context)

def upload_csv(request):
    return HttpResponse("import csv data here")

