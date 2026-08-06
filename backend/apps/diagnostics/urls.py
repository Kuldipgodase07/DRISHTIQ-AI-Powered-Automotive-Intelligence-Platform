from django.urls import path
from .views import DiagnosticListView

urlpatterns = [
    path("", DiagnosticListView.as_view(), name="diagnostic-list"),
]
