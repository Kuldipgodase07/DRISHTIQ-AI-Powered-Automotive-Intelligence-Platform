from rest_framework.views import APIView
from rest_framework import status
from common.response import api_response
from common.db_models import WarrantyClaim, AuditTrailSubDocument

class WarrantyListView(APIView):
    def get(self, request):
        claims = WarrantyClaim.objects.all()
        claim_list = []
        for c in claims:
            claim_list.append({
                "id": str(c.id),
                "claim_id": c.claim_id,
                "vin": c.vin,
                "component": c.component,
                "supplier_name": c.supplier_name,
                "claim_amount": c.claim_amount,
                "status": c.status,
                "defect_category": c.defect_category,
                "submitted_at": c.submitted_at.isoformat() if c.submitted_at else None,
                "audit_history": [
                    {
                        "action": a.action,
                        "performed_by": a.performed_by,
                        "notes": a.notes,
                        "timestamp": a.timestamp.isoformat() if a.timestamp else None
                    } for a in c.audit_history
                ]
            })
        return api_response(
            data={"claims": claim_list, "total": len(claim_list)},
            message="Live warranty claims retrieved from MongoDB Atlas",
            status_code=status.HTTP_200_OK
        )

    def post(self, request):
        data = request.data
        claim_id = data.get("claim_id") or f"CLM-2026-{WarrantyClaim.objects.count() + 9001}"
        vin = data.get("vin")
        if not vin:
            return api_response(message="VIN is required for warranty claim", success=False, status_code=status.HTTP_400_BAD_REQUEST)

        claim = WarrantyClaim(
            claim_id=claim_id,
            vin=vin,
            component=data.get("component", "General Automotive Part"),
            supplier_name=data.get("supplier_name", "Apex Power Systems Inc."),
            claim_amount=float(data.get("claim_amount", 1200.00)),
            status=data.get("status", "SUBMITTED"),
            defect_category=data.get("defect_category", "Component Failure")
        )
        claim.audit_history.append(
            AuditTrailSubDocument(
                action="CLAIM_SUBMITTED",
                performed_by=data.get("submitted_by", "Platform User"),
                notes="Real-time warranty claim registered."
            )
        )
        claim.save()

        return api_response(
            data={"id": str(claim.id), "claim_id": claim.claim_id, "status": claim.status},
            message="Warranty claim created in real-time in MongoDB Atlas",
            status_code=status.HTTP_201_CREATED
        )
