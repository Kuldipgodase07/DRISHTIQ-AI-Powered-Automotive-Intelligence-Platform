from rest_framework import serializers

class SupplierSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
    category = serializers.CharField()
    quality_score = serializers.FloatField()
    ppm_defect_rate = serializers.IntegerField()
    risk_level = serializers.CharField()
    total_shipments = serializers.IntegerField()
