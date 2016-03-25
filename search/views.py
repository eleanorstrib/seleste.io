from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from search.models import Company, Glassdoor, Indeed 
import json
import requests
from search.indeed import get_soup, get_ratings, BASE_URL, RATING_DENOMINATOR, AVAILABLE_STARS

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
		print('priorities', priorities, type(priorities))

		all_company_data = {}

		for company in json_data:
			# add a company_name key to the dict, add Glassdoor data
			company_name = company['name']
			all_company_data[company_name] = []
			all_company_data[company_name] = all_company_data.get(company_name, []) + [{'glassdoor': company}]
			# initiate the web scraper to get data from Indeed
			soup = get_soup(BASE_URL, company_name)
			indeed_data = get_ratings(soup, company_name)
			if "no ratings available" not in indeed_data:
				all_company_data[company_name] = all_company_data.get(company_name, []) + [{'indeed': indeed_data}]
			else:
				print("no indeed data for", company_name)

		print(all_company_data)
			


	


	# for record in gd_data:
	# 	print(gd_data['name'])
	# 	models.Company.company_name = gd_data['name']
	# 	models.Glassdoor.company_name = gd_data['name']
	# 	models.Glassdoor.overall_rating = gd_data['overallRating']
	# 	models.Glassdoor.number_ratings = gd_data['numberOfRatings']
	# 	models.Glassdoor.culture_values_rating = gd_data['cultureAndValuesRating']
	# 	models.Glassdoor.management_rating = gd_data['seniorLeadershipRating']
	# 	models.Glassdoor.compensation_benefits_rating = gd_data['compensationAndBenefitsRating']
	# 	models.Glassdoor.opportunities_rating = gd_data['careerOpportunitiesRating']
	# 	models.Glassdoor.work_life_balance_rating = gd_data['workLifeBalanceRating']
	# 	models.Glassdoor.recommend_to_friend_rating = gd_data['recommendToFriendRating']

	return render(request, 'search/results.html', {})