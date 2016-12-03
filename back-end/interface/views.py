from django.shortcuts import render
from django.shortcuts import render_to_response, redirect
from django.http import *
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout

#https://docs.djangoproject.com/en/1.10/intro/tutorial03/

# Create your views here.
def view(request, event_id):
    pass

# def index(request):
#     context = {}
#     return render(request, "signin.html", context)

def login_view(request):
    logout(request)
    username = password = ''
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            print('asdfsdfsdf')
            return HttpResponseRedirect('/interface/main/')
        else:
            #TODO: failed to login
            pass     
    return render(request, 'signin.html', {})

@login_required(login_url='/')
def main(request):
    print('main')
    context = {}
    return render(request, "main.html", context)

def upload_csv(request):
    return HttpResponse("import csv data here")

