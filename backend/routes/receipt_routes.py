from flask import Blueprint, request, jsonify
from utils.hasher import hash_receipt
from utils.signature import sign_receipt, verify_signature
from blockchain.simple_blockchain import SimpleBlockchain
import os
import json

receipt_bp = Blueprint("receipt", __name__)

# Blockchain instance
blockchain = SimpleBlockchain()

# Directory for storing receipts
DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")
os.makedirs(DATA_DIR, exist_ok=True)

# --------------------------------------------
# Generate Receipt
# --------------------------------------------
@receipt_bp.route("/generate", methods=["POST"])
def generate_receipt():
    data = request.get_json()
    required_fields = ["receipt_id", "store_id", "items", "total_amount", "timestamp"]

    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Calculate total from items
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

    # Hash and sign
    receipt_hash = hash_receipt(receipt_data)
    receipt_data["hash"] = receipt_hash
    receipt_data["signature"] = sign_receipt(receipt_data)

    # Save to file
    file_path = os.path.join(DATA_DIR, f"{data['receipt_id']}.json")
    with open(file_path, "w") as f:
        json.dump(receipt_data, f, indent=2)

    # Add to blockchain
    blockchain.add_block(receipt_hash)

    return jsonify({
        "message": "Receipt stored successfully",
        "receipt_id": data["receipt_id"],
        "hash": receipt_hash,
        "signature": receipt_data["signature"],
        "block_index": len(blockchain.chain) - 1
    }), 201

# --------------------------------------------
# Verify Receipt
# --------------------------------------------
@receipt_bp.route("/verify/<receipt_id>", methods=["GET"])
def verify_receipt(receipt_id):
    try:
        file_path = os.path.join(DATA_DIR, f"{receipt_id}.json")
        if not os.path.exists(file_path):
            return jsonify({"error": "Receipt not found"}), 404

        with open(file_path, "r") as f:
            receipt_data = json.load(f)

        # Recalculate hash and verify signature
        fields_to_hash = {k: receipt_data[k] for k in receipt_data if k not in ["hash", "signature"]}
        recalculated_hash = hash_receipt(fields_to_hash)

        is_hash_valid = (receipt_data["hash"] == recalculated_hash)
        is_signature_valid = verify_signature(receipt_data, receipt_data.get("signature", ""))

        return jsonify({
            "receipt": receipt_data,
            "is_valid": is_hash_valid and is_signature_valid,
            "hash_valid": is_hash_valid,
            "signature_valid": is_signature_valid,
            "message": "Receipt is authentic" if is_hash_valid and is_signature_valid else "Receipt is invalid"
        })

    except Exception as e:
        return jsonify({"error": f"Verification failed: {str(e)}"}), 500
