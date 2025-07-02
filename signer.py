# signer.py
from Crypto.Signature import pkcs1_15
from Crypto.PublicKey import RSA
from Crypto.Hash import SHA256
import json

def sign_receipt(receipt_path):
    # Load receipt JSON
    with open(receipt_path, "r") as f:
        receipt = json.load(f)

    # Load private key
    with open("keys/private.pem", "r") as key_file:
        private_key = RSA.import_key(key_file.read())

    # Prepare message to sign (make sure the fields are consistent)
    message = f"{receipt['receipt_id']}{receipt['total_amount']}{receipt['timestamp']}{receipt['store_id']}"
    h = SHA256.new(message.encode())

    # Sign the hash
    signature = pkcs1_15.new(private_key).sign(h)

    # Add the signature to the receipt
    receipt["signature"] = signature.hex()

    # Save the updated receipt
    with open(receipt_path, "w") as f:
        json.dump(receipt, f, indent=4)

    print("✅ Receipt signed and saved.")

# Example usage
# sign_receipt("receipts/txn1015.json")
