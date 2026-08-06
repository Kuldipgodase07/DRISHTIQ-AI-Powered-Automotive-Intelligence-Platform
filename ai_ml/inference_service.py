import sys
import os

# Ensure package imports resolve when executed directly or as module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

try:
    from ai_ml.pipelines.battery_degradation_pipeline import BatteryDegradationPipeline
    from ai_ml.pipelines.anomaly_detection_pipeline import TelemetryAnomalyPipeline
    from ai_ml.pipelines.root_cause_pipeline import RootCauseAnalysisPipeline
    from ai_ml.pipelines.supplier_quality_pipeline import SupplierQualityPipeline
except ImportError:
    from pipelines.battery_degradation_pipeline import BatteryDegradationPipeline
    from pipelines.anomaly_detection_pipeline import TelemetryAnomalyPipeline
    from pipelines.root_cause_pipeline import RootCauseAnalysisPipeline
    from pipelines.supplier_quality_pipeline import SupplierQualityPipeline

class AIMLInferenceService:
    """
    Unified High-Level AI/ML Inference Service Interface for Enterprise Applications.
    """

    def __init__(self):
        self.battery_pipeline = BatteryDegradationPipeline()
        self.anomaly_pipeline = TelemetryAnomalyPipeline()
        self.root_cause_pipeline = RootCauseAnalysisPipeline()
        self.supplier_pipeline = SupplierQualityPipeline()

    def predict_battery_rul(self, speed_kmh, battery_soc, battery_temp_c, odometer_km=25000):
        """Runs battery remaining useful life (RUL) regression model."""
        return self.battery_pipeline.predict_rul(
            speed_kmh=speed_kmh,
            battery_soc=battery_soc,
            battery_temp_c=battery_temp_c,
            odometer_km=odometer_km
        )

    def detect_telemetry_anomaly(self, speed_kmh, battery_soc, battery_temp_c, voltage=400.0, current_a=15.0):
        """Runs Isolation Forest anomaly detection model."""
        return self.anomaly_pipeline.detect_anomaly(
            speed_kmh=speed_kmh,
            battery_soc=battery_soc,
            battery_temp_c=battery_temp_c,
            voltage=voltage,
            current_a=current_a
        )

    def analyze_dtc_root_cause(self, dtc_code, telemetry_context=None):
        """Classifies DTC fault code root cause and resolution actions."""
        return self.root_cause_pipeline.analyze_dtc(
            dtc_code=dtc_code,
            telemetry_context=telemetry_context
        )

    def evaluate_supplier_risk(self, ppm_defect_rate, claim_cost_usd=0.0, total_shipments=1000):
        """Evaluates supplier quality score and risk classification."""
        return self.supplier_pipeline.evaluate_supplier_risk(
            ppm_defect_rate=ppm_defect_rate,
            claim_cost_usd=claim_cost_usd,
            total_shipments=total_shipments
        )

# Global singleton instance for high-throughput reuse
ml_service = AIMLInferenceService()

if __name__ == "__main__":
    print("Testing AIMLInferenceService...")
    res_battery = ml_service.predict_battery_rul(speed_kmh=75.0, battery_soc=82.0, battery_temp_c=34.0)
    print("Battery RUL Result:", res_battery)

    res_anomaly = ml_service.detect_telemetry_anomaly(speed_kmh=120.0, battery_soc=20.0, battery_temp_c=58.0, voltage=310.0, current_a=190.0)
    print("Anomaly Detection Result:", res_anomaly)

    res_dtc = ml_service.analyze_dtc_root_cause("P0A80")
    print("DTC Analysis Result:", res_dtc)

    res_supplier = ml_service.evaluate_supplier_risk(ppm_defect_rate=45, claim_cost_usd=12000)
    print("Supplier Risk Result:", res_supplier)
