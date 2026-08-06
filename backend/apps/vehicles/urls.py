from django.urls import path
from .views import FleetListView, VehicleDetailView, TelemetryStreamView

urlpatterns = [
    path("", FleetListView.as_view(), name="vehicle-list"),
    path("<str:vehicle_id>/", VehicleDetailView.as_view(), name="vehicle-detail"),
    path("<str:vin>/telemetry/", TelemetryStreamView.as_view(), name="vehicle-telemetry"),
]
