

def merge_data(all_company_data):
	"""
	This function merges the Glassdoor and Indeed datasets as weighted
	averages
	"""
	refined_company_data = {}
	for company in all_company_data:
		gd_index = all_company_data[company][0]['glassdoor']
		in_index = all_company_data[company][1]['indeed']
		if 'glassdoor' in company and 'indeed' in company:
			num_gd_ratings = int(gd_index['numberOfRatings'])
			num_in_ratings = int(in_index['TotalReviews'])
			num_reviews = sum(num_gd_ratings, num_in_ratings)

			pct_ratings_gd = float(num_gd_ratings/num_reviews)
			pct_ratings_in = float(num_in_ratings/num_reviews)

			# calculate weighted averages
			refined_company_data[company]['overall'] = (float(gd_index['overallRating'])*pct_ratings_gd) + float((in_index['Overall']*pct_ratings_in))
			refined_company_data[company]['work_life'] = (float(gd_index['workLifeBalanceRating'])*pct_ratings_gd) + float((in_index['Work/Life Balance']*pct_ratings_in))
			refined_company_data[company]['opportunities'] = (float(gd_index['careerOpportunitiesRating'])*pct_ratings_gd) + float((in_index['Job Security/Advancement']*pct_ratings_in))
			refined_company_data[company]['compensation_benefits'] = (float(gd_index['compensationAndBenefitsRating'])*pct_ratings_gd) + float((in_index['Compensation/Benefits']*pct_ratings_in))
			refined_company_data[company]['management'] = (float(gd_index['seniorLeadershipRating']*pct_ratings_gd)) + float((in_index['Management']*pct_ratings_in))
			refined_company_data[company]['culture_values ']= (float(gd_index['cultureAndValuesRating']*pct_ratings_gd)) + float((in_index['Culture']*pct_ratings_in))

			print('refined_company_data : ',refined_company_data)

		else: 
			print ("something went wrong with ", gd_index['name'])
