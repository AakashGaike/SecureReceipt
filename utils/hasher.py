import hashlib
import json

def hash_receipt(receipt_data: dict) -> str:
    """
    Hashes the receipt dictionary using SHA-256 and returns the hex digest.
    """
    # Ensure consistent ordering of keys
    receipt_str = json.dumps(receipt_data, sort_keys=True)
    return hashlib.sha256(receipt_str.encode()).hexdigest()
