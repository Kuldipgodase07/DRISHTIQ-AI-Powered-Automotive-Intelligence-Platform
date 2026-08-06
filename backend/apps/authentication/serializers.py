from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=100)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, min_length=6, write_only=True)
    role = serializers.ChoiceField(choices=["ADMIN", "ENGINEER", "MANAGER", "ANALYST", "SUPPLIER"], default="ENGINEER")

class UserProfileSerializer(serializers.Serializer):
    id = serializers.CharField()
    email = serializers.EmailField()
    name = serializers.CharField()
    role = serializers.CharField()
    department = serializers.CharField()
    is_active = serializers.BooleanField()
    created_at = serializers.CharField()
