# DrishtIQ API Specification (OpenAPI 3.0 Summary)

Base URL: `/api/v1`

## Endpoints

### 1. Authentication (`/api/v1/auth/`)
- `POST /api/v1/auth/login/` - Authenticate user & issue JWT tokens.
- `POST /api/v1/auth/register/` - Register new fleet manager/engineer user.

### 2. Fleet & Vehicle Telemetry (`/api/v1/vehicles/`)
- `GET /api/v1/vehicles/` - List all vehicles with battery health, speed, and status summary.
- `GET /api/v1/vehicles/<vin>/` - Detailed vehicle information & telemetry metrics.
- `POST /api/v1/vehicles/<vin>/telemetry/` - Ingest CAN-bus telemetry stream payload.

### 3. Diagnostics & AI Inference (`/api/v1/diagnostics/`)
- `GET /api/v1/diagnostics/` - List all diagnostic trouble codes (DTC) and alert logs.
- `POST /api/v1/diagnostics/analyze-dtc/` - Run AI ML Root Cause Classifier on DTC code.

### 4. Alerts & Anomaly Management (`/api/v1/alerts/`)
- `GET /api/v1/alerts/` - Fetch system-wide thermal, voltage, and speed anomalies.
- `PATCH /api/v1/alerts/<alert_id>/acknowledge/` - Mark alert as acknowledged/resolved.

### 5. Supplier Risk Management (`/api/v1/suppliers/`)
- `GET /api/v1/suppliers/` - Supplier defect rates (PPM), warranty claim impact, and risk classification.
- `POST /api/v1/suppliers/evaluate-risk/` - Run AI Supplier Risk ML model.

### 6. AI Copilot (`/api/v1/copilot/`)
- `POST /api/v1/copilot/query/` - Interactive diagnostic prompt executing battery RUL & anomaly models.
