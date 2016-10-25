from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def view(request, event_id):
    pass

def index(request):
    return HttpResponse("Hello, BAA employee")
