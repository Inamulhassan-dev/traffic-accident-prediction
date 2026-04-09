def validate_input(data):
    required_fields = [
        "Time of Day",
        "Weather Conditions",
        "Road Type",
        "Road Condition",
        "Lighting Conditions",
        "Traffic Control Presence",
        "Speed Limit (km/h)",
        "Driver Age",
        "Alcohol Involvement"
    ]

    for field in required_fields:
        if field not in data:
            return False, f"Missing field: {field}"

    return True, None