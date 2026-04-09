from flask import Blueprint, request, jsonify
from .model import AccidentModel

api = Blueprint("api", __name__)
model = AccidentModel()

@api.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid input"}), 400

    result = model.predict(data)
    return jsonify(result)

@api.route("/")
def home():
    return {"message": "Traffic Accident Prediction API Running"}