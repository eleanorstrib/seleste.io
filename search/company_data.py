import json

def merge_data(all_company_data, priorities):
	"""
	This function merges the Glassdoor and Indeed datasets as weighted
	averages
	"""

	for company in all_company_data:
		gd_index = all_company_data[company][0]['glassdoor']
		summarized_data = {}
		summarized_data['all_reviews'] = {}

		if all_company_data[company][0]['glassdoor'] and all_company_data[company][1]['indeed']['TotalReviews'] != 0:
			print (company, "has gd and indeed rankings ********************")
			
			in_index = all_company_data[company][1]['indeed']
		
			num_gd_ratings = int(gd_index['numberOfRatings'])
			num_in_ratings = int(in_index['TotalReviews'])
			num_reviews = num_gd_ratings + num_in_ratings

			pct_ratings_gd = float(num_gd_ratings/num_reviews)
			pct_ratings_in = float(num_in_ratings/num_reviews)

			
			# calculate weighted averages and add to new dict
			
			summarized_data['all_reviews']['overall'] = (float(gd_index['overallRating'])*pct_ratings_gd) + (float(in_index['Overall'])*pct_ratings_in)
			summarized_data['all_reviews']['work_life'] = (float(gd_index['workLifeBalanceRating'])*pct_ratings_gd) + (float(in_index['Work/Life Balance'])*pct_ratings_in)
			summarized_data['all_reviews']['opportunities'] = (float(gd_index['careerOpportunitiesRating'])*pct_ratings_gd) + (float(in_index['Job Security/Advancement'])*pct_ratings_in)
			summarized_data['all_reviews']['compensation_benefits'] = (float(gd_index['compensationAndBenefitsRating'])*pct_ratings_gd) + (float(in_index['Compensation/Benefits'])*pct_ratings_in)
			summarized_data['all_reviews']['management'] = (float(gd_index['seniorLeadershipRating'])*pct_ratings_gd) + (float(in_index['Management'])*pct_ratings_in)
			summarized_data['all_reviews']['culture_values'] = (float(gd_index['cultureAndValuesRating'])*pct_ratings_gd) + (float(in_index['Culture'])*pct_ratings_in)

			scores = {}
			scores['ranked'] = {}

			for item in summarized_data['all_reviews']:
				scores['ranked']['culture_values'] = ((float(priorities['culturevalues'])/100) * summarized_data['all_reviews']['culture_values'])
				scores['ranked']['opportunities'] = ((float(priorities['opportunities'])/100) * summarized_data['all_reviews']['opportunities'])
				scores['ranked']['work_life'] = ((float(priorities['worklifebalance'])/100) * summarized_data['all_reviews']['work_life'])
				scores['ranked']['compensation_benefits'] = ((float(priorities['compensationbenefits'])/100) * summarized_data['all_reviews']['compensation_benefits'])
				scores['ranked']['management'] = ((float(priorities['management'])/100) * summarized_data['all_reviews']['management'])
				scores['ranked']['total_score'] = scores['ranked']['culture_values'] + scores['ranked']['opportunities'] + scores['ranked']['work_life'] + scores['ranked']['compensation_benefits'] + scores['ranked']['management']
			

			(all_company_data[company]).append(summarized_data)
			print ("just appended summary to ", company, "which has gd reviews"
			)
		else: 
			print ("**** there was no indeed data for ", company, "**************")
			summarized_data['all_reviews']['overall'] = gd_index['overallRating']
			summarized_data['all_reviews']['work_life'] = gd_index['workLifeBalanceRating']
			summarized_data['all_reviews']['opportunities'] = gd_index['careerOpportunitiesRating']
			summarized_data['all_reviews']['compensation_benefits'] = gd_index['compensationAndBenefitsRating']
			summarized_data['all_reviews']['management'] = gd_index['seniorLeadershipRating']
			summarized_data['all_reviews']['culture_values'] = gd_index['cultureAndValuesRating']
			(all_company_data[company]).append(summarized_data)
			print("This is summarized_data for ", company, " ********", summarized_data)
			print ("just appended summary to ", company, "which has NO gd reviews")
			
	print("*************", all_company_data, "***********")
	return all_company_data


	
def gd_data_only():
	pass



