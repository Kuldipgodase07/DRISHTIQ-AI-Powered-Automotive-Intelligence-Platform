from rest_framework.views import APIView
from rest_framework import status
from common.response import api_response
from common.db_models import Supplier, ContactSubDocument

class SupplierListView(APIView):
    def get(self, request):
        suppliers = Supplier.objects.all()
        supplier_list = []
        for s in suppliers:
            supplier_list.append({
                "id": str(s.id),
                "supplier_code": s.supplier_code,
                "name": s.name,
                "category": s.category,
                "quality_score": s.quality_score,
                "ppm_defect_rate": s.ppm_defect_rate,
                "risk_level": s.risk_level,
                "total_shipments": s.total_shipments,
                "contact_info": {
                    "contact_name": s.contact_info.contact_name if s.contact_info else "",
                    "email": s.contact_info.email if s.contact_info else "",
                    "phone": s.contact_info.phone if s.contact_info else "",
                } if s.contact_info else None
            })
        return api_response(
            data={"suppliers": supplier_list, "total": len(supplier_list)},
            message="Live supplier quality scorecards retrieved from MongoDB Atlas",
            status_code=status.HTTP_200_OK
        )

    def post(self, request):
        data = request.data
        name = data.get("name")
        code = data.get("supplier_code") or f"SUP-{name[:4].upper()}-{Supplier.objects.count()+1:02d}"
        if not name:
            return api_response(message="Supplier name is required", success=False, status_code=status.HTTP_400_BAD_REQUEST)

        supplier = Supplier(
            supplier_code=code,
            name=name,
            category=data.get("category", "General Components"),
            quality_score=float(data.get("quality_score", 95.0)),
            ppm_defect_rate=int(data.get("ppm_defect_rate", 10)),
            risk_level=data.get("risk_level", "LOW"),
            total_shipments=int(data.get("total_shipments", 1000)),
            contact_info=ContactSubDocument(
                contact_name=data.get("contact_name", "Supplier Quality Rep"),
                email=data.get("email", "quality@supplier.com"),
                phone=data.get("phone", "+91-9800000000")
            )
        )
        supplier.save()

        return api_response(
            data={"id": str(supplier.id), "supplier_code": supplier.supplier_code, "name": supplier.name},
            message="Supplier profile saved in real-time in MongoDB Atlas",
            status_code=status.HTTP_201_CREATED
        )
