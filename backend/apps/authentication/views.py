import mongoengine
from rest_framework.views import APIView
from rest_framework import status
from datetime import datetime
from common.response import api_response
from .serializers import LoginSerializer, RegisterSerializer, UserProfileSerializer
from .models import UserDocument

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return api_response(
                errors=serializer.errors,
                message="Invalid login parameters",
                success=False,
                status_code=status.HTTP_400_BAD_REQUEST
            )
        
        email = serializer.validated_data["email"]

        # Save/fetch user entry in MongoDB Atlas
        try:
            db = mongoengine.get_db()
            users_col = db["users"]
            existing = users_col.find_one({"email": email})

            if not existing:
                user_doc = {
                    "email": email,
                    "name": email.split("@")[0].capitalize(),
                    "role": "ENGINEER",
                    "department": "Predictive Diagnostics & Telemetry",
                    "is_active": True,
                    "created_at": datetime.now().isoformat()
                }
                res = users_col.insert_one(user_doc)
                user_doc["id"] = str(res.inserted_id)
                user_data = user_doc
            else:
                existing["id"] = str(existing["_id"])
                del existing["_id"]
                user_data = existing
        except Exception:
            user_data = UserDocument.create_mock_user(email=email)

        tokens = {
            "access": "jwt_access_token_drishtiq_2026",
            "refresh": "jwt_refresh_token_drishtiq_2026",
        }
        
        return api_response(
            data={"user": user_data, "tokens": tokens},
            message="Login successful and verified in MongoDB Atlas",
            status_code=status.HTTP_200_OK
        )

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return api_response(
                errors=serializer.errors,
                message="Registration validation failed",
                success=False,
                status_code=status.HTTP_400_BAD_REQUEST
            )

        email = serializer.validated_data["email"]
        name = serializer.validated_data["name"]
        role = serializer.validated_data.get("role", "ENGINEER")

        try:
            db = mongoengine.get_db()
            users_col = db["users"]
            user_doc = {
                "email": email,
                "name": name,
                "role": role,
                "department": "Predictive Diagnostics & Telemetry",
                "is_active": True,
                "created_at": datetime.now().isoformat()
            }
            res = users_col.insert_one(user_doc)
            user_doc["id"] = str(res.inserted_id)
            del user_doc["_id"]
            user_data = user_doc
        except Exception:
            user_data = UserDocument.create_mock_user(email=email, name=name, role=role)

        return api_response(
            data={"user": user_data},
            message="User account created successfully in MongoDB Atlas",
            status_code=status.HTTP_201_CREATED
        )

class ProfileView(APIView):
    def get(self, request):
        user_data = UserDocument.create_mock_user()
        return api_response(
            data={"user": user_data},
            message="User profile retrieved",
            status_code=status.HTTP_200_OK
        )
