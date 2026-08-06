import subprocess
import sys
import os
import time

def run_all():
    root_dir = os.path.abspath(os.path.dirname(__file__))
    print("===========================================================")
    print("  Starting DrishtIQ Automotive Intelligence Platform")
    print("===========================================================")

    # Step 1: Train/Verify AI/ML Models
    print("\n[1/3] Training and verifying AI/ML Models...")
    try:
        subprocess.run([sys.executable, "ai_ml/train/train_all_models.py"], cwd=root_dir, check=True)
    except Exception as e:
        print(f"[Warning] Model training check encountered issue: {e}")

    # Step 2: Launch Django Backend & React Frontend Services
    print("\n[2/3] Launching Django REST Backend (http://localhost:8000)...")
    backend_proc = subprocess.Popen([sys.executable, "backend/manage.py", "runserver", "0.0.0.0:8000"], cwd=root_dir)

    print("[3/3] Launching React Frontend Dashboard...")
    frontend_proc = subprocess.Popen("npm --prefix frontend run dev", shell=True, cwd=root_dir)

    print("\n===========================================================")
    print("  DrishtIQ Platform is RUNNING!")
    print("  - Backend API:  http://localhost:8000/")
    print("  - Frontend UI:   http://localhost:8080/ (or http://localhost:5173/)")
    print("  Press Ctrl+C at any time to stop all services.")
    print("===========================================================\n")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down DrishtIQ Platform services...")
        backend_proc.terminate()
        frontend_proc.terminate()
        sys.exit(0)

if __name__ == "__main__":
    run_all()
