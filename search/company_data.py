import json


def merge_data(all_company_data, priorities):
	"""
	This function merges the Glassdoor and Indeed datasets as weighted
	averages
	"""

	for company in all_company_data:
		if all_company_data[company][0]['glassdoor'] and all_company_data[company][1]['indeed']:
			gd_index = all_company_data[company][0]['glassdoor']
			in_index = all_company_data[company][1]['indeed']
		
			num_gd_ratings = int(gd_index['numberOfRatings'])
			num_in_ratings = int(in_index['TotalReviews'])
			num_reviews = num_gd_ratings + num_in_ratings

			pct_ratings_gd = float(num_gd_ratings/num_reviews)
			pct_ratings_in = float(num_in_ratings/num_reviews)

			
			# calculate weighted averages and add to new dict
			summarized_data = {}
			summarized_data['all_reviews'] = {}
			
			summarized_data['all_reviews']['overall'] = (float(gd_index['overallRating'])*pct_ratings_gd) + (float(in_index['Overall'])*pct_ratings_in)
			summarized_data['all_reviews']['work_life'] = (float(gd_index['workLifeBalanceRating'])*pct_ratings_gd) + (float(in_index['Work/Life Balance'])*pct_ratings_in)
			summarized_data['all_reviews']['opportunities'] = (float(gd_index['careerOpportunitiesRating'])*pct_ratings_gd) + (float(in_index['Job Security/Advancement'])*pct_ratings_in)
			summarized_data['all_reviews']['compensation_benefits'] = (float(gd_index['compensationAndBenefitsRating'])*pct_ratings_gd) + (float(in_index['Compensation/Benefits'])*pct_ratings_in)
			summarized_data['all_reviews']['management'] = (float(gd_index['seniorLeadershipRating'])*pct_ratings_gd) + (float(in_index['Management'])*pct_ratings_in)
			summarized_data['all_reviews']['culture_values'] = (float(gd_index['cultureAndValuesRating'])*pct_ratings_gd) + (float(in_index['Culture'])*pct_ratings_in)
	
			(all_company_data[company]).append(summarized_data)
			compute_scores(summarized_data, priorities, all_company_data)

		elif len(all_company_data[company]) == 1:
			summarized_data['all_reviews']['overall'] = gd_index['overallRating']
			summarized_data['all_reviews']['work_life'] = gd_index['workLifeBalanceRating']
			summarized_data['all_reviews']['opportunities'] = gd_index['careerOpportunitiesRating']
			summarized_data['all_reviews']['compensation_benefits'] = gd_index['compensationAndBenefitsRating']
			summarized_data['all_reviews']['management'] = gd_index['seniorLeadershipRating']
			summarized_data['all_reviews']['culture_values'] = gd_index['cultureAndValuesRating']

			(all_company_data[company]).append(summarized_data)

		else: 
			print("something went wrong with ", gd_index['name'])
			return all_company_data

	print(all_company_data)
	




def compute_scores(company_data, priorities, all_company_data):
	scores = {}
	for item in company_data['all_reviews']:
		scores['ranked'] = {}
		scores['ranked'].get('culture_values', ((float(priorities['culturevalues'])/100) * company_data['culture_values']))
		scores['ranked']['opportunities'] = ((float(priorities['opportunities'])/100) * company_data['opportunities'])
		scores['ranked']['work_life'] = ((float(priorities['worklifebalance'])/100) * company_data['work_life'])
		scores['ranked']['compensation_benefits'] = ((float(priorities['compensationbenefits'])/100) * company_data['compensation_benefits'])
		scores['ranked']['management'] = ((float(priorities['management'])/100) * company_data['management'])
		scores['ranked']['total_score'] = scores['ranked']['culture_values'] + scores['ranked']['opportunities'] + scores['ranked']['work_life'] + scores['ranked']['compensation_benefits'] + scores['ranked']['management']
		print ("this is the scores dict", scores)





