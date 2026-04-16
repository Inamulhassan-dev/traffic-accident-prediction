import os

_BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class Config:
    MODEL_PATH = os.path.join(_BASE_DIR, "models", "accident_model.pkl")
    DATA_PATH = os.path.join(_BASE_DIR, "data", "cleaned_accident_dataset.csv")