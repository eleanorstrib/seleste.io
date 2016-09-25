import requests
import bs4

BASE_URL = "http://www.indeed.com/cmp/"
RATING_DENOMINATOR = 85.225
AVAILABLE_STARS = 5


def get_soup(BASE_URL, company):
	"""
	Retrieve the data and parse it.
	"""
	response = requests.get(BASE_URL + company)

	soup = bs4.BeautifulSoup(response.text, 'html.parser')

	return soup


def get_ratings(soup, company):
	"""
	Pull data out of the "soup" and clean to derive data for a 5 point scale
	"""
	company_ratings = {}

	if len(soup.select('dl#cmp-reviews-attributes dt')) != 0 and len(soup.select('dl#cmp-reviews-attributes dt'))!= None:
		company_ratings = {}
		rating_categories = [dl.get_text() for dl in soup.select('dl#cmp-reviews-attributes dt')]

		# need to grab pixel values from dom, splice, and turn into integers
		rating_stars_raw = [span.attrs.get('style') for span in soup.select('span.cmp-star-on')]
		rating_stars_clean = [float(item[7:-2]) for item in rating_stars_raw]

		for item in rating_categories:
			company_ratings[item] = round(((int(rating_stars_clean[rating_categories.index(item)])/RATING_DENOMINATOR) * AVAILABLE_STARS), 1)
		
		raw_num_reviews = (soup.find(attrs={'data-tn-component': 'overall-rating'}).get_text())[0:-8]
			# Indeed shortens numbers of reviews > 1000; for example 2100 reviews would be 2.1K reviews
			# This code searches for the 'K', removes it if present, then converts the number
		if 'K' in raw_num_reviews or 'k' in raw_num_reviews:
			raw_num_reviews = raw_num_reviews[:-1]
			raw_num_reviews = float(raw_num_reviews)*1000
	
		company_ratings['totalReviews'] = int(raw_num_reviews)

		company_ratings['overall'] = [float(element.get_text()) for element in soup.select('div span.cmp-average-rating')][0]
		company_ratings['name'] = company

	else:
		company_ratings['totalReviews'] = 0

	return company_ratings

