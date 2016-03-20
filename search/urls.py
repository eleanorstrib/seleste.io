from django.conf.urls import url
from . import views

urlpatterns = [

	url(r'^$', views.home, name='home'),
	url(r'^companies/$', views.companies, name='companies'),
	url(r'^results/$', views.results, name='results'),

]