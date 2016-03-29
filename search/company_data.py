import json

def merge_data(all_company_data):
	"""
	This function merges the Glassdoor and Indeed datasets as weighted
	averages
	"""

	for company in all_company_data:
		print ("this is company", company)
		
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
			
			summarized_data['overall'] = (float(gd_index['overallRating'])*pct_ratings_gd) + (float(in_index['Overall'])*pct_ratings_in)
			summarized_data['work_life'] = (float(gd_index['workLifeBalanceRating'])*pct_ratings_gd) + (float(in_index['Work/Life Balance'])*pct_ratings_in)
			summarized_data['opportunities'] = (float(gd_index['careerOpportunitiesRating'])*pct_ratings_gd) + (float(in_index['Job Security/Advancement'])*pct_ratings_in)
			summarized_data['compensation_benefits'] = (float(gd_index['compensationAndBenefitsRating'])*pct_ratings_gd) + (float(in_index['Compensation/Benefits'])*pct_ratings_in)
			summarized_data['management'] = (float(gd_index['seniorLeadershipRating'])*pct_ratings_gd) + (float(in_index['Management'])*pct_ratings_in)
			summarized_data['culture_values'] = (float(gd_index['cultureAndValuesRating'])*pct_ratings_gd) + (float(in_index['Culture'])*pct_ratings_in)
			
			(all_company_data[company]).append(summarized_data)
			print(all_company_data)

		else: 
			print ("something went wrong with ", gd_index['name'])
