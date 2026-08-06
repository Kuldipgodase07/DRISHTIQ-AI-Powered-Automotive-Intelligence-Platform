from django.contrib import admin
from django.urls import path, include
from rest_framework.views import APIView
from rest_framework import status
from common.response import api_response

class HealthCheckView(APIView):
    def get(self, request):
        return api_response(
            data={"status": "UP", "service": "DrishtIQ Automotive Backend", "database": "MongoDB Atlas"},
            message="Health check passed",
            status_code=status.HTTP_200_OK
        )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/health/', HealthCheckView.as_view(), name='health-check'),
    path('api/v1/auth/', include('apps.authentication.urls')),
    path('api/v1/vehicles/', include('apps.vehicles.urls')),
    path('api/v1/diagnostics/', include('apps.diagnostics.urls')),
    path('api/v1/warranty/', include('apps.warranty.urls')),
    path('api/v1/suppliers/', include('apps.suppliers.urls')),
    path('api/v1/copilot/', include('apps.copilot.urls')),
    path('api/v1/alerts/', include('apps.alerts.urls')),
]
