import json
import sys
from operator import itemgetter


def tabulate(in_data, gd_data, priorities):
	"""
	Merges the Glassdoor and Indeed datasets as weighted averages, returns results
	"""
	co_num = 3
	results = {}
	sorted_scores = []

	weight_pct = weight_ratings(priorities)

	for i in range(co_num):
		current_gd = gd_data[i]
		print(current_gd)
		current_indeed = in_data[i]
		company_name = current_gd['name']
		results[company_name] = {}
		results = sum_reviews(company_name, results, current_gd, current_indeed)
		wt_avg_co = weighted_average_company(weight_ratings, results, company_name, current_gd, current_indeed)
		sorted_scores.append((company_name, results[company_name]['score']))
		

	sorted_scores = sorted(sorted_scores,key=itemgetter(1))

	final_results = sorted_scores.append([results])
	print("final results form company_data", final_results)
	return final_results


def weight_ratings(priorities):
	"""
	Generates a dict of weighted ratings from the priorities variable
	"""
	weight_ratings = {}
	weight_ratings['culture'] = (priorities['culturevalues'])/100
	weight_ratings['opportunities'] = (priorities['opportunities'])/100
	weight_ratings['management'] = (priorities['management'])/100
	weight_ratings['compensationbenefits'] = (priorities['compensationbenefits'])/100
	weight_ratings['worklifebalance'] = (priorities['worklifebalance'])/100

	return weight_ratings


def sum_reviews(company_name, results, current_gd, current_indeed):
	"""
	Sums up the number of reviews, determines % from each source
	"""
	total_gd_ratings = current_gd['numberOfRatings']
	total_indeed_ratings = current_indeed['totalReviews']
	results[company_name]['sum_all_ratings'] = total_indeed_ratings + total_gd_ratings
	results[company_name]['pct_gd'] = total_gd_ratings/(results[company_name]['sum_all_ratings'])
	results[company_name]['pct_indeed'] = total_indeed_ratings/(results[company_name]['sum_all_ratings'])

	return results


def weighted_average_company(weight_ratings, results, company_name, current_gd, current_indeed):
	"""
	Returns weighted averages for each priority and an overall score in the results dict
	"""
	pct_gd = results[company_name]['pct_gd']
	pct_indeed = results[company_name]['pct_indeed']
	results[company_name]['culture'] = (pct_gd*float(current_gd['cultureAndValuesRating'])) + (pct_indeed*float(current_indeed['Culture']))
	results[company_name]['opportunities'] = (pct_gd*float(current_gd['careerOpportunitiesRating'])) + (pct_indeed*float(current_indeed['Job Security/Advancement']))
	results[company_name]['management'] = (pct_gd*float(current_gd['seniorLeadershipRating'])) + (pct_indeed*float(current_indeed['Management']))
	results[company_name]['compensationbenefits'] = (pct_gd*float(current_gd['compensationAndBenefitsRating'])) + (pct_indeed*float(current_indeed['Compensation/Benefits']))
	results[company_name]['worklifebalance'] = (pct_gd*float(current_gd['workLifeBalanceRating'])) + (pct_indeed*float(current_indeed['Work/Life Balance']))
	results[company_name]['score'] = results[company_name]['culture'] + results[company_name]['opportunities'] + results[company_name]['management'] + results[company_name]['compensationbenefits'] + results[company_name]['worklifebalance']
	
	return results


if __name__ == '__main__':
    # try:
    #     arg = sys.argv[1]
    # except IndexError:
        # arg = None

    return_val = tabulate(in_data, gd_data, priorities)
