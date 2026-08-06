import os
import json
import joblib
import numpy as np
from sklearn.ensemble import RandomForestRegressor, IsolationForest
from sklearn.tree import DecisionTreeClassifier

MODELS_DIR = os.path.join(os.path.dirname(__file__), "..", "models")

def train_and_export_models():
    os.makedirs(MODELS_DIR, exist_ok=True)
    print("Initializing Enterprise ML Training Pipeline...")

    # 1. Train Battery RUL Regressor (RandomForestRegressor)
    print("Training Battery RUL Regressor...")
    np.random.seed(42)
    n_samples = 500
    X_battery = np.random.uniform(low=[0, 10, 20, 300, 5, 1.5, 0, 0.05],
                                  high=[120, 100, 65, 450, 150, 67.5, 40, 1.5],
                                  size=(n_samples, 8))
    y_battery = 100.0 - (X_battery[:, 2] * 0.3) - (X_battery[:, 4] * 0.05) + np.random.normal(0, 1.0, n_samples)
    y_battery = np.clip(y_battery, 60.0, 100.0)

    rul_model = RandomForestRegressor(n_estimators=50, max_depth=10, random_state=42)
    rul_model.fit(X_battery, y_battery)
    
    rul_joblib_path = os.path.join(MODELS_DIR, "battery_rul_regressor.joblib")
    rul_json_path = os.path.join(MODELS_DIR, "battery_rul_regressor.json")
    joblib.dump(rul_model, rul_joblib_path)
    
    with open(rul_json_path, "w") as f:
        json.dump({
            "model_name": "Battery Remaining Useful Life (RUL) Regressor",
            "algorithm": "RandomForestRegressor",
            "n_estimators": 50,
            "max_depth": 10,
            "input_features": ["speed_kmh", "battery_soc", "battery_temp_c", "voltage", "current_a", "power_kw", "thermal_gradient", "c_rate"],
            "target_output": "State_of_Health_Percent"
        }, f, indent=2)
    print(f"[OK] Battery RUL model binary & JSON saved -> {rul_joblib_path}")

    # 2. Train Telemetry Anomaly Detector (IsolationForest)
    print("Training Telemetry Isolation Forest Anomaly Detector...")
    X_normal = np.random.normal(loc=[60, 75, 30, 400, 20, 8.0, 5, 0.2],
                                 scale=[15, 15, 4, 10, 5, 2.0, 2, 0.05],
                                 size=(450, 8))
    X_anom = np.random.uniform(low=[110, 5, 60, 280, 180, 50.0, 35, 1.8],
                               high=[150, 100, 80, 320, 250, 80.0, 55, 2.5],
                               size=(50, 8))
    X_anomaly_train = np.vstack([X_normal, X_anom])

    iso_forest = IsolationForest(n_estimators=100, contamination=0.1, random_state=42)
    iso_forest.fit(X_anomaly_train)

    iso_joblib_path = os.path.join(MODELS_DIR, "anomaly_isolation_forest.joblib")
    iso_json_path = os.path.join(MODELS_DIR, "anomaly_isolation_forest.json")
    joblib.dump(iso_forest, iso_joblib_path)

    with open(iso_json_path, "w") as f:
        json.dump({
            "model_name": "Telemetry Anomaly Isolation Forest Detector",
            "algorithm": "IsolationForest",
            "n_estimators": 100,
            "contamination": 0.1,
            "input_features": ["speed_kmh", "battery_soc", "battery_temp_c", "voltage", "current_a", "power_kw", "thermal_gradient", "c_rate"]
        }, f, indent=2)
    print(f"[OK] Telemetry Isolation Forest model binary & JSON saved -> {iso_joblib_path}")

    # 3. Train Supplier Risk Evaluator
    print("Training Supplier Risk Evaluator...")
    X_supplier = np.random.uniform(low=[0, 0, 5], high=[150, 50, 12], size=(200, 3))
    risk_scores = X_supplier[:, 0] * 0.5 + X_supplier[:, 1] * 0.8
    y_supplier = np.where(risk_scores > 60, 3, np.where(risk_scores > 35, 2, np.where(risk_scores > 15, 1, 0)))

    supplier_model = DecisionTreeClassifier(max_depth=5, random_state=42)
    supplier_model.fit(X_supplier, y_supplier)

    sup_joblib_path = os.path.join(MODELS_DIR, "supplier_risk_evaluator.joblib")
    sup_json_path = os.path.join(MODELS_DIR, "supplier_risk_evaluator.json")
    joblib.dump(supplier_model, sup_joblib_path)

    with open(sup_json_path, "w") as f:
        json.dump({
            "model_name": "Supplier Risk Evaluator Classifier",
            "algorithm": "DecisionTreeClassifier",
            "max_depth": 5,
            "input_features": ["ppm_defect_rate", "claim_cost_per_k_shipments", "log_shipment_volume"],
            "classes": ["LOW", "MEDIUM", "HIGH", "CRITICAL"]
        }, f, indent=2)
    print(f"[OK] Supplier Risk model binary & JSON saved -> {sup_joblib_path}")

    # 4. Train DTC Root Cause Classifier (DecisionTreeClassifier)
    print("Training DTC Root Cause Classifier...")
    X_dtc = np.random.uniform(low=[0, 1, 1, 0.0], high=[4, 5, 60, 5.0], size=(300, 4))
    y_dtc = np.clip(X_dtc[:, 0].astype(int), 0, 4)

    dtc_model = DecisionTreeClassifier(max_depth=6, random_state=42)
    dtc_model.fit(X_dtc, y_dtc)

    dtc_joblib_path = os.path.join(MODELS_DIR, "dtc_root_cause_classifier.joblib")
    dtc_json_path = os.path.join(MODELS_DIR, "dtc_root_cause_classifier.json")
    joblib.dump(dtc_model, dtc_joblib_path)

    with open(dtc_json_path, "w") as f:
        json.dump({
            "model_name": "Diagnostic Trouble Code (DTC) Root Cause Classifier",
            "algorithm": "DecisionTreeClassifier",
            "max_depth": 6,
            "input_features": ["dtc_category_id", "severity_level", "component_age_months", "signal_variance"],
            "classes": ["HV_BATTERY_FAULT", "ABS_BRAKING_FAULT", "COOLING_THERMAL_FAULT", "CHASSIS_TRACTION_FAULT", "GENERAL_POWERTRAIN_FAULT"]
        }, f, indent=2)
    print(f"[OK] DTC Root Cause Classifier binary & JSON saved -> {dtc_joblib_path}")

    print("\n=============================================================")
    print("All Enterprise AI/ML Models Trained & Serialized!")
    print("Artifacts generated in:", os.path.abspath(MODELS_DIR))
    print("=============================================================")

if __name__ == "__main__":
    train_and_export_models()
