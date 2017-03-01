from django.shortcuts import render, render_to_response, redirect
from django.http import *
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from .models import *
from .forms import DocumentForm
from rest_framework.authtoken.models import Token
from api.models import Event
from django.core import serializers
import json
from django.utils.safestring import mark_safe
#from api.serializers import EventSerializer

#https://docs.djangoproject.com/en/1.10/intro/tutorial03/

# Create your views here.

def login_view(request):
    logout(request)
    username = password = ''
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect('/interface/main/')
        else:
            #TODO: failed to login
            return render(request, 'signin.html', {})
    return render(request, 'signin.html', {})

@login_required(login_url='/')
def main(request):
    user_token = Token.objects.get(user=request.user)
    entries = serializers.serialize("json", Event.objects.all().order_by('date'))
    entries = mark_safe(entries)
    context = {"token": user_token, "entries": entries}
    return render(request, "main.html", context)

@login_required(login_url='/')
def upload_csv(request):
    # if request.method == 'POST':
    #     form = DocumentForm(request.POST, request.FILES)
    #     if form.is_valid():
    #         print("success")
    #         # handle_uploaded_file(request.FILES['file'])
    #         # return HttpResponseRedirect('/interface')
    # else:
    #     form = DocumentForm()
    context = {}
    return render(request, "list.html", context)



@login_required
def list(request):
    # return HttpResponse("testing")

    # Handle file upload
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            newdoc = Document(docfile = request.FILES['docfile'])
            newdoc.save()

            # Redirect to the document list after POST
            # return HttpResponseRedirect(reverse('interface.views.list'))
            return render(request, "list.html", {})
    else:
        form = DocumentForm() # A empty, unbound form

    # Load documents for the list page
    documents = Document.objects.all()

    # Render list page with the documents and the form-this is breaking for some reason
    return render(request, "list.html", {})
    #'documents': documents, 'form': form

