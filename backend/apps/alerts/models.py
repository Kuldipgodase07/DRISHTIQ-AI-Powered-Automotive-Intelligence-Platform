class AlertDocument:
    """
    MongoDB Real-time Alert document schema.
    """
    collection_name = "alerts"

    @staticmethod
    def get_sample_alerts():
        return [
            {
                "id": "alt_01",
                "title": "HV Battery Temperature Threshold Exceeded",
                "severity": "CRITICAL",
                "vin": "1G1YC2D78R5100003",
                "metric": "Battery Temp",
                "value": "58.4°C (Limit: 52°C)",
                "acknowledged": False,
                "timestamp": "2026-08-06T18:45:00Z"
            },
            {
                "id": "alt_02",
                "title": "Brake Fluid Pressure Drop Warning",
                "severity": "WARNING",
                "vin": "1G1YC2D78R5100002",
                "metric": "Hydraulic Line Pressure",
                "value": "112 PSI (Expected: 145 PSI)",
                "acknowledged": True,
                "timestamp": "2026-08-06T17:30:10Z"
            }
        ]
