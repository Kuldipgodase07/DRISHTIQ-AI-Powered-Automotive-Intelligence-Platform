import numpy as np

class FeatureEngineeringPipeline:
    """
    Enterprise Feature Engineering Pipeline for Vehicle Telemetry Signals.
    Normalizes battery voltage, motor RPM, ambient/battery temperatures, and computes thermal gradients.
    """

    @staticmethod
    def extract_telemetry_features(speed_kmh, battery_soc, battery_temp_c, voltage=400.0, current_a=15.0):
        """
        Extracts engineered feature vector:
        [speed, soc, temp, voltage, current, power_kw, thermal_gradient, C_rate]
        """
        power_kw = (voltage * current_a) / 1000.0
        thermal_gradient = max(0.0, battery_temp_c - 25.0)  # Delta from nominal 25C
        c_rate = abs(current_a) / 100.0  # Approx normalized C-rate

        features = np.array([
            float(speed_kmh),
            float(battery_soc),
            float(battery_temp_c),
            float(voltage),
            float(current_a),
            float(power_kw),
            float(thermal_gradient),
            float(c_rate)
        ]).reshape(1, -1)

        return features

    @staticmethod
    def extract_supplier_features(ppm_defect_rate, claim_cost_usd, shipment_volume):
        """
        Extracts supplier quality feature vector:
        [ppm, claim_cost_per_k_shipments, log_shipment_volume]
        """
        claim_ratio = (float(claim_cost_usd) / max(1, shipment_volume)) * 1000.0
        log_vol = np.log1p(float(shipment_volume))

        features = np.array([
            float(ppm_defect_rate),
            float(claim_ratio),
            float(log_vol)
        ]).reshape(1, -1)

        return features
