from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from search.models import Company, Glassdoor, Indeed 
import json
import requests

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
		# company1_name = json_data[0].name
		# company2_name = json_data[1].name
		# company3_name = json_data[2].name
		# print(company1_name, company2_name, company3_name)
		# print(data)
	# data = json.load(request)  <_ string not bytes
	# data = json.load(request.body.decode("utf-8")) <-- str has no attribute read
	# data = json.loads(request.body.decode(encoding="utf-8")) <-- Expecting value: line 1 column 1 (char 0)
	# data = json.loads(request.body.decode("latin1")) <-- Expecting value: line 1 column 1 (char 0)
	# data = json.loads(request.decode(encoding="utf-8").read())
	# print (data)
	# print (type(data))

	


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