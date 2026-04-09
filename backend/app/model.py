import pickle
import pandas as pd
import os

class AccidentModel:
    def __init__(self):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

        self.model = pickle.load(open(os.path.join(base_dir, "models", "accident_model.pkl"), "rb"))
        self.columns = pickle.load(open(os.path.join(base_dir, "models", "columns.pkl"), "rb"))

    def predict(self, input_data):
        df = pd.DataFrame([input_data])

        # 🔥 MATCH TRAINING COLUMNS
        df = df.reindex(columns=self.columns, fill_value=0)

        prediction = self.model.predict(df)[0]

        severity_map = {
            0: "Minor",
            1: "Serious",
            2: "Fatal"
        }

        return {
            "prediction": int(prediction),
            "severity": severity_map[int(prediction)]
        }