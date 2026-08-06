import os
import mongoengine
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

def seed_database():
    uri = os.getenv("MONGODB_URI")
    db_name = os.getenv("MONGODB_DB_NAME", "drishtiq_db")

    if not uri:
        print("MONGODB_URI not found.")
        return

    mongoengine.connect(db=db_name, host=uri)
    db = mongoengine.get_db()

    print(f"Connected to MongoDB Atlas: {db_name}")

    # Seed Users
    users_col = db["users"]
    if users_col.count_documents({}) == 0:
        users_col.insert_many([
            {
                "email": "admin@drishtiq.auto",
                "name": "Automotive Lead Engineer",
                "role": "ENGINEER",
                "department": "Predictive Diagnostics & Telemetry",
                "is_active": True,
                "created_at": datetime.utcnow().isoformat()
            },
            {
                "email": "priya.sharma@tatamotors.com",
                "name": "Priya Sharma",
                "role": "MANAGER",
                "department": "Global Quality Analytics",
                "is_active": True,
                "created_at": datetime.utcnow().isoformat()
            }
        ])
        print("Seeded 'users' collection.")

    # Seed Vehicles
    vehicles_col = db["vehicles"]
    if vehicles_col.count_documents({}) == 0:
        vehicles_col.insert_many([
            {
                "vin": "1G1YC2D78R5100001",
                "make": "DrishtIQ Motors",
                "model": "Apex EV-9",
                "year": 2025,
                "status": "HEALTHY",
                "battery_health": 98.4,
                "odometer_km": 14230,
                "location": {"lat": 18.5204, "lng": 73.8567, "city": "Pune, India"},
                "firmware_version": "v4.2.1-PROD",
                "last_telemetry_sync": datetime.utcnow().isoformat()
            },
            {
                "vin": "1G1YC2D78R5100002",
                "make": "DrishtIQ Motors",
                "model": "Starlight Sedan",
                "year": 2024,
                "status": "WARNING",
                "battery_health": 89.1,
                "odometer_km": 42100,
                "location": {"lat": 19.0760, "lng": 72.8777, "city": "Mumbai, India"},
                "firmware_version": "v4.1.8-PROD",
                "last_telemetry_sync": datetime.utcnow().isoformat()
            },
            {
                "vin": "1G1YC2D78R5100003",
                "make": "DrishtIQ Motors",
                "model": "Titan Truck EV",
                "year": 2026,
                "status": "CRITICAL",
                "battery_health": 74.2,
                "odometer_km": 68900,
                "location": {"lat": 12.9716, "lng": 77.5946, "city": "Bengaluru, India"},
                "firmware_version": "v4.2.0-PROD",
                "last_telemetry_sync": datetime.utcnow().isoformat()
            }
        ])
        print("Seeded 'vehicles' collection.")

    # Seed Diagnostics
    diag_col = db["diagnostics"]
    if diag_col.count_documents({}) == 0:
        diag_col.insert_many([
            {
                "dtc_code": "P0A80",
                "severity": "CRITICAL",
                "system": "High Voltage Battery Pack",
                "description": "Replace Hybrid/EV Battery Pack Cell Module #4 Delta Voltage Anomaly",
                "recommended_action": "Isolate high voltage contactors and replace Module B4",
                "confidence_score": 0.94,
                "detected_at": datetime.utcnow().isoformat()
            },
            {
                "dtc_code": "C1203",
                "severity": "HIGH",
                "system": "Brake Control System",
                "description": "ABS Sensor Speed Correlation Circuit Malfunction Front-Right",
                "recommended_action": "Inspect harness connection and clean sensor tone ring",
                "confidence_score": 0.88,
                "detected_at": datetime.utcnow().isoformat()
            }
        ])
        print("Seeded 'diagnostics' collection.")

    # Seed Warranty
    warranty_col = db["warranty_claims"]
    if warranty_col.count_documents({}) == 0:
        warranty_col.insert_many([
            {
                "claim_id": "CLM-2026-9042",
                "vin": "1G1YC2D78R5100003",
                "component": "HV Battery Cell Module B4",
                "supplier_name": "Apex Power Systems Inc.",
                "claim_amount": 3450.00,
                "status": "APPROVED",
                "defect_category": "Thermal Degradation Leakage",
                "submitted_at": datetime.utcnow().isoformat()
            }
        ])
        print("Seeded 'warranty_claims' collection.")

    # Seed Suppliers
    suppliers_col = db["suppliers"]
    if suppliers_col.count_documents({}) == 0:
        suppliers_col.insert_many([
            {
                "name": "Apex Power Systems Inc.",
                "category": "High Voltage Batteries",
                "quality_score": 96.2,
                "ppm_defect_rate": 14,
                "risk_level": "LOW",
                "total_shipments": 4820
            },
            {
                "name": "ChassisTech Dynamics",
                "category": "Braking & Suspension",
                "quality_score": 88.5,
                "ppm_defect_rate": 42,
                "risk_level": "MEDIUM",
                "total_shipments": 12100
            }
        ])
        print("Seeded 'suppliers' collection.")

    # Seed Alerts
    alerts_col = db["alerts"]
    if alerts_col.count_documents({}) == 0:
        alerts_col.insert_many([
            {
                "title": "HV Battery Temperature Threshold Exceeded",
                "severity": "CRITICAL",
                "vin": "1G1YC2D78R5100003",
                "metric": "Battery Temp",
                "value": "58.4°C (Limit: 52°C)",
                "acknowledged": False,
                "timestamp": datetime.utcnow().isoformat()
            }
        ])
        print("Seeded 'alerts' collection.")

    print("\nAll database collections successfully created and populated in MongoDB Atlas!")
    print("Collections present:", db.list_collection_names())

if __name__ == "__main__":
    seed_database()
