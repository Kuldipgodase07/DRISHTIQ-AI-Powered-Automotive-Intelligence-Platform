import os
import joblib
from .feature_engineering import FeatureEngineeringPipeline

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "supplier_risk_evaluator.joblib")

class SupplierQualityPipeline:
    """
    Supplier Risk & Quality Rating Algorithm.
    Evaluates PPM defect rate, warranty claim impact, and shipment volumes.
    """

    def evaluate_supplier_risk(self, ppm_defect_rate, claim_cost_usd=0.0, total_shipments=1000):
        ppm = int(ppm_defect_rate)
        claim_ratio = (float(claim_cost_usd) / max(1, total_shipments)) * 100.0

        # Algorithmic risk matrix score
        risk_score = (ppm * 0.6) + (claim_ratio * 0.4)

        if risk_score > 100 or ppm > 100:
            risk_level = "CRITICAL"
        elif risk_score > 50 or ppm > 35:
            risk_level = "HIGH"
        elif risk_score > 20 or ppm > 15:
            risk_level = "MEDIUM"
        else:
            risk_level = "LOW"

        quality_score = max(50.0, min(100.0, 100.0 - (ppm * 0.25) - (claim_ratio * 0.1)))

        return {
            "ppm_defect_rate": ppm,
            "quality_score": round(quality_score, 1),
            "calculated_risk_score": round(risk_score, 2),
            "risk_level": risk_level,
            "recommendation": "Maintain standard audit schedule" if risk_level == "LOW" else ("Increase batch QA sampling" if risk_level in ("MEDIUM", "HIGH") else "Issue Immediate Quality Hold Notice")
        }
