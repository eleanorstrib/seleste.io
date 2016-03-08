from django.shortcuts import render

def home(request):
	print(request.session)
	if request.method == 'POST':
		return HTTPResponseRedirect('/companies/')
	return render(request, 'search/index.html')

def companies(request):

	return render(request, 'search/companies.html')

def results(request):
	return render(request, 'search/results.html')