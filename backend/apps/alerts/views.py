import uuid
from rest_framework.views import APIView
from rest_framework import status
from common.response import api_response
from common.db_models import Alert

class AlertListView(APIView):
    def get(self, request):
        alerts = Alert.objects.all()
        alert_list = []
        for a in alerts:
            alert_list.append({
                "id": str(a.id),
                "alert_id": a.alert_id,
                "title": a.title,
                "severity": a.severity,
                "vin": a.vin,
                "metric": a.metric,
                "value": a.value,
                "acknowledged": a.acknowledged,
                "acknowledged_by": a.acknowledged_by,
                "timestamp": a.timestamp.isoformat() if a.timestamp else None
            })
        return api_response(
            data={"alerts": alert_list, "total": len(alert_list)},
            message="Live telemetry alerts retrieved from MongoDB Atlas",
            status_code=status.HTTP_200_OK
        )

    def post(self, request):
        data = request.data
        alert_id = data.get("alert_id") or f"ALT-2026-{uuid.uuid4().hex[:4].upper()}"
        vin = data.get("vin")
        title = data.get("title")
        if not vin or not title:
            return api_response(message="VIN and Alert Title are required", success=False, status_code=status.HTTP_400_BAD_REQUEST)

        alert = Alert(
            alert_id=alert_id,
            title=title,
            severity=data.get("severity", "WARNING"),
            vin=vin,
            metric=data.get("metric", "Telemetry Metric"),
            value=data.get("value", "Exceeded threshold"),
            acknowledged=False
        )
        alert.save()

        return api_response(
            data={"id": str(alert.id), "alert_id": alert.alert_id, "severity": alert.severity},
            message="Telemetry threshold alert created in real-time in MongoDB Atlas",
            status_code=status.HTTP_201_CREATED
        )


class AlertAcknowledgeView(APIView):
    def patch(self, request, alert_id):
        alert = Alert.objects(alert_id=alert_id).first() or Alert.objects(id=alert_id).first()
        if not alert:
            return api_response(message=f"Alert '{alert_id}' not found", success=False, status_code=status.HTTP_404_NOT_FOUND)

        alert.acknowledged = True
        alert.acknowledged_by = request.data.get("acknowledged_by", "Platform Engineer")
        alert.save()

        return api_response(
            data={"alert_id": alert.alert_id, "acknowledged": True, "acknowledged_by": alert.acknowledged_by},
            message="Alert acknowledged in real-time in MongoDB Atlas",
            status_code=status.HTTP_200_OK
        )
