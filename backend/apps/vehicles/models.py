class VehicleDocument:
    """
    MongoDB Vehicle Telemetry Document schema specification.
    """
    collection_name = "vehicles"

    @staticmethod
    def get_sample_fleet():
        return [
            {
                "id": "v_01",
                "vin": "1G1YC2D78R5100001",
                "make": "DrishtIQ Motors",
                "model": "Apex EV-9",
                "year": 2025,
                "status": "HEALTHY",
                "battery_health": 98.4,
                "odometer_km": 14230,
                "location": {"lat": 18.5204, "lng": 73.8567, "city": "Pune, India"},
                "firmware_version": "v4.2.1-PROD",
                "last_telemetry_sync": "2026-08-06T18:50:00Z"
            },
            {
                "id": "v_02",
                "vin": "1G1YC2D78R5100002",
                "make": "DrishtIQ Motors",
                "model": "Starlight Sedan",
                "year": 2024,
                "status": "WARNING",
                "battery_health": 89.1,
                "odometer_km": 42100,
                "location": {"lat": 19.0760, "lng": 72.8777, "city": "Mumbai, India"},
                "firmware_version": "v4.1.8-PROD",
                "last_telemetry_sync": "2026-08-06T18:52:12Z"
            },
            {
                "id": "v_03",
                "vin": "1G1YC2D78R5100003",
                "make": "DrishtIQ Motors",
                "model": "Titan Truck EV",
                "year": 2026,
                "status": "CRITICAL",
                "battery_health": 74.2,
                "odometer_km": 68900,
                "location": {"lat": 12.9716, "lng": 77.5946, "city": "Bengaluru, India"},
                "firmware_version": "v4.2.0-PROD",
                "last_telemetry_sync": "2026-08-06T18:55:04Z"
            }
        ]
