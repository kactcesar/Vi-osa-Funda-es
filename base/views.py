from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from .models import *

def index(request):
    return render(request, 'base/base.html')

def entrar(request):
    if request.method == 'POST':
        user = authenticate(username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            request.session.set_expiry(60)
            login(request, user)
            return HttpResponseRedirect(reverse('base:index'))
        else:
            return render(request, 'base/login.html')
        
    else:
        return render(request, 'base/login.html')   
        
        
def sair(request):
    logout(request)
    return HttpResponseRedirect(reverse(':entrar'))        
################################################################################################################################

from django.shortcuts import render, redirect

from . forms import CreateUserForm, LoginForm

from django.contrib.auth.decorators import login_required


# - Authentication models and functions

from django.contrib.auth.models import auth
from django.contrib.auth import authenticate, login, logout


def homepage(request):

    return render(request, 'base/base.html')




def register(request):

    form = CreateUserForm()

    if request.method == "POST":

        form = CreateUserForm(request.POST)

        if form.is_valid():

            form.save()

            return redirect("base:my-login")


    context = {'registerform':form}

    return render(request, 'base/register.html', context=context)



def my_login(request):

    form = LoginForm()

    if request.method == 'POST':

        form = LoginForm(request, data=request.POST)

        if form.is_valid():

            username = request.POST.get('username')
            password = request.POST.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:

                auth.login(request, user)

                return redirect("base:dashboard")


    context = {'loginform':form}

    return render(request, 'base/my-login.html', context=context)


def user_logout(request):

    auth.logout(request)

    return redirect("")



@login_required(login_url="my-login")
def dashboard(request):

    return render(request, 'base/dashboard.html')






