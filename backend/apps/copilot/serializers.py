from rest_framework import serializers

class CopilotQuerySerializer(serializers.Serializer):
    prompt = serializers.CharField(required=True)
    vin = serializers.CharField(required=False, allow_blank=True)
