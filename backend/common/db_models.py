import mongoengine as me
from datetime import datetime, timezone

# -----------------------------------------------------------------------------
# Embedded Sub-Documents (Enterprise Schemas)
# -----------------------------------------------------------------------------

class LocationSubDocument(me.EmbeddedDocument):
    latitude = me.FloatField(required=True, min_value=-90.0, max_value=90.0)
    longitude = me.FloatField(required=True, min_value=-180.0, max_value=180.0)
    city = me.StringField(max_length=100, default="Unknown")
    country = me.StringField(max_length=100, default="India")

class ContactSubDocument(me.EmbeddedDocument):
    contact_name = me.StringField(max_length=100)
    email = me.EmailField()
    phone = me.StringField(max_length=30)

class TelemetrySummarySubDocument(me.EmbeddedDocument):
    speed_kmh = me.FloatField(default=0.0)
    battery_soc = me.FloatField(min_value=0.0, max_value=100.0, default=100.0)
    battery_temp_c = me.FloatField(default=25.0)
    motor_rpm = me.IntField(default=0)
    inverter_temp_c = me.FloatField(default=30.0)
    voltage_v = me.FloatField(default=400.0)

class AuditTrailSubDocument(me.EmbeddedDocument):
    action = me.StringField(required=True)
    performed_by = me.StringField(required=True)
    timestamp = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    notes = me.StringField(default="")


# -----------------------------------------------------------------------------
# Enterprise Document Models & Indexes
# -----------------------------------------------------------------------------

class User(me.Document):
    meta = {
        'collection': 'users',
        'indexes': [
            {'fields': ['email'], 'unique': True},
            {'fields': ['role', 'is_active']},
        ]
    }
    
    ROLE_CHOICES = ('ADMIN', 'ENGINEER', 'MANAGER', 'ANALYST', 'SUPPLIER')

    email = me.EmailField(required=True, unique=True)
    full_name = me.StringField(required=True, max_length=150)
    role = me.StringField(required=True, choices=ROLE_CHOICES, default='ENGINEER')
    department = me.StringField(max_length=150, default='Automotive Intelligence')
    is_active = me.BooleanField(default=True)
    created_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    updated_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))


class Vehicle(me.Document):
    meta = {
        'collection': 'vehicles',
        'indexes': [
            {'fields': ['vin'], 'unique': True},
            {'fields': ['status', 'make']},
            {'fields': ['battery_health']},
        ]
    }

    STATUS_CHOICES = ('HEALTHY', 'WARNING', 'CRITICAL', 'MAINTENANCE')

    vin = me.StringField(required=True, unique=True, min_length=17, max_length=17)
    make = me.StringField(required=True, max_length=100, default='DrishtIQ Motors')
    model = me.StringField(required=True, max_length=100)
    year = me.IntField(required=True, min_value=2000, max_value=2030)
    status = me.StringField(required=True, choices=STATUS_CHOICES, default='HEALTHY')
    battery_health = me.FloatField(min_value=0.0, max_value=100.0, default=100.0)
    odometer_km = me.IntField(default=0)
    firmware_version = me.StringField(max_length=50, default='v4.2.1-PROD')
    location = me.EmbeddedDocumentField(LocationSubDocument)
    telemetry_summary = me.EmbeddedDocumentField(TelemetrySummarySubDocument)
    last_telemetry_sync = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    created_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))


class TelemetryLog(me.Document):
    meta = {
        'collection': 'telemetry_logs',
        'indexes': [
            {'fields': ['vin', '-timestamp']},
            {'fields': ['timestamp']},
        ]
    }

    vin = me.StringField(required=True)
    timestamp = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    speed_kmh = me.FloatField(default=0.0)
    battery_soc = me.FloatField(default=100.0)
    battery_temp_c = me.FloatField(default=25.0)
    voltage = me.FloatField(default=400.0)
    current_a = me.FloatField(default=10.0)
    dtc_flags = me.ListField(me.StringField(), default=list)


class Diagnostic(me.Document):
    meta = {
        'collection': 'diagnostics',
        'indexes': [
            {'fields': ['dtc_code']},
            {'fields': ['vin']},
            {'fields': ['severity', 'status']},
        ]
    }

    SEVERITY_CHOICES = ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')
    STATUS_CHOICES = ('OPEN', 'INVESTIGATING', 'RESOLVED')

    dtc_code = me.StringField(required=True)
    vin = me.StringField(required=True)
    severity = me.StringField(required=True, choices=SEVERITY_CHOICES, default='HIGH')
    system = me.StringField(required=True)
    description = me.StringField(required=True)
    recommended_action = me.StringField(required=True)
    confidence_score = me.FloatField(min_value=0.0, max_value=1.0, default=0.90)
    status = me.StringField(choices=STATUS_CHOICES, default='OPEN')
    detected_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    resolved_at = me.DateTimeField(null=True)


class WarrantyClaim(me.Document):
    meta = {
        'collection': 'warranty_claims',
        'indexes': [
            {'fields': ['claim_id'], 'unique': True},
            {'fields': ['vin']},
            {'fields': ['supplier_name', 'status']},
        ]
    }

    STATUS_CHOICES = ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'PAID')

    claim_id = me.StringField(required=True, unique=True)
    vin = me.StringField(required=True)
    component = me.StringField(required=True)
    supplier_name = me.StringField(required=True)
    claim_amount = me.FloatField(required=True, min_value=0.0)
    status = me.StringField(choices=STATUS_CHOICES, default='SUBMITTED')
    defect_category = me.StringField(required=True)
    audit_history = me.EmbeddedDocumentListField(AuditTrailSubDocument, default=list)
    submitted_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))


class Supplier(me.Document):
    meta = {
        'collection': 'suppliers',
        'indexes': [
            {'fields': ['supplier_code'], 'unique': True},
            {'fields': ['name']},
            {'fields': ['risk_level']},
        ]
    }

    RISK_CHOICES = ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')

    supplier_code = me.StringField(required=True, unique=True)
    name = me.StringField(required=True)
    category = me.StringField(required=True)
    quality_score = me.FloatField(min_value=0.0, max_value=100.0, default=95.0)
    ppm_defect_rate = me.IntField(default=0)
    risk_level = me.StringField(choices=RISK_CHOICES, default='LOW')
    total_shipments = me.IntField(default=0)
    contact_info = me.EmbeddedDocumentField(ContactSubDocument)
    created_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))


class CopilotSession(me.Document):
    meta = {
        'collection': 'copilot_sessions',
        'indexes': [
            {'fields': ['session_id'], 'unique': True},
            {'fields': ['user_email']},
            {'fields': ['-created_at']},
        ]
    }

    session_id = me.StringField(required=True, unique=True)
    user_email = me.StringField(required=True)
    vin_context = me.StringField(default="")
    query_prompt = me.StringField(required=True)
    ai_response = me.StringField(required=True)
    suggested_actions = me.ListField(me.StringField(), default=list)
    model_version = me.StringField(default="DrishtIQ-AI-v2.4")
    created_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))


class Alert(me.Document):
    meta = {
        'collection': 'alerts',
        'indexes': [
            {'fields': ['alert_id'], 'unique': True},
            {'fields': ['vin']},
            {'fields': ['severity', 'acknowledged']},
            {'fields': ['-timestamp']},
        ]
    }

    SEVERITY_CHOICES = ('CRITICAL', 'WARNING', 'INFO')

    alert_id = me.StringField(required=True, unique=True)
    title = me.StringField(required=True)
    severity = me.StringField(choices=SEVERITY_CHOICES, default='WARNING')
    vin = me.StringField(required=True)
    metric = me.StringField(required=True)
    value = me.StringField(required=True)
    acknowledged = me.BooleanField(default=False)
    acknowledged_by = me.StringField(default="")
    timestamp = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
