from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS 
import numpy as np
from datetime import datetime, timedelta
from collections import defaultdict



app = Flask(__name__)
CORS(app) 

model = joblib.load("risk_profile_model_rf.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        input_data = pd.DataFrame([data])  

        # Make prediction
        prediction = model.predict(input_data)[0]  # Get prediction

        # Map prediction to risk profile
        risk_profiles = {0: "Low", 1: "Medium", 2: "High"}
        predicted_risk = risk_profiles[prediction]

        # Return prediction
        return jsonify({"risk_profile": predicted_risk})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/analyze-behavior', methods=['POST'])
def analyze_behavior():
    data = request.json
    alerts = []

    for category, values in data['spendingData'].items():
        if len(values) < 3:
            continue
        past_avg = sum(values[:-1]) / (len(values) - 1)
        current = values[-1]
        if current > 2 * past_avg:
            alerts.append({
                "category": category,
                "message": f"You've spent {round(current / past_avg, 1)}x more than usual on {category} this week.",
                "date":datetime.utcnow().strftime("%Y-%m-%d")
            })

    return jsonify({"alerts": alerts})

@app.route("/generate-suggestions", methods=["POST"])
def generate_suggestions():
    data = request.get_json()
    expenses = data["expenses"]

    now = datetime.utcnow()
    one_week_ago = now - timedelta(days=7)

    category_totals = defaultdict(float)
    past_totals = defaultdict(list)

    for exp in expenses:
        cat = exp["category"]
        amt = exp["amount"]
        date = datetime.fromisoformat(exp["date"].replace("Z", ""))

        if date >= one_week_ago:
            category_totals[cat] += amt
        else:
            past_totals[cat].append(amt)

    suggestions = []
    for cat, total in category_totals.items():
        past_avg = np.mean(past_totals[cat]) if past_totals[cat] else 0
        if past_avg and total > 1.5 * past_avg:
            suggestions.append({
                "category": cat,
                "message": f"You've spent {round(total / past_avg, 1)}x more than usual on {cat} this week.",
                "date": now.date().isoformat()
            })

    return jsonify({"alerts": suggestions})



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)