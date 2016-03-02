from django.contrib import admin
from .models import (Company, Glassdoor, Indeed)

all_models = [Company, Glassdoor, Indeed]

admin.site.register(all_models)

