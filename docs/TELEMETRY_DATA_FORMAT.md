# Automotive Telemetry Data Specification (CAN-Bus / OBD-II)

## Payload JSON Schema

Vehicles transmit real-time telemetry frames to the DrishtIQ platform using the following structure:

```json
{
  "vin": "1G1FY6S08K4102938",
  "timestamp": "2026-08-06T20:20:00Z",
  "telemetry": {
    "speed_kmh": 72.5,
    "odometer_km": 34820,
    "battery_soc": 84.0,
    "battery_temp_c": 33.5,
    "voltage": 402.1,
    "current_a": 18.4,
    "coolant_temp_c": 88.0,
    "motor_rpm": 4200
  },
  "dtc_codes": [
    "P0A80"
  ],
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194
  }
}
```

## Derived ML Feature Vector (8-Dimensional)

The feature engineering pipeline (`ai_ml/pipelines/feature_engineering.py`) cleans and transforms incoming telemetry into an 8-dimensional normalized input vector:

1. `speed_kmh` (0.0 - 200.0)
2. `battery_soc` (0.0 - 100.0 %)
3. `battery_temp_c` (-20.0 - 85.0 °C)
4. `voltage` (200.0 - 500.0 V)
5. `current_a` (0.0 - 350.0 A)
6. `power_kw` (`(voltage * current_a) / 1000.0`)
7. `thermal_gradient` (`max(0.0, battery_temp_c - 30.0)`)
8. `c_rate` (`current_a / 100.0`)
