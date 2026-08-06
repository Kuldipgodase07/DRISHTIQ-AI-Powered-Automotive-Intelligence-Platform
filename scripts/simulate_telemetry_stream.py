import time
import random
import json
import argparse
import sys
import os

# Add root directory to python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from ai_ml.inference_service import ml_service

SAMPLE_VINS = [
    "1G1FY6S08K4102938",
    "5YJSA1E28MF938201",
    "WAUZZZF83JA019482",
    "WBA33EV09NFP20194",
    "KNDJX3A50G7819283"
]

SAMPLE_DTCS = ["P0A80", "C1203", "P0217", "C0035", "P0300", "B1000"]

def generate_telemetry_frame(vin=None):
    if not vin:
        vin = random.choice(SAMPLE_VINS)
    
    speed = round(random.uniform(20.0, 130.0), 1)
    soc = round(random.uniform(15.0, 98.0), 1)
    
    # 10% chance of high thermal surge anomaly
    is_hot = random.random() < 0.10
    battery_temp = round(random.uniform(52.0, 68.0) if is_hot else random.uniform(22.0, 38.0), 1)
    voltage = round(random.uniform(310.0, 420.0), 1)
    current = round(random.uniform(10.0, 195.0), 1)

    # 15% chance of DTC fault code trigger
    dtc_list = [random.choice(SAMPLE_DTCS)] if random.random() < 0.15 else []

    payload = {
        "vin": vin,
        "speed_kmh": speed,
        "battery_soc": soc,
        "battery_temp_c": battery_temp,
        "voltage": voltage,
        "current_a": current,
        "dtc_codes": dtc_list
    }
    return payload

def run_simulation(count=10, interval_sec=1.0):
    print(f"===========================================================")
    print(f"Starting DrishtIQ Telemetry Stream Simulation ({count} frames)")
    print(f"===========================================================\n")

    for i in range(1, count + 1):
        frame = generate_telemetry_frame()
        print(f"[{i}/{count}] Transmitting CAN-Bus Frame for VIN {frame['vin']}...")
        print(f"  Telemetry: {frame['speed_kmh']} km/h | SOC: {frame['battery_soc']}% | Temp: {frame['battery_temp_c']}°C | {frame['voltage']}V / {frame['current_a']}A")

        # Run AI/ML Anomaly Detection on Frame
        anom_res = ml_service.detect_telemetry_anomaly(
            speed_kmh=frame['speed_kmh'],
            battery_soc=frame['battery_soc'],
            battery_temp_c=frame['battery_temp_c'],
            voltage=frame['voltage'],
            current_a=frame['current_a']
        )
        print(f"  AI Isolation Forest Anomaly Status: {anom_res['classification']} (Score: {anom_res['anomaly_score']})")

        if frame['dtc_codes']:
            dtc = frame['dtc_codes'][0]
            root_cause = ml_service.analyze_dtc_root_cause(dtc)
            print(f"  [DTC ALERT] Active Code: {dtc} -> Root Cause: {root_cause['root_cause']}")

        print("-" * 65)
        time.sleep(interval_sec)

    print("\nSimulation Stream Completed Successfully!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="DrishtIQ Automotive Telemetry Simulator")
    parser.add_argument("--count", type=int, default=5, help="Number of telemetry frames to simulate")
    parser.add_argument("--interval", type=float, default=0.5, help="Interval between frames in seconds")
    args = parser.parse_args()

    run_simulation(count=args.count, interval_sec=args.interval)
