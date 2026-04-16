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

@api.route("/api/recommendations", methods=["POST"])
def recommendations():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid input"}), 400

    tips = model.get_recommendations(data)
    return jsonify({"recommendations": tips})

@api.route("/api/stats")
def stats():
    """Return model statistics and info."""
    return jsonify({
        "model_type": "Random Forest Classifier",
        "n_features": len(model.columns),
        "severity_levels": ["Minor", "Serious", "Fatal"],
        "feature_names": model.columns[:9] if len(model.columns) > 9 else model.columns,
        "status": "active"
    })

@api.route("/")
def home():
    return {"message": "Traffic Accident Prediction API Running"}

@api.route("/api/health")
def health():
    """Health check endpoint."""
    return jsonify({"status": "healthy", "message": "API is running"})

@api.route("/api/analytics")
def analytics():
    """Return prediction analytics and insights."""
    analytics_data = model.get_analytics()
    return jsonify(analytics_data)

@api.route("/api/weather-impact")
def weather_impact():
    """Return weather impact analysis."""
    impact_data = model.get_weather_impact_analysis()
    return jsonify(impact_data)

@api.route("/api/driver-profile", methods=["POST"])
def driver_profile():
    """Generate driver risk profile."""
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "Invalid input"}), 400
    
    age = data.get("age", 30)
    alcohol = data.get("alcohol", "No")
    
    profile = model.get_driver_risk_profile(age, alcohol)
    return jsonify(profile)

@api.route("/api/batch-predict", methods=["POST"])
def batch_predict():
    """Handle multiple predictions at once."""
    data = request.get_json()
    
    if not data or "predictions" not in data:
        return jsonify({"error": "Invalid input format"}), 400
    
    results = []
    for item in data["predictions"]:
        result = model.predict(item)
        results.append(result)
    
    return jsonify({"results": results, "count": len(results)})