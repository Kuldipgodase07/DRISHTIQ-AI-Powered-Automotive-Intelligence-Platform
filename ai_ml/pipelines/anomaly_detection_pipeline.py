import os
import joblib
from .feature_engineering import FeatureEngineeringPipeline

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "anomaly_isolation_forest.joblib")

class TelemetryAnomalyPipeline:
    """
    Real-Time Unsupervised Anomaly Detection Pipeline using Isolation Forest.
    Detects abnormal voltage spikes, thermal surges, or unexpected motor loads.
    """

    def __init__(self):
        self.model = self._load_model()

    def _load_model(self):
        if os.path.exists(MODEL_PATH):
            try:
                return joblib.load(MODEL_PATH)
            except Exception:
                pass
        return None

    def detect_anomaly(self, speed_kmh, battery_soc, battery_temp_c, voltage=400.0, current_a=15.0):
        features = FeatureEngineeringPipeline.extract_telemetry_features(
            speed_kmh=speed_kmh,
            battery_soc=battery_soc,
            battery_temp_c=battery_temp_c,
            voltage=voltage,
            current_a=current_a
        )

        is_anomaly = False
        anomaly_score = 0.15

        if self.model:
            prediction = self.model.predict(features)[0]  # -1 = anomaly, 1 = normal
            is_anomaly = (prediction == -1)
            raw_score = float(self.model.decision_function(features)[0])
            anomaly_score = round(max(0.0, min(1.0, 0.5 - raw_score)), 3)
        else:
            # Algorithmic threshold fallback
            if battery_temp_c > 52.0 or voltage < 320.0 or current_a > 180.0:
                is_anomaly = True
                anomaly_score = 0.88

        return {
            "is_anomaly": bool(is_anomaly),
            "anomaly_score": float(anomaly_score),
            "classification": "CRITICAL_ANOMALY" if is_anomaly else "NORMAL",
            "evaluated_metrics": {
                "speed_kmh": speed_kmh,
                "battery_temp_c": battery_temp_c,
                "voltage": voltage,
                "current_a": current_a
            }
        }
