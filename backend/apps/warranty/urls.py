from django.urls import path
from .views import WarrantyListView

urlpatterns = [
    path("", WarrantyListView.as_view(), name="warranty-list"),
]
