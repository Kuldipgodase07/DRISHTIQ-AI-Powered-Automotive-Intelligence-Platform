class WarrantyDocument:
    """
    MongoDB Warranty Claim Document schema.
    """
    collection_name = "warranty_claims"

    @staticmethod
    def get_sample_claims():
        return [
            {
                "claim_id": "CLM-2026-9042",
                "vin": "1G1YC2D78R5100003",
                "component": "HV Battery Cell Module B4",
                "supplier_name": "Apex Power Systems Inc.",
                "claim_amount": 3450.00,
                "status": "APPROVED",
                "defect_category": "Thermal Degradation Leakage",
                "submitted_at": "2026-08-01T10:00:00Z"
            },
            {
                "claim_id": "CLM-2026-9043",
                "vin": "1G1YC2D78R5100002",
                "component": "Front Wheel ABS Hub Assembly",
                "supplier_name": "ChassisTech Dynamics",
                "claim_amount": 890.50,
                "status": "PENDING_REVIEW",
                "defect_category": "Sensor Signal Noise",
                "submitted_at": "2026-08-04T15:30:00Z"
            }
        ]
