import { useState } from "react";

export default function ExportReport({ result, formData, history }) {
  const [exporting, setExporting] = useState(false);

  const exportToCSV = () => {
    if (!history || history.length === 0) {
      alert("No prediction history to export");
      return;
    }

    setExporting(true);

    try {
      // Create CSV content
      const headers = ["Timestamp", "Severity", "Risk Score", "Conditions", "Confidence Minor", "Confidence Serious", "Confidence Fatal"];
      const rows = history.map(h => [
        h.timestamp,
        h.severity,
        h.risk_score.toFixed(1),
        h.conditions,
        h.confidence.Minor,
        h.confidence.Serious,
        h.confidence.Fatal
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.join(","))
      ].join("\n");

      // Download file
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `traffic-predictions-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data");
    } finally {
      setExporting(false);
    }
  };

  const exportCurrentPrediction = () => {
    if (!result || !formData) {
      alert("No prediction to export");
      return;
    }

    setExporting(true);

    try {
      const report = {
        timestamp: new Date().toISOString(),
        prediction: {
          severity: result.severity,
          risk_score: result.risk_score,
          risk_level: result.risk_level,
          confidence: result.confidence
        },
        input_conditions: formData,
        risk_factors: result.risk_factors,
        feature_importance: result.feature_importance
      };

      const jsonContent = JSON.stringify(report, null, 2);
      const blob = new Blob([jsonContent], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `prediction-report-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export prediction");
    } finally {
      setExporting(false);
    }
  };

  const generatePDFReport = () => {
    if (!result || !formData) {
      alert("No prediction to generate report");
      return;
    }

    // Open print dialog with formatted content
    const printWindow = window.open("", "_blank");
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Traffic Accident Prediction Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          h1 { color: #6366f1; border-bottom: 3px solid #6366f1; padding-bottom: 10px; }
          h2 { color: #333; margin-top: 30px; }
          .header { text-align: center; margin-bottom: 40px; }
          .severity { 
            display: inline-block;
            padding: 10px 20px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 18px;
          }
          .severity.minor { background: #22c55e20; color: #22c55e; border: 2px solid #22c55e; }
          .severity.serious { background: #eab30820; color: #eab308; border: 2px solid #eab308; }
          .severity.fatal { background: #ef444420; color: #ef4444; border: 2px solid #ef4444; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
          .info-item { padding: 10px; background: #f5f5f5; border-radius: 8px; }
          .info-label { font-weight: bold; color: #666; font-size: 12px; }
          .info-value { font-size: 16px; color: #333; margin-top: 5px; }
          .risk-factor { 
            padding: 15px; 
            margin: 10px 0; 
            background: #fff3cd; 
            border-left: 4px solid #ffc107;
            border-radius: 4px;
          }
          .footer { margin-top: 40px; text-align: center; color: #999; font-size: 12px; }
          @media print {
            body { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚦 Traffic Accident Prediction Report</h1>
          <p>Generated on ${new Date().toLocaleString()}</p>
        </div>

        <h2>Prediction Result</h2>
        <div style="text-align: center; margin: 20px 0;">
          <span class="severity ${result.severity.toLowerCase()}">${result.severity}</span>
          <p style="margin-top: 15px; font-size: 18px;">
            Risk Score: <strong>${result.risk_score.toFixed(1)}%</strong> | 
            Risk Level: <strong>${result.risk_level}</strong>
          </p>
        </div>

        <h2>Confidence Scores</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Minor</div>
            <div class="info-value">${result.confidence.Minor}%</div>
          </div>
          <div class="info-item">
            <div class="info-label">Serious</div>
            <div class="info-value">${result.confidence.Serious}%</div>
          </div>
          <div class="info-item">
            <div class="info-label">Fatal</div>
            <div class="info-value">${result.confidence.Fatal}%</div>
          </div>
        </div>

        <h2>Input Conditions</h2>
        <div class="info-grid">
          ${Object.entries(formData).map(([key, value]) => `
            <div class="info-item">
              <div class="info-label">${key}</div>
              <div class="info-value">${value}</div>
            </div>
          `).join('')}
        </div>

        <h2>Risk Factors Identified</h2>
        ${result.risk_factors && result.risk_factors.length > 0 ? 
          result.risk_factors.map(rf => `
            <div class="risk-factor">
              <strong>${rf.factor}</strong> (${rf.level})
              <p style="margin: 5px 0 0 0;">${rf.tip}</p>
            </div>
          `).join('') 
          : '<p>No significant risk factors identified.</p>'
        }

        ${result.feature_importance && result.feature_importance.length > 0 ? `
          <h2>Feature Importance</h2>
          <div class="info-grid">
            ${result.feature_importance.map(fi => `
              <div class="info-item">
                <div class="info-label">${fi.feature}</div>
                <div class="info-value">${fi.importance}%</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="footer">
          <p>TrafficAI - Accident Severity Prediction System</p>
          <p>This report is generated by machine learning algorithms and should be used for informational purposes only.</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="export-container">
      <div className="export-buttons">
        <button
          onClick={exportCurrentPrediction}
          disabled={!result || exporting}
          className="export-btn json"
          title="Export current prediction as JSON"
        >
          <span className="export-icon">📄</span>
          <span>Export JSON</span>
        </button>

        <button
          onClick={exportToCSV}
          disabled={!history || history.length === 0 || exporting}
          className="export-btn csv"
          title="Export all predictions as CSV"
        >
          <span className="export-icon">📊</span>
          <span>Export CSV</span>
        </button>

        <button
          onClick={generatePDFReport}
          disabled={!result || exporting}
          className="export-btn pdf"
          title="Generate PDF report"
        >
          <span className="export-icon">📑</span>
          <span>Print Report</span>
        </button>
      </div>
    </div>
  );
}
