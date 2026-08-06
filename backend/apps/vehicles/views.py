from rest_framework.views import APIView
from rest_framework import status
from datetime import datetime, timezone
import random
from common.response import api_response
from common.db_models import Vehicle, TelemetryLog, LocationSubDocument, TelemetrySummarySubDocument

class FleetListView(APIView):
    def get(self, request):
        vehicles = Vehicle.objects.all()
        vehicle_list = []
        for v in vehicles:
            vehicle_list.append({
                "id": str(v.id),
                "vin": v.vin,
                "make": v.make,
                "model": v.model,
                "year": v.year,
                "status": v.status,
                "battery_health": v.battery_health,
                "odometer_km": v.odometer_km,
                "firmware_version": v.firmware_version,
                "location": {
                    "lat": v.location.latitude if v.location else 18.5204,
                    "lng": v.location.longitude if v.location else 73.8567,
                    "city": v.location.city if v.location else "Pune"
                } if v.location else None,
                "telemetry_summary": {
                    "speed_kmh": v.telemetry_summary.speed_kmh,
                    "battery_soc": v.telemetry_summary.battery_soc,
                    "battery_temp_c": v.telemetry_summary.battery_temp_c,
                } if v.telemetry_summary else None,
                "last_telemetry_sync": v.last_telemetry_sync.isoformat() if v.last_telemetry_sync else None,
            })
        return api_response(
            data={"vehicles": vehicle_list, "total": len(vehicle_list)},
            message="Live fleet vehicles retrieved from MongoDB Atlas",
            status_code=status.HTTP_200_OK
        )

    def post(self, request):
        data = request.data
        vin = data.get("vin")
        if not vin:
            return api_response(message="VIN is required", success=False, status_code=status.HTTP_400_BAD_REQUEST)
        
        existing = Vehicle.objects(vin=vin).first()
        if existing:
            return api_response(message=f"Vehicle with VIN {vin} already exists", success=False, status_code=status.HTTP_400_BAD_REQUEST)

        loc_data = data.get("location", {})
        vehicle = Vehicle(
            vin=vin,
            make=data.get("make", "DrishtIQ Motors"),
            model=data.get("model", "Apex EV-9"),
            year=data.get("year", 2025),
            status=data.get("status", "HEALTHY"),
            battery_health=data.get("battery_health", 100.0),
            odometer_km=data.get("odometer_km", 0),
            firmware_version=data.get("firmware_version", "v4.2.1-PROD"),
            location=LocationSubDocument(
                latitude=loc_data.get("lat", 18.5204),
                longitude=loc_data.get("lng", 73.8567),
                city=loc_data.get("city", "Pune"),
                country="India"
            ),
            telemetry_summary=TelemetrySummarySubDocument(
                speed_kmh=data.get("speed_kmh", 0.0),
                battery_soc=data.get("battery_soc", 100.0),
                battery_temp_c=data.get("battery_temp_c", 25.0)
            )
        )
        vehicle.save()

        return api_response(
            data={"id": str(vehicle.id), "vin": vehicle.vin, "status": vehicle.status},
            message="New vehicle registered in real-time in MongoDB Atlas",
            status_code=status.HTTP_201_CREATED
        )


class VehicleDetailView(APIView):
    def get(self, request, vehicle_id):
        v = Vehicle.objects(vin=vehicle_id).first() or Vehicle.objects(id=vehicle_id).first()
        if not v:
            return api_response(message=f"Vehicle '{vehicle_id}' not found in MongoDB Atlas", success=False, status_code=status.HTTP_404_NOT_FOUND)

        vehicle_data = {
            "id": str(v.id),
            "vin": v.vin,
            "make": v.make,
            "model": v.model,
            "year": v.year,
            "status": v.status,
            "battery_health": v.battery_health,
            "odometer_km": v.odometer_km,
            "firmware_version": v.firmware_version,
            "location": {
                "lat": v.location.latitude if v.location else 18.5204,
                "lng": v.location.longitude if v.location else 73.8567,
                "city": v.location.city if v.location else "Pune"
            } if v.location else None,
            "last_telemetry_sync": v.last_telemetry_sync.isoformat() if v.last_telemetry_sync else None,
        }
        return api_response(data={"vehicle": vehicle_data}, message="Live vehicle detail retrieved from MongoDB Atlas", status_code=status.HTTP_200_OK)


class TelemetryStreamView(APIView):
    """
    Real-time telemetry ingestion and simulation endpoint.
    Inserts live telemetry log documents into MongoDB Atlas and updates vehicle summary.
    """
    def post(self, request, vin):
        vehicle = Vehicle.objects(vin=vin).first()
        if not vehicle:
            return api_response(message=f"Vehicle with VIN {vin} not found", success=False, status_code=status.HTTP_404_NOT_FOUND)

        data = request.data
        speed = data.get("speed_kmh", round(random.uniform(30.0, 110.0), 1))
        soc = data.get("battery_soc", round(random.uniform(20.0, 99.0), 1))
        temp = data.get("battery_temp_c", round(random.uniform(22.0, 60.0), 1))

        # Save time-series telemetry document
        telemetry_log = TelemetryLog(
            vin=vin,
            speed_kmh=speed,
            battery_soc=soc,
            battery_temp_c=temp,
            voltage=data.get("voltage", 400.0),
            current_a=data.get("current_a", 15.0),
            dtc_flags=data.get("dtc_flags", [])
        )
        telemetry_log.save()

        # Update vehicle real-time summary in MongoDB Atlas
        if not vehicle.telemetry_summary:
            vehicle.telemetry_summary = TelemetrySummarySubDocument()
        vehicle.telemetry_summary.speed_kmh = speed
        vehicle.telemetry_summary.battery_soc = soc
        vehicle.telemetry_summary.battery_temp_c = temp
        vehicle.last_telemetry_sync = datetime.now(timezone.utc)
        vehicle.save()

        return api_response(
            data={
                "log_id": str(telemetry_log.id),
                "vin": vin,
                "speed_kmh": speed,
                "battery_soc": soc,
                "battery_temp_c": temp,
                "timestamp": telemetry_log.timestamp.isoformat()
            },
            message="Real-time telemetry payload persisted in MongoDB Atlas",
            status_code=status.HTTP_201_CREATED
        )
