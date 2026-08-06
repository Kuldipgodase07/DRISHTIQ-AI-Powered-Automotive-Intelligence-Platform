from rest_framework import serializers

class VehicleSerializer(serializers.Serializer):
    id = serializers.CharField()
    vin = serializers.CharField()
    make = serializers.CharField()
    model = serializers.CharField()
    year = serializers.IntegerField()
    status = serializers.CharField()
    battery_health = serializers.FloatField()
    odometer_km = serializers.IntegerField()
    location = serializers.DictField()
    firmware_version = serializers.CharField()
    last_telemetry_sync = serializers.CharField()
