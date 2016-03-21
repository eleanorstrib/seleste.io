from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie 
import json

def home(request):
	return render(request, 'search/index.html', {})

@ensure_csrf_cookie
def companies(request):

	return render_to_response('search/companies.html', {})


def results(request):
	data= request.body
	print(data, "data")
	return render(request, 'search/results.html', {})