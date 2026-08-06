import os
import sys
import subprocess

def run_step(description, command, cwd=None):
    print(f"\n===========================================================")
    print(f"Executing Step: {description}")
    print(f"Command: {command}")
    print(f"===========================================================")
    result = subprocess.run(command, shell=True, cwd=cwd)
    if result.returncode != 0:
        print(f"[ERROR] Step '{description}' failed with exit code {result.returncode}")
        return False
    print(f"[SUCCESS] Step '{description}' completed cleanly.")
    return True

def main():
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    print(f"Initializing DrishtIQ Automotive Intelligence Platform Setup...")
    print(f"Root Directory: {root_dir}")

    # 1. Train AI/ML Models
    if not run_step("Train Enterprise AI/ML Models", "python ai_ml/train/train_all_models.py", cwd=root_dir):
        sys.exit(1)

    # 2. Verify AI/ML Inference Service
    if not run_step("Verify AI/ML Inference Service", "python ai_ml/inference_service.py", cwd=root_dir):
        sys.exit(1)

    # 3. Check Django Backend Setup
    backend_dir = os.path.join(root_dir, "backend")
    if os.path.exists(os.path.join(backend_dir, "manage.py")):
        run_step("Check Django Configuration", "python manage.py check", cwd=backend_dir)

    print("\n===========================================================")
    print("DrishtIQ Platform Environment Setup & Verification Complete!")
    print("===========================================================")

if __name__ == "__main__":
    main()
