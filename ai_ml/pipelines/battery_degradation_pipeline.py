import os
import joblib
import numpy as np
from .feature_engineering import FeatureEngineeringPipeline

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "battery_rul_regressor.joblib")

class BatteryDegradationPipeline:
    """
    Predictive Battery Degradation & RUL Model Pipeline.
    Estimates State of Health (SoH %) and Remaining Useful Life (RUL in kilometers).
    """

    def __init__(self):
        self.model = self._load_or_fallback_model()

    def _load_or_fallback_model(self):
        if os.path.exists(MODEL_PATH):
            try:
                return joblib.load(MODEL_PATH)
            except Exception:
                pass
        return None

    def predict_rul(self, speed_kmh, battery_soc, battery_temp_c, odometer_km=25000):
        features = FeatureEngineeringPipeline.extract_telemetry_features(
            speed_kmh=speed_kmh,
            battery_soc=battery_soc,
            battery_temp_c=battery_temp_c
        )

        if self.model:
            predicted_soh = float(self.model.predict(features)[0])
        else:
            # Algorithmic fallback estimation
            thermal_penalty = max(0.0, (battery_temp_c - 35.0) * 0.25)
            odometer_penalty = (odometer_km / 100000.0) * 8.0
            predicted_soh = max(60.0, min(100.0, 100.0 - odometer_penalty - thermal_penalty))

        # RUL estimation based on SoH degradation rate (assuming replacement threshold at 70% SoH)
        remaining_soh_margin = max(0.0, predicted_soh - 70.0)
        rul_km = round(remaining_soh_margin * 5500.0)

        return {
            "predicted_soh_percent": round(predicted_soh, 2),
            "estimated_rul_km": int(rul_km),
            "health_status": "EXCELLENT" if predicted_soh >= 90 else ("GOOD" if predicted_soh >= 80 else "DEGRADED"),
            "thermal_impact": "HIGH" if battery_temp_c > 45.0 else "NOMINAL"
        }
