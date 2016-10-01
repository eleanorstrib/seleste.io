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
	ranked_cos = {}
	all_company_data = {}
	# catch in case T/F vars not cleaned in client
	true = True
	false = False

	if request.method == 'POST':
		data=request.body.decode('utf-8')
		print(data)
		print(type(data))
		if "next-results=Submit" not in data:
			all_user_inputs = json.loads(data)
			priority = all_user_inputs[0]
			gd_data = all_user_inputs[1:]
			print (gd_data)
		# 	# initiate the web scraper to get data from Indeed
			for co in gd_data:
				co_name = co['name']
				soup = get_soup(BASE_URL, co_name)
				indeed_data = get_ratings(soup, co_name)
				if "no ratings available" not in indeed_data:
					print (co_name)
					print (indeed_data)
				else:
					print("no indeed data for", co_name)

			# merge_data(all_company_data, priorities)


		# for co in all_company_data:
		# 	ranked_cos[co] = all_company_data[co][2]


		# print ("this is the ranked company list: ", ranked_cos)
	return render(request, 'search/results.html', {'data':data})

	# else:
	# 	print("not post")
	# 	data = request.body.decode("utf-8")
	# 	print("this is the data not post: ", data)
	# 	for co in all_company_data:
	# 		ranked_cos[co] = all_company_data[co][2]
	# 	print ("this is the ranked company list: ", ranked_cos)
	# 	return render(request, 'search/results.html', {'ranked_cos': ranked_cos})

	


