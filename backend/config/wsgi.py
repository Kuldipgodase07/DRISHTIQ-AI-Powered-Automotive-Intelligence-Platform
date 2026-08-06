import os
from django.core.wsgi import get_wsgi_application
from config.db import init_mongo

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')

# Initialize MongoDB Atlas Connection
init_mongo()

application = get_wsgi_application()
