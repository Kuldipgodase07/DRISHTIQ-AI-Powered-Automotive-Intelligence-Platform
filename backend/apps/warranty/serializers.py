from rest_framework import serializers

class WarrantyClaimSerializer(serializers.Serializer):
    claim_id = serializers.CharField()
    vin = serializers.CharField()
    component = serializers.CharField()
    supplier_name = serializers.CharField()
    claim_amount = serializers.FloatField()
    status = serializers.CharField()
    defect_category = serializers.CharField()
    submitted_at = serializers.CharField()
