import pickle
import pandas as pd
import numpy as np
import os
from datetime import datetime
from collections import Counter

class AccidentModel:
    def __init__(self):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

        model_path = os.path.join(base_dir, "models", "accident_model.pkl")
        columns_path = os.path.join(base_dir, "models", "columns.pkl")

        if not os.path.exists(model_path) or not os.path.exists(columns_path):
            raise FileNotFoundError(
                "\n\n❌  Trained model files not found.\n"
                "    Run the training script first:\n\n"
                "        cd backend\n"
                "        python train.py\n\n"
                "    This will create:\n"
                "        backend/models/accident_model.pkl\n"
                "        backend/models/columns.pkl\n"
            )

        self.model = pickle.load(open(model_path, "rb"))
        self.columns = pickle.load(open(columns_path, "rb"))
        
        # Store prediction history for analytics
        self.prediction_history = []

    def predict(self, input_data):
        df = pd.DataFrame([input_data])

        # 🔥 MATCH TRAINING COLUMNS
        df = df.reindex(columns=self.columns, fill_value=0)

        prediction = self.model.predict(df)[0]

        # Get probability scores for confidence
        probabilities = self.model.predict_proba(df)[0]
        confidence_scores = {
            "Minor": round(float(probabilities[0]) * 100, 1) if len(probabilities) > 0 else 0,
            "Serious": round(float(probabilities[1]) * 100, 1) if len(probabilities) > 1 else 0,
            "Fatal": round(float(probabilities[2]) * 100, 1) if len(probabilities) > 2 else 0,
        }

        severity_map = {
            0: "Minor",
            1: "Serious",
            2: "Fatal"
        }

        severity = severity_map.get(int(prediction), "Unknown")

        # Analyze risk factors from input
        risk_factors = self._analyze_risk_factors(input_data)
        
        # Get feature importance for this prediction
        feature_importance = self._get_feature_importance(input_data)
        
        # Calculate risk level
        risk_score = confidence_scores.get("Fatal", 0) + confidence_scores.get("Serious", 0) * 0.5
        risk_level = "Low" if risk_score < 30 else "Medium" if risk_score < 60 else "High"
        
        result = {
            "prediction": int(prediction),
            "severity": severity,
            "confidence": confidence_scores,
            "risk_score": risk_score,
            "risk_level": risk_level,
            "risk_factors": risk_factors,
            "feature_importance": feature_importance,
            "timestamp": datetime.now().isoformat()
        }
        
        # Store in history for analytics
        self.prediction_history.append({
            **result,
            "input_data": input_data
        })
        
        return result

    def _analyze_risk_factors(self, input_data):
        """Analyze which input factors contribute most to risk."""
        factors = []

        # Check weather
        weather = str(input_data.get("Weather Conditions", "")).lower()
        if weather in ["rainy", "fog", "foggy", "snow", "snowy"]:
            factors.append({"factor": "Adverse Weather", "level": "high", "tip": f"{weather.title()} conditions significantly increase accident risk"})

        # Check lighting
        lighting = str(input_data.get("Lighting Conditions", "")).lower()
        if lighting in ["dark", "darkness"]:
            factors.append({"factor": "Poor Visibility", "level": "high", "tip": "Driving in dark increases collision risk by 3x"})

        # Check road condition
        road_cond = str(input_data.get("Road Condition", "")).lower()
        if road_cond in ["wet", "icy", "snow"]:
            factors.append({"factor": "Slippery Road", "level": "high", "tip": f"{road_cond.title()} roads increase stopping distance by 2-10x"})

        # Check speed
        try:
            speed = int(input_data.get("Speed Limit (km/h)", 0))
            if speed > 100:
                factors.append({"factor": "High Speed Zone", "level": "high", "tip": "Speeds above 100 km/h dramatically increase fatality risk"})
            elif speed > 80:
                factors.append({"factor": "Elevated Speed", "level": "medium", "tip": "Higher speeds reduce reaction time"})
        except (ValueError, TypeError):
            pass

        # Check alcohol
        alcohol = str(input_data.get("Alcohol Involvement", "")).lower()
        if alcohol == "yes":
            factors.append({"factor": "Alcohol Detected", "level": "critical", "tip": "Alcohol impairment is the #1 cause of fatal accidents"})

        # Check driver age
        try:
            age = int(input_data.get("Driver Age", 30))
            if age < 20:
                factors.append({"factor": "Young Driver", "level": "medium", "tip": "Drivers under 20 have the highest crash rate per mile driven"})
            elif age > 65:
                factors.append({"factor": "Senior Driver", "level": "medium", "tip": "Older drivers may have slower reaction times"})
        except (ValueError, TypeError):
            pass

        # Check traffic control
        traffic = str(input_data.get("Traffic Control Presence", "")).lower()
        if traffic == "no":
            factors.append({"factor": "No Traffic Control", "level": "medium", "tip": "Uncontrolled intersections increase collision risk"})

        # Check time
        time_of_day = str(input_data.get("Time of Day", "")).lower()
        if time_of_day in ["night", "evening"]:
            factors.append({"factor": "Night Driving", "level": "medium", "tip": "Most fatal accidents occur between 6 PM and 6 AM"})

        return factors

    def get_recommendations(self, input_data):
        """Generate safety recommendations based on input conditions."""
        recommendations = []

        weather = str(input_data.get("Weather Conditions", "")).lower()
        if weather == "rainy":
            recommendations.extend([
                {"icon": "🌧️", "title": "Reduce Speed", "desc": "Decrease speed by 30% in rainy conditions to maintain tire traction"},
                {"icon": "💡", "title": "Use Headlights", "desc": "Turn on headlights to improve your visibility to other drivers"},
                {"icon": "📏", "title": "Increase Following Distance", "desc": "Keep at least 4 seconds of following distance on wet roads"}
            ])
        elif weather == "fog":
            recommendations.extend([
                {"icon": "🌫️", "title": "Use Low Beams", "desc": "Use low-beam headlights; high beams will reflect off fog"},
                {"icon": "🐌", "title": "Drive Slowly", "desc": "Reduce speed significantly and use road markings as a guide"},
                {"icon": "🚫", "title": "Avoid Overtaking", "desc": "Do not overtake or pass other vehicles in foggy conditions"}
            ])
        else:
            recommendations.append(
                {"icon": "☀️", "title": "Good Conditions", "desc": "Clear weather — maintain standard safe driving practices"}
            )

        lighting = str(input_data.get("Lighting Conditions", "")).lower()
        if lighting == "dark":
            recommendations.extend([
                {"icon": "🔦", "title": "Check Headlights", "desc": "Ensure all vehicle lights are functioning properly before driving"},
                {"icon": "👁️", "title": "Watch for Pedestrians", "desc": "Be extra alert for pedestrians and cyclists at night"}
            ])

        try:
            speed = int(input_data.get("Speed Limit (km/h)", 0))
            if speed > 80:
                recommendations.append(
                    {"icon": "⚡", "title": "Maintain Safe Speed", "desc": f"The {speed} km/h zone requires full attention — avoid distractions"}
                )
        except (ValueError, TypeError):
            pass

        alcohol = str(input_data.get("Alcohol Involvement", "")).lower()
        if alcohol == "yes":
            recommendations.extend([
                {"icon": "🚕", "title": "Don't Drive!", "desc": "Take a taxi or rideshare — impaired driving is never worth the risk"},
                {"icon": "📱", "title": "Call for Help", "desc": "Designate a sober driver or call a friend to pick you up"}
            ])

        road_cond = str(input_data.get("Road Condition", "")).lower()
        if road_cond == "wet":
            recommendations.append(
                {"icon": "🛞", "title": "Check Tires", "desc": "Ensure tires have adequate tread depth for wet road grip"}
            )

        # Always add general tips
        recommendations.append(
            {"icon": "🎯", "title": "Stay Alert", "desc": "Avoid all distractions — put your phone away and focus on the road"}
        )

        return recommendations

    def _get_feature_importance(self, input_data):
        """Calculate feature importance for this specific prediction."""
        try:
            # Get feature importances from the model
            if hasattr(self.model, 'feature_importances_'):
                importances = self.model.feature_importances_
                
                # Map to actual input features
                feature_map = {
                    "Weather Conditions": 0,
                    "Road Condition": 0,
                    "Lighting Conditions": 0,
                    "Speed Limit (km/h)": 0,
                    "Driver Age": 0,
                    "Alcohol Involvement": 0
                }
                
                # Calculate weighted importance based on input
                for i, col in enumerate(self.columns[:len(importances)]):
                    for key in feature_map.keys():
                        if key.lower() in col.lower():
                            feature_map[key] += importances[i]
                
                # Normalize and sort
                total = sum(feature_map.values())
                if total > 0:
                    feature_map = {k: round((v/total)*100, 1) for k, v in feature_map.items()}
                
                # Return top 5 features
                sorted_features = sorted(feature_map.items(), key=lambda x: x[1], reverse=True)[:5]
                return [{"feature": k, "importance": v} for k, v in sorted_features if v > 0]
        except Exception as e:
            print(f"Feature importance error: {e}")
        
        return []
    
    def get_analytics(self):
        """Get analytics from prediction history."""
        if not self.prediction_history:
            return {
                "total_predictions": 0,
                "severity_distribution": {},
                "avg_risk_score": 0,
                "high_risk_conditions": [],
                "time_patterns": {}
            }
        
        # Severity distribution
        severities = [p["severity"] for p in self.prediction_history]
        severity_dist = dict(Counter(severities))
        
        # Average risk score
        avg_risk = sum(p["risk_score"] for p in self.prediction_history) / len(self.prediction_history)
        
        # High risk conditions (Fatal predictions)
        high_risk = [p for p in self.prediction_history if p["severity"] == "Fatal"]
        high_risk_conditions = []
        
        if high_risk:
            # Analyze common factors in high-risk predictions
            weather_counts = Counter([p["input_data"].get("Weather Conditions") for p in high_risk])
            road_counts = Counter([p["input_data"].get("Road Condition") for p in high_risk])
            
            high_risk_conditions = [
                {"condition": "Weather", "value": weather_counts.most_common(1)[0][0], "count": weather_counts.most_common(1)[0][1]},
                {"condition": "Road", "value": road_counts.most_common(1)[0][0], "count": road_counts.most_common(1)[0][1]}
            ]
        
        # Time patterns
        time_counts = Counter([p["input_data"].get("Time of Day") for p in self.prediction_history])
        
        return {
            "total_predictions": len(self.prediction_history),
            "severity_distribution": severity_dist,
            "avg_risk_score": round(avg_risk, 1),
            "high_risk_conditions": high_risk_conditions,
            "time_patterns": dict(time_counts),
            "recent_predictions": self.prediction_history[-10:][::-1]  # Last 10, reversed
        }
    
    def get_weather_impact_analysis(self):
        """Analyze how weather conditions impact accident severity."""
        weather_impact = {
            "Clear": {"minor": 0, "serious": 0, "fatal": 0, "total": 0},
            "Rainy": {"minor": 0, "serious": 0, "fatal": 0, "total": 0},
            "Fog": {"minor": 0, "serious": 0, "fatal": 0, "total": 0}
        }
        
        for pred in self.prediction_history:
            weather = pred["input_data"].get("Weather Conditions", "Clear")
            severity = pred["severity"].lower()
            
            if weather in weather_impact:
                weather_impact[weather][severity] = weather_impact[weather].get(severity, 0) + 1
                weather_impact[weather]["total"] += 1
        
        # Calculate percentages
        for weather in weather_impact:
            total = weather_impact[weather]["total"]
            if total > 0:
                for severity in ["minor", "serious", "fatal"]:
                    count = weather_impact[weather][severity]
                    weather_impact[weather][f"{severity}_pct"] = round((count / total) * 100, 1)
        
        return weather_impact
    
    def get_driver_risk_profile(self, age, alcohol):
        """Generate a risk profile for a driver based on age and alcohol involvement."""
        risk_factors = []
        risk_score = 0
        
        # Age-based risk
        if age < 20:
            risk_factors.append({
                "factor": "Young Driver (Under 20)",
                "risk": "High",
                "description": "Inexperienced drivers have 3x higher crash rates"
            })
            risk_score += 30
        elif age < 25:
            risk_factors.append({
                "factor": "Young Driver (20-24)",
                "risk": "Medium",
                "description": "Still developing driving experience and judgment"
            })
            risk_score += 15
        elif age > 70:
            risk_factors.append({
                "factor": "Senior Driver (70+)",
                "risk": "Medium",
                "description": "May have slower reaction times and vision issues"
            })
            risk_score += 20
        elif age > 65:
            risk_factors.append({
                "factor": "Older Driver (65-70)",
                "risk": "Low",
                "description": "Generally safe but monitor health conditions"
            })
            risk_score += 10
        else:
            risk_factors.append({
                "factor": "Experienced Driver",
                "risk": "Low",
                "description": "Age group with lowest crash rates"
            })
            risk_score += 5
        
        # Alcohol involvement
        if str(alcohol).lower() == "yes":
            risk_factors.append({
                "factor": "Alcohol Impairment",
                "risk": "Critical",
                "description": "Alcohol is involved in 30% of fatal crashes"
            })
            risk_score += 50
        
        # Overall assessment
        if risk_score < 20:
            overall = "Low Risk"
            recommendation = "Continue safe driving practices"
        elif risk_score < 40:
            overall = "Moderate Risk"
            recommendation = "Extra caution advised, consider defensive driving course"
        else:
            overall = "High Risk"
            recommendation = "Immediate intervention needed - do not drive if impaired"
        
        return {
            "risk_score": risk_score,
            "risk_level": overall,
            "risk_factors": risk_factors,
            "recommendation": recommendation
        }
