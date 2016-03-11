from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect, HttpResponse 
import json

def home(request):
	return render(request, 'search/index.html', {})

def companies(request):
	if(request.GET.get('next-companies')):
		print (request.GET.get('next-companies'))
		# priorities = request.session['priorities']
		print ('priorities')
	return render_to_response('search/companies.html', {})


def results(request):
	return render(request, 'search/results.html', {})