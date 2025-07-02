from flask import Flask, request, jsonify, render_template
from utils.hasher import hash_receipt
from blockchain import SimpleBlockchain
import os
import qrcode
import json
from datetime import datetime

from Crypto.Signature import pkcs1_15
from Crypto.PublicKey import RSA
from Crypto.Hash import SHA256

app = Flask(__name__)

# Blockchain instance
blockchain = SimpleBlockchain()

# Folder to save QR codes
QR_FOLDER = "static/qr"
os.makedirs(QR_FOLDER, exist_ok=True)

# Load RSA keys
with open("keys/private.pem", "r") as f:
    PRIVATE_KEY = RSA.import_key(f.read())
with open("keys/public.pem", "r") as f:
    PUBLIC_KEY = RSA.import_key(f.read())

# --------------------------------------
# Helper: Sign receipt
# --------------------------------------
def sign_receipt(data: dict) -> str:
    msg = f"{data['receipt_id']}{data['total_amount']}{data['timestamp']}{data['store_id']}"
    h = SHA256.new(msg.encode())
    signature = pkcs1_15.new(PRIVATE_KEY).sign(h)
    return signature.hex()

# --------------------------------------
# Helper: Verify signature
# --------------------------------------
def verify_signature(data: dict, signature_hex: str) -> bool:
    try:
        msg = f"{data['receipt_id']}{data['total_amount']}{data['timestamp']}{data['store_id']}"
        h = SHA256.new(msg.encode())
        signature = bytes.fromhex(signature_hex)
        pkcs1_15.new(PUBLIC_KEY).verify(h, signature)
        return True
    except Exception as e:
        print(f"❌ Signature verification failed: {e}")
        return False

# --------------------------------------
@app.route('/')
def index():
    return "Welcome to SecureReceipt API"

# --------------------------------------
@app.route('/generate-receipt', methods=['POST'])
def generate_receipt():
    data = request.get_json()
    required_fields = ["receipt_id", "store_id", "items", "total_amount", "timestamp"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    calc_total = sum(item["quantity"] * item["price"] for item in data["items"])
    if round(calc_total, 2) != round(data["total_amount"], 2):
        return jsonify({"error": "Total mismatch with item breakdown"}), 400

    receipt_data = {
        "receipt_id": data["receipt_id"],
        "store_id": data["store_id"],
        "items": data["items"],
        "total_amount": data["total_amount"],
        "timestamp": data["timestamp"]
    }

    # Generate and add hash
    receipt_hash = hash_receipt(receipt_data)
    receipt_data['hash'] = receipt_hash

    # Generate and add digital signature
    signature = sign_receipt(receipt_data)
    receipt_data["signature"] = signature

    # Save to file
    filename = f"data_{data['receipt_id']}.json"
    with open(filename, "w") as f:
        json.dump(receipt_data, f, indent=2)

    # Add to blockchain
    blockchain.add_block(receipt_hash)

    # QR Code
    verify_url = f"http://localhost:5000/verify/{data['receipt_id']}"
    qr = qrcode.make(verify_url)
    qr_path = f"static/qr/{data['receipt_id']}.png"
    qr.save(qr_path)

    return jsonify({
        "message": "Receipt securely stored with signature",
        "receipt_id": data["receipt_id"],
        "receipt_hash": receipt_hash,
        "signature": signature,
        "block_index": len(blockchain.chain) - 1,
        "qr_code": qr_path
    }), 201

# --------------------------------------
@app.route('/verify/<receipt_id>', methods=['GET'])
def verify_receipt(receipt_id):
    try:
        with open(f"data_{receipt_id}.json", "r") as f:
            receipt_data = json.load(f)
    except FileNotFoundError:
        return "Receipt not found", 404

    # Recalculate hash and validate
    recalculated_hash = hash_receipt({k: receipt_data[k] for k in receipt_data if k not in ["hash", "signature"]})
    is_hash_valid = (receipt_data["hash"] == recalculated_hash)

    # Verify digital signature
    is_signature_valid = verify_signature(receipt_data, receipt_data.get("signature", ""))

    # Both must be valid
    is_valid = is_hash_valid and is_signature_valid

    return render_template("verify.html", receipt=receipt_data, is_valid=is_valid)

# --------------------------------------
if __name__ == '__main__':
    app.run(debug=True)
