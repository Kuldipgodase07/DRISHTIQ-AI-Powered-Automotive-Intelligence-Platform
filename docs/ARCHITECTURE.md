# DrishtIQ Automotive Intelligence Platform - System Architecture

## Overview

DrishtIQ is an enterprise-grade automotive predictive intelligence platform designed to process high-frequency CAN-bus vehicle telemetry, perform real-time AI/ML anomaly detection, estimate EV battery State of Health (SoH) & Remaining Useful Life (RUL), assess supplier component quality risks, and power interactive AI diagnostic copilot sessions.

```
+-----------------------------------------------------------------------------------+
|                            Vehicle Telemetry Stream                               |
|                  (CAN-Bus J1939 / OBD-II Telematics Gateway)                     |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                        Feature Engineering Pipeline                               |
|             (Signal Cleaning, Thermal Gradient & C-Rate Calculation)               |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                          AI/ML Predictive Engines                                 |
|  +---------------------+  +----------------------+  +-------------------------+  |
|  | Battery RUL Regressor|  | Isolation Forest     |  | DTC Root Cause Classifier|  |
|  | (RandomForest)      |  | Anomaly Detector     |  | (DecisionTree)          |  |
|  +---------------------+  +----------------------+  +-------------------------+  |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                        Django REST Framework Backend                              |
|           (Authentication, Fleet Management, Diagnostics, Copilot API)             |
+-----------------------------------------------------------------------------------+
                   |                                           |
                   v                                           v
+------------------------------------+       +--------------------------------------+
|       MongoDB Atlas / Local        |       |        PostgreSQL Database           |
| (Telemetry, Copilot, Diagnostics)  |       | (Users, Vehicles, Suppliers, Claims) |
+------------------------------------+       +--------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                     React / Vite Enterprise Frontend                              |
|           (Fleet Analytics, Telemetry Graphs, AI Copilot Chat Interface)          |
+-----------------------------------------------------------------------------------+
```

## Core Modules & Subsystems

1. **AI/ML Engine (`ai_ml/`)**:
   - `models/`: Serialized scikit-learn model binaries (`.joblib`) and model metadata configs (`.json`).
   - `pipelines/`: Feature extraction, battery degradation estimation, telemetry anomaly scoring, DTC root cause analysis, and supplier risk scoring.
   - `train/`: Training pipeline scripts generating production models.
   - `inference_service.py`: High-throughput unified inference service singleton used by backend views.

2. **Backend API (`backend/`)**:
   - Built on Django REST Framework with support for dual storage engines (MongoDB Atlas via PyMongo/MongoEngine & PostgreSQL via Django ORM).
   - Apps: `authentication`, `vehicles`, `diagnostics`, `alerts`, `suppliers`, `warranty`, `copilot`.

3. **Frontend Application (`frontend/`)**:
   - Enterprise React application built with TypeScript, Vite, Tailwind CSS, Lucide icons, and Recharts visualization.
