import json

test_gd = [{'numberOfRatings': 177, 'name': 'Eventbrite', 'id': 344483, 'squareLogo': 'https://media.glassdoor.com/sqll/344483/eventbrite-squarelogo-1461791592609.png', 'cultureAndValuesRating': '4.6', 'industryId': 200020, 'sectorName': 'Arts, Entertainment & Recreation', 'ratingDescription': 'Very Satisfied', 'website': 'www.eventbrite.com', 'recommendToFriendRating': '0.9', 'seniorLeadershipRating': '4.2', 'careerOpportunitiesRating': '4.0', 'ceo': {'title': 'Co-Founder & CEO', 'numberOfRatings': 38, 'name': 'Julia Hartz', 'pctApprove': 89, 'pctDisapprove': 11, 'image': {'width': 200, 'src': 'https://media.glassdoor.com/people/sqll/344483/eventbrite-julia-hartz.png', 'height': 200}}, 'isEEP': 'True', 'workLifeBalanceRating': '4.6', 'sectorId': 10004, 'industryName': 'Ticket Sales', 'compensationAndBenefitsRating': '4.1', 'featuredReview': {'currentJob': True, 'reviewDateTime': '2016-09-20 14:10:06.02', 'cons': "- While this is not true across the entire company, I believe that compensation should be more competitive on specific teams. Eventbrite's focus should continue to be on retaining the greatest and most impactful team members.", 'id': 12008326, 'pros': "- Eventbrite is an incredibly engaging place to work because it's fast-paced, ever-changing, challenging and exciting. While this comes with its own difficulties, the environment is also incredibly supportive and community-based. \r\n- The people. The people are hands down the best group I've ever worked with. We hire fantastically smart and driven people who also know how to work in a team. \r\n- Flexibility.\r\n- Work/life balance. While finding the right work/life balance can be a challenge for me personally, Eventbrite encourages me to find the right schedule and pace that works for me. \r\n- Great perks.\r\n- Ability to make a difference. Eventbrite is a place where you can really make things happen  if you set your heart to it. You'll be listened to with respect, encouraged and supported.\r\n- Transparency. The leadership team sets a great example of sharing information and providing visibility into the important decisions we make us a business. This really engenders trust within the company, as well as investment in it. \r\n- Career mobility. I've had the chance to grow my career at Eventbrite. I've been supported in taking on new and exciting challenges that I've never had experience doing before.", 'jobTitle': 'Employee', 'attributionURL': 'http://www.glassdoor.com/Reviews/Employee-Review-Eventbrite-RVW12008326.htm', 'headline': 'Fantastic place to grow your career', 'location': '', 'overallNumeric': 5, 'overall': 5}, 'overallRating': 4.5, 'industry': 'Ticket Sales', 'exactMatch': 'True'}, {'numberOfRatings': 36, 'name': 'Beyond.com', 'id': 229666, 'squareLogo': 'https://media.glassdoor.com/sqll/229666/beyond-com-squarelogo-1422023014020.png', 'cultureAndValuesRating': '3.7', 'industryId': 200032, 'sectorName': 'Business Services', 'ratingDescription': 'OK', 'website': 'www.beyond.com', 'recommendToFriendRating': '0.5', 'seniorLeadershipRating': '2.8', 'careerOpportunitiesRating': '2.8', 'ceo': {'title': 'Founder and CEO', 'numberOfRatings': 28, 'name': 'Rich Milgram', 'pctApprove': 62, 'pctDisapprove': 38, 'image': {'width': 200, 'src': 'https://media.glassdoor.com/people/sqll/229666/beyond-com-richard-p-milgram.png', 'height': 200}}, 'isEEP': False, 'workLifeBalanceRating': '3.8', 'sectorId': 10006, 'industryName': 'Staffing & Outsourcing', 'compensationAndBenefitsRating': '2.9', 'featuredReview': {'currentJob': True, 'reviewDateTime': '2016-09-22 11:24:34.177', 'cons': 'There are plenty of processes and systems that use old technology.\r\n\r\nThe amount of work that gets done with the amount of people we have is impressive, but there are projects/updates/improvements that do not get picked up due to not having enough resources.', 'id': 12036018, 'pros': 'One of my favorite parts of working here is the people. They\'re a smart group of people that are great to work with. Everyone is willing to stop what they are working on and help each other out. It\'s very team oriented. We are like the 63 Musketeers. All for one and one for all.\r\n\r\n"Work hard, play hard"...I remember seeing that phrase in the job description when I applied and it stuck with me. It is 100% true. We go to movies together, play games, have pizza parties, team building events, Halloween parties and the list goes on and on. One of the biggest compliments I can give is when I tell people about my job and all of the perks/fun things we do, I always hear back "I wish I worked there" or "Are you hiring?" If you\'re reading this, for your sake, I hope we are hiring.', 'jobTitle': 'Employee', 'attributionURL': 'http://www.glassdoor.com/Reviews/Employee-Review-Beyond-com-RVW12036018.htm', 'headline': 'Work Hard, Play Hard', 'location': 'King of Prussia, PA', 'overallNumeric': 5, 'overall': 5}, 'overallRating': 3.1, 'industry': 'Staffing & Outsourcing', 'exactMatch': False}, {'numberOfRatings': 67, 'name': 'Brightcove', 'id': 243562, 'squareLogo': 'https://media.glassdoor.com/sqll/243562/brightcove-squarelogo-1389803847193.png', 'cultureAndValuesRating': '4.3', 'industryId': 200060, 'sectorName': 'Information Technology', 'ratingDescription': 'Very Satisfied', 'website': 'www.brightcove.com', 'recommendToFriendRating': '0.9', 'seniorLeadershipRating': '3.7', 'careerOpportunitiesRating': '3.9', 'ceo': {'title': 'CEO', 'pctApprove': 75, 'numberOfRatings': 40, 'pctDisapprove': 25, 'name': 'David Mendels'}, 'isEEP': 'True', 'workLifeBalanceRating': '4.3', 'sectorId': 10013, 'industryName': 'Computer Hardware & Software', 'compensationAndBenefitsRating': '3.9', 'featuredReview': {'id': 11672078, 'jobTitleFromDb': 'Anonymous', 'jobTitle': 'Anonymous', 'headline': 'Great place... and getting even better!', 'location': 'Boston, MA', 'overallNumeric': 5, 'pros': "I love working at Brightcove for a number of reasons. First and foremost, the people and the culture of the company. Almost everyone I have the good fortune to work with are kind, smart, and driven people. This keeps our world exciting and educational - there hasn't been a day in my 2+ year tenure where I've been looking at the clock waiting for 5pm to arrive. We're also one of the most understanding and supportive cultures I've seen, especially when it comes to work life balance. \r\n\r\nI also love that everyone is willing to take on anything that needs to get done. There is no culture of feeling like the work is above/below your pay grade which reinforces a team mentality. We all know there is a lot that can be done, which creates an exciting atmosphere with opportunity for growth, learning and development aplenty. \r\n\r\nAlso, you can feel that we're at the brink of something even better... our industry is already imploding, and only going to become more in demand. What we do will be integrated into almost every individuals's daily life, and we're the leaders of the industry... how cool is that!?", 'currentJob': True, 'reviewDateTime': '2016-08-24 08:34:09.957', 'cons': "We are working at warp speed, so sometimes things aren't done with as much process, time, and/or direction as might be ideal. However, we're given the freedom to try, make mistakes and redirect course, so it's okay. \r\n\r\nThere is also opportunity for departments to better integrate/collaborate/communicate. But, it seems like something leadership is aware of and trying to work through.", 'attributionURL': 'http://www.glassdoor.com/Reviews/Employee-Review-Brightcove-RVW11672078.htm', 'overall': 5}, 'overallRating': 4.1, 'industry': 'Computer Hardware & Software', 'exactMatch': 'True'}]

test_indeed1 = {'Culture': 3.5, 'Management': 3.0, 'Job Security/Advancement': 3.0, 'Work/Life Balance': 4.0, 'totalReviews': 3, 'Compensation/Benefits': 2.0, 'overall': 3.3, 'name': 'Eventbrite'}
test_indeed2 = {'Culture': 3.8, 'Management': 3.0, 'Job Security/Advancement': 3.8, 'Work/Life Balance': 4.0, 'totalReviews': 5, 'Compensation/Benefits': 3.8, 'overall': 3.8, 'name': 'Beyond.com'}
test_indeed3 = {'Culture': 4.0, 'Management': 3.5, 'Job Security/Advancement': 3.5, 'Work/Life Balance': 4.5, 'totalReviews': 2, 'Compensation/Benefits': 4.5, 'overall': 4.5, 'name': 'Brightcove'}

test_indeed = [test_indeed1, test_indeed2, test_indeed3]

test_priorities = {"culturevalues":25,"opportunities":40,"management":35,"compensationbenefits":0,"worklifebalance":0}

def tabulate(test_indeed, test_gd, test_priorities):
	"""
	This function merges the Glassdoor and Indeed datasets as weighted
	averages
	"""
	co_num = 3
	results = {}
	sorted_scores = []

	weight_pct = weight_ratings(test_priorities)

	for i in range(co_num):
		current_gd = test_gd[i]
		current_indeed = test_indeed[i]
		company_name = current_gd['name']
		results[company_name] = {}
		results = sum_reviews(company_name, results, current_gd, current_indeed)
		weighted_average_company(weight_ratings, results, company_name, current_gd, current_indeed)
		sorted_scores = highest_score_list(results, company_name, sorted_scores)

	return results


def weight_ratings(priorities):
	weight_ratings = {}
	weight_ratings['culture'] = (priorities['culturevalues'])/100
	weight_ratings['opportunities'] = (priorities['opportunities'])/100
	weight_ratings['management'] = (priorities['management'])/100
	weight_ratings['compensationbenefits'] = (priorities['compensationbenefits'])/100
	weight_ratings['worklifebalance'] = (priorities['worklifebalance'])/100

	print (weight_ratings)
	return weight_ratings


def sum_reviews(company_name, results, current_gd, current_indeed):
	total_gd_ratings = current_gd['numberOfRatings']
	total_indeed_ratings = current_indeed['totalReviews']
	results[company_name]['sum_all_ratings'] = total_indeed_ratings + total_gd_ratings
	results[company_name]['pct_gd'] = total_gd_ratings/(results[company_name]['sum_all_ratings'])
	results[company_name]['pct_indeed'] = total_indeed_ratings/(results[company_name]['sum_all_ratings'])

	return results


def weighted_average_company(weight_ratings, results, company_name, current_gd, current_indeed):
	pct_gd = results[company_name]['pct_gd']
	pct_indeed = results[company_name]['pct_indeed']
	results[company_name]['culture'] = (pct_gd*float(current_gd['cultureAndValuesRating'])) + (pct_indeed*float(current_indeed['Culture']))
	results[company_name]['opportunities'] = (pct_gd*float(current_gd['careerOpportunitiesRating'])) + (pct_indeed*float(current_indeed['Job Security/Advancement']))
	results[company_name]['management'] = (pct_gd*float(current_gd['seniorLeadershipRating'])) + (pct_indeed*float(current_indeed['Management']))
	results[company_name]['compensationbenefits'] = (pct_gd*float(current_gd['compensationAndBenefitsRating'])) + (pct_indeed*float(current_indeed['Compensation/Benefits']))
	results[company_name]['worklifebalance'] = (pct_gd*float(current_gd['workLifeBalanceRating'])) + (pct_indeed*float(current_indeed['Work/Life Balance']))
	results[company_name]['score'] = results[company_name]['culture'] + results[company_name]['opportunities'] + results[company_name]['management'] + results[company_name]['compensationbenefits'] + results[company_name]['worklifebalance']
	
	return results


def highest_score_list(results, company_name, sorted_scores):
	sorted_scores.append((company_name, results[company_name]['score']))
	sorted_scores.sort(reverse=True)
	print (sorted_scores)

	return sorted_scores

tabulate(test_indeed, test_gd, test_priorities)

