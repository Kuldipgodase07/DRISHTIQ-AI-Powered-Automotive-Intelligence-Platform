import unittest
import sys
import os

# Ensure package root is in sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from ai_ml.inference_service import ml_service

class TestDrishtIQSystemIntegration(unittest.TestCase):
    """
    End-to-End System Integration Test Suite verifying Telemetry Ingestion -> ML Inference -> Diagnostic Output.
    """

    def test_battery_rul_pipeline(self):
        """Test Battery Remaining Useful Life (RUL) regression inference."""
        res = ml_service.predict_battery_rul(speed_kmh=65.0, battery_soc=88.0, battery_temp_c=28.0)
        self.assertIn("predicted_soh_percent", res)
        self.assertIn("estimated_rul_km", res)
        self.assertGreater(res["predicted_soh_percent"], 50.0)
        self.assertGreaterEqual(res["estimated_rul_km"], 0)

    def test_telemetry_anomaly_pipeline(self):
        """Test Isolation Forest anomaly detection inference."""
        # Test nominal telemetry
        res_normal = ml_service.detect_telemetry_anomaly(speed_kmh=60.0, battery_soc=80.0, battery_temp_c=25.0)
        self.assertIn("is_anomaly", res_normal)
        self.assertIn("classification", res_normal)

        # Test extreme thermal surge telemetry
        res_critical = ml_service.detect_telemetry_anomaly(speed_kmh=140.0, battery_soc=10.0, battery_temp_c=75.0, voltage=270.0, current_a=220.0)
        self.assertTrue(res_critical["is_anomaly"])
        self.assertEqual(res_critical["classification"], "CRITICAL_ANOMALY")

    def test_dtc_root_cause_classifier(self):
        """Test Diagnostic Trouble Code (DTC) root cause classification engine."""
        res_dtc = ml_service.analyze_dtc_root_cause("P0A80")
        self.assertEqual(res_dtc["dtc_code"], "P0A80")
        self.assertIn("High Voltage Battery Bus", res_dtc["system"])
        self.assertGreater(res_dtc["confidence_score"], 0.8)

    def test_supplier_risk_evaluator(self):
        """Test Supplier Quality & Defect Risk Evaluator."""
        res_supplier = ml_service.evaluate_supplier_risk(ppm_defect_rate=120, claim_cost_usd=25000.0)
        self.assertIn("risk_level", res_supplier)
        self.assertEqual(res_supplier["risk_level"], "CRITICAL")

if __name__ == "__main__":
    print("Running DrishtIQ Automotive Intelligence Platform E2E Integration Suite...")
    unittest.main()
