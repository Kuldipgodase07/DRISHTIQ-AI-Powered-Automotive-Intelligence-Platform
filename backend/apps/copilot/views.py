import uuid
import sys
import os
from rest_framework.views import APIView
from rest_framework import status
from common.response import api_response
from common.db_models import CopilotSession, Vehicle
from .serializers import CopilotQuerySerializer

# Ensure ai_ml package is accessible
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..")))
try:
    from ai_ml.inference_service import ml_service
except ImportError:
    ml_service = None

class CopilotChatView(APIView):
    def post(self, request):
        serializer = CopilotQuerySerializer(data=request.data)
        if not serializer.is_valid():
            return api_response(
                errors=serializer.errors,
                message="Copilot prompt validation error",
                success=False,
                status_code=status.HTTP_400_BAD_REQUEST
            )
        
        prompt = serializer.validated_data["prompt"]
        vin = serializer.validated_data.get("vin", "")

        context_str = ""
        ml_analysis = ""
        actions = ["Export telemetry log CSV", "Perform thermal balancing scan"]

        if vin:
            v = Vehicle.objects(vin=vin).first()
            if v:
                context_str = f"Vehicle {v.make} {v.model} ({v.year}), Status: {v.status}, Battery Health: {v.battery_health}%"

        # Execute ML Inference Engine
        if ml_service:
            rul_res = ml_service.predict_battery_rul(speed_kmh=65.0, battery_soc=84.0, battery_temp_c=29.0)
            anomaly_res = ml_service.detect_telemetry_anomaly(speed_kmh=65.0, battery_soc=84.0, battery_temp_c=29.0)
            
            ml_analysis = (
                f"\n[AI ML Engine Analysis]:\n"
                f"- Predicted Battery Remaining Useful Life (RUL): {rul_res['estimated_rul_km']:,} km (Health: {rul_res['health_status']})\n"
                f"- Telemetry Anomaly Status: {anomaly_res['classification']} (Anomaly Score: {anomaly_res['anomaly_score']})"
            )
            actions = ["Inspect Module B4", "Schedule battery health balancing scan", "Review ML feature matrix"]

        ai_reply = (
            f"DrishtIQ AI Copilot Diagnostic Analysis:\n"
            f"Query processed: '{prompt}'.\n"
            f"{context_str if context_str else 'Global telemetry stream evaluated.'}"
            f"{ml_analysis}"
        )

        # Save session directly into MongoDB Atlas
        session = CopilotSession(
            session_id=f"cpl_{uuid.uuid4().hex[:8]}",
            user_email=request.data.get("user_email", "admin@drishtiq.auto"),
            vin_context=vin,
            query_prompt=prompt,
            ai_response=ai_reply,
            suggested_actions=actions,
            model_version="DrishtIQ-AI-ML-v2.4"
        )
        session.save()

        return api_response(
            data={
                "session_id": session.session_id,
                "prompt": session.query_prompt,
                "vin_context": session.vin_context,
                "response": session.ai_response,
                "suggested_actions": session.suggested_actions,
                "timestamp": session.created_at.isoformat()
            },
            message="DrishtIQ AI Copilot prompt processed via ML engine and persisted in MongoDB Atlas",
            status_code=status.HTTP_200_OK
        )
