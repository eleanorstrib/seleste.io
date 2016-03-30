from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from search.models import Company, Glassdoor, Indeed 
import json
import requests
from search.indeed import get_soup, get_ratings, BASE_URL, RATING_DENOMINATOR, AVAILABLE_STARS
from search.company_data import merge_data

def home(request):
	return render(request, 'search/index.html', {})

@ensure_csrf_cookie
def companies(request):
	return render_to_response('search/companies.html', {})


def results(request):
	if request.method == 'POST':
		data = request.body.decode("utf-8")
		json_data = json.loads(data)
		priorities = json_data.pop(0)

		# this dict will hold all of the Glassdoor and Indeed data
		all_company_data = {}

		#this dict will hold the summary data for ranking
		ranked_cos = {}

		for company in json_data:
			company_name = company['name']
			all_company_data[company_name] = [{'glassdoor':company}]

			# initiate the web scraper to get data from Indeed
			soup = get_soup(BASE_URL, company_name)
			indeed_data = get_ratings(soup, company_name)
			if "no ratings available" not in indeed_data:
				all_company_data[company_name] = all_company_data.get(company_name, []) + [{'indeed': indeed_data}]
			else:
				print("no indeed data for", company_name)

			merge_data(all_company_data, priorities)

		for co in all_company_data:
			ranked_cos[co] = all_company_data[co][-1]['ranked']['total_score']

		print ("this is the ranked company list: ", ranked_cos)

	return render(request, 'search/results.html', {'ranked_cos': ranked_cos})

	


