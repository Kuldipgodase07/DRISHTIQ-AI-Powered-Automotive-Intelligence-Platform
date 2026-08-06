class DiagnosticDocument:
    """
    MongoDB Root Cause & Predictive Diagnostic document schema.
    """
    collection_name = "diagnostics"

    @staticmethod
    def get_sample_faults():
        return [
            {
                "id": "diag_101",
                "dtc_code": "P0A80",
                "severity": "CRITICAL",
                "system": "High Voltage Battery Pack",
                "description": "Replace Hybrid/EV Battery Pack Cell Module #4 Delta Voltage Anomaly",
                "recommended_action": "Isolate high voltage contactors and replace Module B4",
                "confidence_score": 0.94,
                "detected_at": "2026-08-06T14:22:00Z"
            },
            {
                "id": "diag_102",
                "dtc_code": "C1203",
                "severity": "HIGH",
                "system": "Brake Control System",
                "description": "ABS Sensor Speed Correlation Circuit Malfunction Front-Right",
                "recommended_action": "Inspect harness connection and clean sensor tone ring",
                "confidence_score": 0.88,
                "detected_at": "2026-08-06T16:10:00Z"
            }
        ]
