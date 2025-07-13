import hashlib
import json

def hash_receipt(data: dict) -> str:
    clean = json.dumps(data, sort_keys=True)
    return hashlib.sha256(clean.encode()).hexdigest()
