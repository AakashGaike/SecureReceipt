from blockchain import SimpleBlockchain
from utils.hasher import hash_receipt

# Sample receipt
receipt = {
    "receipt_id": "TXN1001",
    "store_id": "WMT001",
    "total_amount": 49.99,
    "timestamp": "2025-06-28T12:00:00Z"
}

# Hash it
hashed = hash_receipt(receipt)
print(f"Hashed Receipt: {hashed}")

# Store it
bc = SimpleBlockchain()
bc.add_block(hashed)

# Verify
print("Verification:", bc.verify_hash(hashed))  # Should print True
print("Verification (fake):", bc.verify_hash("fakehash"))  # Should print False
