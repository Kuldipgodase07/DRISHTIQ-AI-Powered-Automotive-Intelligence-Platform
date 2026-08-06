from rest_framework.views import APIView
from rest_framework import status
from common.response import api_response
from common.db_models import Diagnostic

class DiagnosticListView(APIView):
    def get(self, request):
        diagnostics = Diagnostic.objects.all()
        diag_list = []
        for d in diagnostics:
            diag_list.append({
                "id": str(d.id),
                "dtc_code": d.dtc_code,
                "vin": d.vin,
                "severity": d.severity,
                "system": d.system,
                "description": d.description,
                "recommended_action": d.recommended_action,
                "confidence_score": d.confidence_score,
                "status": d.status,
                "detected_at": d.detected_at.isoformat() if d.detected_at else None
            })
        return api_response(
            data={"diagnostics": diag_list, "total": len(diag_list)},
            message="Live diagnostic fault codes retrieved from MongoDB Atlas",
            status_code=status.HTTP_200_OK
        )

    def post(self, request):
        data = request.data
        dtc = data.get("dtc_code")
        vin = data.get("vin")
        if not dtc or not vin:
            return api_response(message="DTC code and VIN are required", success=False, status_code=status.HTTP_400_BAD_REQUEST)

        diag = Diagnostic(
            dtc_code=dtc,
            vin=vin,
            severity=data.get("severity", "HIGH"),
            system=data.get("system", "General Vehicle Telemetry"),
            description=data.get("description", "Telemetry anomaly detected"),
            recommended_action=data.get("recommended_action", "Inspect component sensor"),
            confidence_score=data.get("confidence_score", 0.90),
            status=data.get("status", "OPEN")
        )
        diag.save()

        return api_response(
            data={"id": str(diag.id), "dtc_code": diag.dtc_code, "status": diag.status},
            message="Diagnostic fault code recorded in real-time in MongoDB Atlas",
            status_code=status.HTTP_201_CREATED
        )
