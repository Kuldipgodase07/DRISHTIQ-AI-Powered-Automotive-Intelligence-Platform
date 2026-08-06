import os
import mongoengine as me
from dotenv import load_dotenv
from datetime import datetime, timezone
from common.db_models import (
    User, Vehicle, Diagnostic, WarrantyClaim, Supplier,
    CopilotSession, Alert, LocationSubDocument, TelemetrySummarySubDocument,
    ContactSubDocument, AuditTrailSubDocument
)

load_dotenv()

def initialize_enterprise_database():
    uri = os.getenv("MONGODB_URI")
    db_name = os.getenv("MONGODB_DB_NAME", "drishtiq_db")

    if not uri:
        print("Error: MONGODB_URI environment variable is missing.")
        return

    print(f"Connecting to MongoDB Atlas Cluster: {uri}")
    me.connect(db=db_name, host=uri)
    db = me.get_db()

    # Drop existing collections to ensure clean index creation
    for col in db.list_collection_names():
        db.drop_collection(col)
        print(f"[OK] Reset collection '{col}' for clean DBA initialization")

    print("\nBuilding enterprise MongoEngine indexes across all collections...")
    
    # Ensure all compound and unique indexes are synced in MongoDB Atlas
    models = [User, Vehicle, Diagnostic, WarrantyClaim, Supplier, CopilotSession, Alert]
    for model in models:
        model.ensure_indexes()
        print(f"[OK] Indexes built & verified for collection '{model._get_collection_name()}'")

    print("\nSeeding Enterprise Domain Data...")

    # 1. Users Collection
    User(
        email="admin@drishtiq.auto",
        full_name="Automotive Lead Engineer",
        role="ENGINEER",
        department="Predictive Diagnostics & Telemetry"
    ).save()
    User(
        email="priya.sharma@tatamotors.com",
        full_name="Priya Sharma",
        role="MANAGER",
        department="Global Quality Analytics"
    ).save()
    print("[OK] Created initial enterprise Users")

    # 2. Vehicles Collection
    Vehicle(
        vin="1G1YC2D78R5100001",
        make="DrishtIQ Motors",
        model="Apex EV-9",
        year=2025,
        status="HEALTHY",
        battery_health=98.4,
        odometer_km=14230,
        firmware_version="v4.2.1-PROD",
        location=LocationSubDocument(latitude=18.5204, longitude=73.8567, city="Pune", country="India"),
        telemetry_summary=TelemetrySummarySubDocument(speed_kmh=68.5, battery_soc=84.2, battery_temp_c=28.4)
    ).save()

    Vehicle(
        vin="1G1YC2D78R5100002",
        make="DrishtIQ Motors",
        model="Starlight Sedan",
        year=2024,
        status="WARNING",
        battery_health=89.1,
        odometer_km=42100,
        firmware_version="v4.1.8-PROD",
        location=LocationSubDocument(latitude=19.0760, longitude=72.8777, city="Mumbai", country="India"),
        telemetry_summary=TelemetrySummarySubDocument(speed_kmh=42.0, battery_soc=62.0, battery_temp_c=36.8)
    ).save()

    Vehicle(
        vin="1G1YC2D78R5100003",
        make="DrishtIQ Motors",
        model="Titan Truck EV",
        year=2026,
        status="CRITICAL",
        battery_health=74.2,
        odometer_km=68900,
        firmware_version="v4.2.0-PROD",
        location=LocationSubDocument(latitude=12.9716, longitude=77.5946, city="Bengaluru", country="India"),
        telemetry_summary=TelemetrySummarySubDocument(speed_kmh=95.0, battery_soc=28.5, battery_temp_c=58.4)
    ).save()
    print("[OK] Created enterprise Vehicles with embedded subdocuments")

    # 3. Diagnostics Collection
    Diagnostic(
        dtc_code="P0A80",
        vin="1G1YC2D78R5100003",
        severity="CRITICAL",
        system="High Voltage Battery Pack",
        description="Replace Hybrid/EV Battery Pack Cell Module #4 Delta Voltage Anomaly",
        recommended_action="Isolate high voltage contactors and replace Module B4",
        confidence_score=0.94,
        status="OPEN"
    ).save()

    Diagnostic(
        dtc_code="C1203",
        vin="1G1YC2D78R5100002",
        severity="HIGH",
        system="Brake Control System",
        description="ABS Sensor Speed Correlation Circuit Malfunction Front-Right",
        recommended_action="Inspect harness connection and clean sensor tone ring",
        confidence_score=0.88,
        status="INVESTIGATING"
    ).save()
    print("[OK] Created enterprise Diagnostic records")

    # 4. Warranty Claims Collection
    claim = WarrantyClaim(
        claim_id="CLM-2026-9042",
        vin="1G1YC2D78R5100003",
        component="HV Battery Cell Module B4",
        supplier_name="Apex Power Systems Inc.",
        claim_amount=3450.00,
        status="APPROVED",
        defect_category="Thermal Degradation Leakage"
    )
    claim.audit_history.append(
        AuditTrailSubDocument(
            action="CLAIM_APPROVED",
            performed_by="Priya Sharma (Global Quality Manager)",
            notes="Automated telemetry evidence verified thermal spike on Module B4."
        )
    )
    claim.save()
    print("[OK] Created enterprise Warranty Claims with audit history")

    # 5. Suppliers Collection
    Supplier(
        supplier_code="SUP-APEX-01",
        name="Apex Power Systems Inc.",
        category="High Voltage Batteries",
        quality_score=96.2,
        ppm_defect_rate=14,
        risk_level="LOW",
        total_shipments=4820,
        contact_info=ContactSubDocument(contact_name="Vikram Mehta", email="quality@apexpower.com", phone="+91-9820012345")
    ).save()

    Supplier(
        supplier_code="SUP-CHAS-02",
        name="ChassisTech Dynamics",
        category="Braking & Suspension",
        quality_score=88.5,
        ppm_defect_rate=42,
        risk_level="MEDIUM",
        total_shipments=12100,
        contact_info=ContactSubDocument(contact_name="Rahul Verma", email="support@chassistech.com", phone="+91-9811054321")
    ).save()
    print("[OK] Created enterprise Supplier records")

    # 6. Copilot Sessions Collection
    CopilotSession(
        session_id="cpl_89102",
        user_email="admin@drishtiq.auto",
        vin_context="1G1YC2D78R5100003",
        query_prompt="Analyze battery temperature spike on Titan Truck EV",
        ai_response="Cell Module B4 thermal degradation detected. Delta voltage reached 1.2V under peak torque load.",
        suggested_actions=["Replace Module B4", "Perform thermal balancing run"],
        model_version="DrishtIQ-AI-v2.4"
    ).save()
    print("[OK] Created AI Copilot session entry")

    # 7. Alerts Collection
    Alert(
        alert_id="ALT-2026-001",
        title="HV Battery Temperature Threshold Exceeded",
        severity="CRITICAL",
        vin="1G1YC2D78R5100003",
        metric="Battery Temp",
        value="58.4°C (Limit: 52°C)",
        acknowledged=False
    ).save()
    print("[OK] Created real-time Telemetry Alert")

    print("\n=============================================================")
    print("Senior DBA Enterprise Database Build Successful!")
    print("MongoDB Atlas Active Collections:", db.list_collection_names())
    print("=============================================================")

if __name__ == "__main__":
    initialize_enterprise_database()
