from rest_framework import serializers

class DiagnosticSerializer(serializers.Serializer):
    id = serializers.CharField()
    dtc_code = serializers.CharField()
    severity = serializers.CharField()
    system = serializers.CharField()
    description = serializers.CharField()
    recommended_action = serializers.CharField()
    confidence_score = serializers.FloatField()
    detected_at = serializers.CharField()
