from flask import Blueprint, request, jsonify
from blockchain.simple_blockchain import SimpleBlockchain
from utils import hasher, signature
from database import receipts_collection

receipt_bp = Blueprint("receipt", __name__)
blockchain = SimpleBlockchain()

# --------------------------------------------
# Generate Receipt
# --------------------------------------------
@receipt_bp.route("/generate", methods=["POST"])
def generate_receipt():
    data = request.get_json()
    required_fields = ["receipt_id", "store_id", "items", "total_amount", "timestamp"]
    
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing fields"}), 400

    # Ensure total_amount is a float
    try:
        data["total_amount"] = float(data["total_amount"])
    except ValueError:
        return jsonify({"error": "Invalid total_amount"}), 400

    # Calculate total from items
    calc_total = sum(item["quantity"] * item["price"] for item in data["items"])
    if round(calc_total, 2) != round(data["total_amount"], 2):
        return jsonify({"error": "Total mismatch with item breakdown"}), 400

    # 1. Hash the receipt data
    # The hash is calculated on the core receipt data, excluding hash and signature fields themselves.
    receipt_core_data = {
        "receipt_id": data["receipt_id"],
        "store_id": data["store_id"],
        "items": data["items"],
        "total_amount": data["total_amount"],
        "timestamp": data["timestamp"]
    }
    receipt_hash = hasher.hash_receipt(receipt_core_data)

    # 2. Sign the hash
    # We sign the original data, not the hash, as per signature.py implementation
    digital_signature = signature.sign_receipt(receipt_core_data)

    # 3. Create receipt record
    receipt_record = {
        "receipt_id": data["receipt_id"],
        "store_id": data["store_id"],
        "items": data["items"],
        "total_amount": data["total_amount"],
        "timestamp": data["timestamp"],
        "hash": receipt_hash,
        "signature": digital_signature
    }

    # 4. Save to MongoDB
    try:
        # Check if receipt_id already exists to prevent duplicates
        if receipts_collection.find_one({"receipt_id": data["receipt_id"]}):
            return jsonify({"error": "Receipt with this ID already exists"}), 409
        receipts_collection.insert_one(receipt_record)
    except Exception as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    # 5. Add to Blockchain
    blockchain.add_block(receipt_hash)

    return jsonify({
        "message": "Receipt generated successfully",
        "receipt_id": data["receipt_id"],
        "hash": receipt_hash,
        "signature": digital_signature,
        "block_index": len(blockchain.chain) - 1
    }), 201

# --------------------------------------------
# Verify Receipt
# --------------------------------------------
@receipt_bp.route("/verify/<receipt_id>", methods=["GET"])
def verify_receipt(receipt_id):
    # 1. Retrieve from MongoDB
    receipt_data = receipts_collection.find_one({"receipt_id": receipt_id}, {"_id": 0})
    
    if not receipt_data:
        return jsonify({"error": "Receipt not found"}), 404

    # 2. Re-calculate hash
    # We explicitly reconstruct the data to ensure type consistency (especially for float/int)
    try:
        verification_data = {
            "receipt_id": receipt_data["receipt_id"],
            "store_id": receipt_data["store_id"],
            "items": receipt_data["items"],
            "total_amount": float(receipt_data["total_amount"]), # Ensure float to match generation
            "timestamp": receipt_data["timestamp"]
        }
    except (ValueError, KeyError) as e:
        return jsonify({"error": "Corrupt receipt data"}), 500

    recalculated_hash = hasher.hash_receipt(verification_data)

    # 3. Verify Hash
    is_hash_valid = (receipt_data["hash"] == recalculated_hash)

    # 4. Verify Signature
    # Use verification_data to ensure we sign the exact same content (e.g. "10.0" vs "10")
    is_signature_valid = signature.verify_signature(verification_data, receipt_data["signature"])

    # 5. Verify Blockchain
    # Check if the receipt's hash exists in the blockchain
    is_blockchain_valid = blockchain.is_hash_in_chain(receipt_data["hash"])

    return jsonify({
        "is_valid": is_hash_valid and is_signature_valid and is_blockchain_valid,
        "checks": {
            "hash_valid": is_hash_valid,
            "signature_valid": is_signature_valid,
            "blockchain_valid": is_blockchain_valid
        },
        "message": "Receipt is valid" if (is_hash_valid and is_signature_valid and is_blockchain_valid) else "Receipt verification failed",
        "receipt": receipt_data
    })
