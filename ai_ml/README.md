# Enterprise AI/ML Predictive Engine

This directory contains the production algorithm models, feature engineering pipelines, model training scripts, and inference service for the DrishtIQ Automotive Intelligence Platform.

## Architecture

```
ai_ml/
├── models/                     # Serialized joblib ML model artifacts
│   ├── battery_rul_regressor.joblib
│   ├── anomaly_isolation_forest.joblib
│   ├── dtc_root_cause_classifier.joblib
│   └── supplier_risk_evaluator.joblib
├── pipelines/                  # Enterprise Feature Engineering & Model Inference
│   ├── feature_engineering.py  # Telemetry signal cleaning & windowing
│   ├── battery_degradation_pipeline.py # Battery RUL & SoH predictor
│   ├── anomaly_detection_pipeline.py # Isolation forest telemetry anomaly detector
│   ├── root_cause_pipeline.py  # DTC classification & confidence estimator
│   └── supplier_quality_pipeline.py # Supplier risk & defect scoring
├── train/
│   └── train_all_models.py     # Automated ML training & artifact exporter
└── inference_service.py        # Unified AI/ML engine entry point for Django backend
```

## Models Included

1. **Battery RUL & Degradation Estimator**: Random Forest Regressor algorithm predicting State of Health (SoH %) and Remaining Useful Life (RUL in km).
2. **Telemetry Anomaly Detector**: Isolation Forest unsupervised algorithm detecting abnormal thermal spikes, voltage drop anomalies, and motor load outliers.
3. **DTC Root Cause Classifier**: Classifier mapping Diagnostic Trouble Codes to root cause failure modes and recommended engineering actions.
4. **Supplier Quality & Risk Evaluator**: Risk evaluation model assigning risk tiers (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`) based on PPM defect rates and claim history.

## How to Train Models

From workspace root:
```bash
python ai_ml/train/train_all_models.py
```
