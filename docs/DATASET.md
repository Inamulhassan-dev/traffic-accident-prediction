# Dataset Acquisition

The model is trained on a cleaned road-accident CSV file that is included in the
repository (`backend/data/cleaned_accident_dataset.csv`).

## File specification

| Property | Value |
|----------|-------|
| Filename | `cleaned_accident_dataset.csv` |
| Location | `backend/data/` |
| Format | CSV (comma-separated, UTF-8) |
| Target column | `Accident Severity` (integer: 0 = Minor, 1 = Serious, 2 = Fatal) |
| Other columns | One-hot encoded accident-record features |

## If the file is missing

1. **Re-clone the repository** – the file is committed to the repo:

   ```bash
   git clone https://github.com/Inamulhassan-dev/traffic-accident-prediction.git
   ```

2. **Bring your own dataset** – prepare a CSV with the same `Accident Severity`
   target column and one-hot encoded feature columns, then place it at
   `backend/data/cleaned_accident_dataset.csv` and retrain:

   ```bash
   cd backend
   python train.py
   ```

## Re-training the model

After replacing or updating the dataset, retrain the model so the saved
`.pkl` files match the current data:

```bash
cd backend
python train.py
```

The script saves two files that are required at runtime:

- `backend/models/accident_model.pkl` – trained Random Forest classifier
- `backend/models/columns.pkl` – ordered list of feature column names
