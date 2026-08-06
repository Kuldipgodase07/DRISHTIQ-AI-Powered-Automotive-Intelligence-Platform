import os
from django.core.asgi import get_asgi_application
from config.db import init_mongo

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')

# Initialize MongoDB Atlas Connection
init_mongo()

application = get_asgi_application()
