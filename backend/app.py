from flask import Flask
from flask_cors import CORS
from routes.receipt_routes import receipt_bp
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

app.register_blueprint(receipt_bp, url_prefix="/api")

@app.route("/")
def index():
    return "SecureReceipt backend is running"

if __name__ == "__main__":
    print("🔗 Starting SecureReceipt backend...")
    debug_mode = os.getenv("FLASK_DEBUG", "False") == "True"
    app.run(debug=debug_mode)
