from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from search.models import Company, Glassdoor, Indeed 
import json
import ast

def home(request):
	return render(request, 'search/index.html', {})

@ensure_csrf_cookie
def companies(request):
	return render_to_response('search/companies.html', {})


def results(request):
	data = request.body
	print(data)
	print(type(data))
	print (json.loads(data))

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