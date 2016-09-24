from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect, HttpResponse, QueryDict
from django.views.decorators.csrf import ensure_csrf_cookie
from search.models import Company, Glassdoor, Indeed 
import json
import requests
from search.indeed import get_soup, get_ratings, BASE_URL, RATING_DENOMINATOR, AVAILABLE_STARS
from search.company_data import merge_data
from django.http import JsonResponse

def home(request):
	return render(request, 'search/index.html', {})

@ensure_csrf_cookie
def companies(request):
	return render(request, 'search/companies.html', {})


def results(request):
	ranked_cos = {}
	all_company_data = {}
	# catch in case T/F vars not cleaned in client
	true = True
	false = False
	if request.method == 'POST':

		# frontend_data = {k: v[0] if len(v)==1 else v for k, v in QueryDict(request.body).lists()}
		# frontend_data = json.loads( request.body.decode('utf-8') )
		# print (frontend_data)
		data=request.body.decode('utf-8')
		print(data)
		print(type(data))
		if "next-results=Submit" not in data:
			all_user_inputs = json.loads(data)
			priority = all_user_inputs[0]
			company1 = all_user_inputs[1]
			company2 = all_user_inputs[2]
			company3 = all_user_inputs[3]

			print (company3)
			print (type(company3))
		# priorities = json_data.pop(0)

		# for company in json_data:
		# 	company_name = company['name']
		# 	all_company_data[company_name] = [{'glassdoor':company}]

		# 	# initiate the web scraper to get data from Indeed
		# 	soup = get_soup(BASE_URL, company_name)
		# 	indeed_data = get_ratings(soup, company_name)
		# 	if "no ratings available" not in indeed_data:
		# 		all_company_data[company_name] = all_company_data.get(company_name, []) + [{'indeed': indeed_data}]
		# 	else:
		# 		print("no indeed data for", company_name)

		# 	merge_data(all_company_data, priorities)


		# for co in all_company_data:
		# 	ranked_cos[co] = all_company_data[co][2]


		# print ("this is the ranked company list: ", ranked_cos)
	return render(request, 'search/results.html', {})

	# else:
	# 	print("not post")
	# 	data = request.body.decode("utf-8")
	# 	print("this is the data not post: ", data)
	# 	for co in all_company_data:
	# 		ranked_cos[co] = all_company_data[co][2]
	# 	print ("this is the ranked company list: ", ranked_cos)
	# 	return render(request, 'search/results.html', {'ranked_cos': ranked_cos})

	


