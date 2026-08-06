from datetime import datetime

class UserDocument:
    """
    MongoDB User Document schema specification for MongoEngine.
    """
    collection_name = "users"

    ROLE_CHOICES = ("ADMIN", "ENGINEER", "MANAGER", "ANALYST", "SUPPLIER")

    @staticmethod
    def create_mock_user(email="admin@drishtiq.auto", name="Automotive Lead Engineer", role="ENGINEER"):
        return {
            "id": "usr_01H1234567890",
            "email": email,
            "name": name,
            "role": role,
            "department": "Predictive Diagnostics & Telemetry",
            "is_active": True,
            "created_at": datetime.utcnow().isoformat(),
        }
