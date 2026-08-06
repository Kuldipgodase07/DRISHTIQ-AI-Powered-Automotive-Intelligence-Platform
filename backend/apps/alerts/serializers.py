from rest_framework import serializers

class AlertSerializer(serializers.Serializer):
    id = serializers.CharField()
    title = serializers.CharField()
    severity = serializers.CharField()
    vin = serializers.CharField()
    metric = serializers.CharField()
    value = serializers.CharField()
    acknowledged = serializers.BooleanField()
    timestamp = serializers.CharField()
