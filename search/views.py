from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect, HttpResponse, QueryDict
from django.views.decorators.csrf import ensure_csrf_cookie
from search.models import Company, Glassdoor, Indeed 
import json
import requests
from search.indeed import get_soup, get_ratings, BASE_URL, RATING_DENOMINATOR, AVAILABLE_STARS
from search.company_data import sum_reviews, weighted_average_company, weight_ratings
from django.http import JsonResponse
from operator import itemgetter

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
			
		co_num = 3
		results = {}
		final_results = {}
		sorted_scores = []

		for i in range(co_num):
			current_gd = gd_data[i]
			current_indeed = in_data[i]
			company_name = current_gd['name']
			results[company_name] = {}
			results = sum_reviews(company_name, results, current_gd, current_indeed)
			wt_avg_co = weighted_average_company(weight_ratings, results, company_name, current_gd, current_indeed)
			sorted_scores.append((company_name, results[company_name]['score']))
			

		sorted_scores = sorted(sorted_scores,key=itemgetter(1))
		final_results['sorted_scores'] = sorted_scores
		final_results['results'] = results
		final_results['weight_pct'] = weight_ratings(priorities)
		final_results['gd_data'] = gd_data
		print(final_results)

		return HttpResponse(json.dumps(final_results),
            content_type="application/json")

	else:
		return HttpResponse("there was an error")

	


