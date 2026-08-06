from datetime import datetime

class CopilotSessionDocument:
    """
    MongoDB Copilot Chat Session & Prompt Log document.
    """
    collection_name = "copilot_sessions"

    @staticmethod
    def generate_copilot_response(prompt, vin=None):
        return {
            "session_id": "cpl_89102",
            "prompt": prompt,
            "vin_context": vin or "1G1YC2D78R5100003",
            "response": (
                f"DrishtIQ Copilot Diagnostic Analysis:\n"
                f"Query parsed for vehicle context '{vin or 'Apex EV-9'}'.\n"
                f"Telemetry scan shows normal inverter coolant flow (2.4 L/min) and "
                f"high-voltage battery state of health at 98.4%. No active high-severity DTCs detected."
            ),
            "suggested_actions": [
                "Schedule routine 30,000 km battery cell balance scan",
                "Review supplier quality audit for Module B4",
                "Export telemetry log CSV"
            ],
            "timestamp": datetime.utcnow().isoformat()
        }
