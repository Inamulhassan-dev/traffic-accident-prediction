import { useState, useEffect } from "react";
import { getRecommendations } from "../services/api";

export default function SafetyRecommendations({ formData }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await getRecommendations(formData);
        setRecommendations(response.data.recommendations || []);
      } catch (error) {
        // Fallback to local recommendations if API fails
        setRecommendations(generateLocalRecommendations(formData));
      } finally {
        setLoading(false);
      }
    };

    if (formData) {
      fetchRecommendations();
    }
  }, [formData]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "var(--text-muted)" }}>
        <span className="spinner" style={{ borderTopColor: "var(--accent-primary)" }} />
        <span style={{ marginLeft: "8px" }}>Loading safety tips...</span>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="stagger-children">
      {recommendations.map((rec, idx) => (
        <div
          className="recommendation-card animate-slide-right"
          key={idx}
          style={{ animationDelay: `${idx * 80}ms` }}
        >
          <div className="rec-icon">{rec.icon}</div>
          <div>
            <div className="rec-title">{rec.title}</div>
            <div className="rec-desc">{rec.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Fallback local recommendations
function generateLocalRecommendations(data) {
  const recs = [];

  const weather = String(data["Weather Conditions"] || "").toLowerCase();
  if (weather === "rainy") {
    recs.push({ icon: "🌧️", title: "Reduce Speed", desc: "Decrease speed by 30% in rain to maintain traction" });
    recs.push({ icon: "📏", title: "Increase Distance", desc: "Keep 4+ seconds of following distance on wet roads" });
  } else if (weather === "fog") {
    recs.push({ icon: "🌫️", title: "Use Low Beams", desc: "High beams reflect off fog — drive slowly" });
  }

  const alcohol = String(data["Alcohol Involvement"] || "").toLowerCase();
  if (alcohol === "yes") {
    recs.push({ icon: "🚕", title: "Don't Drive!", desc: "Take a taxi or designate a sober driver" });
  }

  recs.push({ icon: "🎯", title: "Stay Alert", desc: "Put your phone away and focus on the road" });

  return recs;
}
