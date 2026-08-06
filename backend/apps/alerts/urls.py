from django.urls import path
from .views import AlertListView, AlertAcknowledgeView

urlpatterns = [
    path("", AlertListView.as_view(), name="alert-list"),
    path("<str:alert_id>/acknowledge/", AlertAcknowledgeView.as_view(), name="alert-acknowledge"),
]
