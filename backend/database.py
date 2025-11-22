import os
from pymongo import MongoClient
import certifi
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    print("⚠️ WARNING: MONGO_URI not found in environment variables.")

# ⚠️ NOTE: tlsAllowInvalidCertificates=True is added to bypass SSL errors in some environments.
# In a strict production environment, you should ensure the CA bundle is correctly configured.
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where(), tlsAllowInvalidCertificates=True)
db = client.get_database("secure_receipt_db")
receipts_collection = db.get_collection("receipts")
blockchain_collection = db.get_collection("blockchain")

def get_db():
    return db
