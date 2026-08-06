class SupplierDocument:
    """
    MongoDB Supplier Quality metrics document.
    """
    collection_name = "suppliers"

    @staticmethod
    def get_sample_suppliers():
        return [
            {
                "id": "sup_01",
                "name": "Apex Power Systems Inc.",
                "category": "High Voltage Batteries",
                "quality_score": 96.2,
                "ppm_defect_rate": 14,
                "risk_level": "LOW",
                "total_shipments": 4820,
            },
            {
                "id": "sup_02",
                "name": "ChassisTech Dynamics",
                "category": "Braking & Suspension",
                "quality_score": 88.5,
                "ppm_defect_rate": 42,
                "risk_level": "MEDIUM",
                "total_shipments": 12100,
            }
        ]
