from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect, HttpResponse, QueryDict
from django.views.decorators.csrf import ensure_csrf_cookie
from search.models import Company, Glassdoor, Indeed 
import json
import requests
from search.indeed import get_soup, get_ratings, BASE_URL, RATING_DENOMINATOR, AVAILABLE_STARS
from search.company_data import tabulate
from django.http import JsonResponse

def home(request):
	return render(request, 'search/index.html', {})

@ensure_csrf_cookie
def companies(request):
	return render(request, 'search/companies.html', {})


def results(request):
	# catch in case T/F vars not cleaned in client
	true = True
	false = False

	if request.method == 'POST':
		data=request.body.decode('utf-8')
		all_user_inputs = json.loads(data)
		priorities = all_user_inputs[0]
		gd_data = all_user_inputs[1:]
		in_data = []
	# 	# initiate the web scraper to get data from Indeed
		for co in gd_data:
			try:
				co_name = co['name']
				soup = get_soup(BASE_URL, co_name)
				indeed_data = get_ratings(soup, co_name)
				in_data.append(indeed_data)
			except:
				co_name = co['none']
			
		final_results = tabulate(in_data, gd_data, priorities)
		print ("these are the final results")
		print (final_results)

		return HttpResponse(final_results)

	else:
		return HttpResponse("there was an error")

	


