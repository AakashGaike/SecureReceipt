import os
from Crypto.Signature import pkcs1_15
from Crypto.PublicKey import RSA
from Crypto.Hash import SHA256

# Get absolute path of the keys directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
KEYS_DIR = os.path.join(BASE_DIR, "..", "keys")

# Load private key
with open(os.path.join(KEYS_DIR, "private.pem"), "r") as f:
    PRIVATE_KEY = RSA.import_key(f.read())

# Load public key
with open(os.path.join(KEYS_DIR, "public.pem"), "r") as f:
    PUBLIC_KEY = RSA.import_key(f.read())

def sign_receipt(data: dict) -> str:
    msg = f"{data['receipt_id']}{data['total_amount']}{data['timestamp']}{data['store_id']}"
    h = SHA256.new(msg.encode())
    signature = pkcs1_15.new(PRIVATE_KEY).sign(h)
    return signature.hex()

def verify_signature(data: dict, signature_hex: str) -> bool:
    msg = f"{data['receipt_id']}{data['total_amount']}{data['timestamp']}{data['store_id']}"
    h = SHA256.new(msg.encode())
    try:
        signature = bytes.fromhex(signature_hex)
        pkcs1_15.new(PUBLIC_KEY).verify(h, signature)
        return True
    except (ValueError, TypeError):
        return False
