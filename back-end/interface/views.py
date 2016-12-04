from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from .models import *
from .forms import DocumentForm

#https://docs.djangoproject.com/en/1.10/intro/tutorial03/

# Create your views here.
def view(request, event_id):
    pass

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
            pass     
    return render(request, 'signin.html', {})

#@login_required(login_url='/')
def main(request):
    context = {}
    return render(request, "main.html", context)

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



# from myproject.myapp.models import Document
# from myproject.myapp.forms import DocumentForm

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

