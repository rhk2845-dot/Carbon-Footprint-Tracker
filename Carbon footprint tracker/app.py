from flask import Flask, render_template, request
from carbon_calculator import calculate_carbon
from database import get_history

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():

    total = None
    suggestion = None

    if request.method == "POST":

        car = float(request.form["car"])
        bus = float(request.form["bus"])
        electricity = float(request.form["electricity"])

        total = calculate_carbon(car, bus, electricity)

        if total > 20:
            suggestion = "Use public transport more often."
        elif total > 10:
            suggestion = "Reduce electricity consumption."
        else:
            suggestion = "Great! Your carbon footprint is relatively low."

    return render_template(
        "index.html",
        total=total,
        suggestion=suggestion
    )
@app.route("/dashboard")
def dashboard():

    history = get_history()

    return render_template(
        "dashboard.html",
        total=12.5,
        eco_score=85,
        trees=1,
        impact="🟢 Low",
        history=history
    )

if __name__ == "__main__":
    app.run(debug=True)

