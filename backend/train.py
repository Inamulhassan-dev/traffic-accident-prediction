import pandas as pd
import pickle
import os

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# ==============================
# 📁 BASE DIRECTORY
# ==============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ==============================
# 📂 LOAD DATASET
# ==============================
data_path = os.path.join(BASE_DIR, "data", "cleaned_accident_dataset.csv")

if not os.path.exists(data_path):
    raise FileNotFoundError(
        "\n\n❌  Dataset not found: " + data_path + "\n"
        "\n"
        "    Please obtain the dataset and place it at:\n"
        "        backend/data/cleaned_accident_dataset.csv\n"
        "\n"
        "    Dataset format: CSV with columns including 'Accident Severity'\n"
        "    (one-hot encoded accident records).\n"
        "    See docs/DATASET.md for acquisition instructions.\n"
    )

df = pd.read_csv(data_path)

print("✅ Dataset loaded")
print("Total columns:", len(df.columns))

# ==============================
# 🎯 FEATURES & TARGET
# ==============================
X = df.drop("Accident Severity", axis=1)
y = df["Accident Severity"]

print("Feature count:", len(X.columns))

# ==============================
# 🧪 TRAIN TEST SPLIT
# ==============================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ==============================
# 🌳 TRAIN MODEL
# ==============================
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

print("✅ Model trained")

# ==============================
# 📊 EVALUATION
# ==============================
y_pred = model.predict(X_test)
print("🎯 Accuracy:", accuracy_score(y_test, y_pred))

# ==============================
# 📂 SAVE MODEL
# ==============================
models_dir = os.path.join(BASE_DIR, "models")
os.makedirs(models_dir, exist_ok=True)

model_path = os.path.join(models_dir, "accident_model.pkl")

with open(model_path, "wb") as f:
    pickle.dump(model, f)

print("✅ Model saved at:", model_path)

# ==============================
# 🔍 SAVE FEATURE COLUMNS
# ==============================
columns_path = os.path.join(models_dir, "columns.pkl")

with open(columns_path, "wb") as f:
    pickle.dump(X.columns.tolist(), f)

print("✅ Columns saved")