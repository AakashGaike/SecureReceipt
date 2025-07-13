# backend/app.py

from flask import Flask
from flask_cors import CORS
from routes.receipt_routes import receipt_bp
import os
import sys

# ✅ Add backend/ to sys.path for safe imports when run as a module
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# ✅ Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

# ✅ Register receipt blueprint
app.register_blueprint(receipt_bp, url_prefix="/api")

# ✅ Root route for testing
@app.route("/")
def index():
    return "SecureReceipt backend is running"

# ✅ Entry point
if __name__ == "__main__":
    print("🔗 Starting SecureReceipt backend...")
    app.run(debug=True)
