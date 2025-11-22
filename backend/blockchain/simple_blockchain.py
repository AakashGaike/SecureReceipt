import time
import hashlib
import json
import os
from database import blockchain_collection

class Block:
    def __init__(self, index, timestamp, data, previous_hash):
        self.index = index
        self.timestamp = timestamp
        self.data = data  # Receipt hash
        self.previous_hash = previous_hash
        self.hash = self.compute_hash()

    def compute_hash(self):
        block_string = f"{self.index}{self.timestamp}{self.data}{self.previous_hash}"
        return hashlib.sha256(block_string.encode()).hexdigest()

class SimpleBlockchain:
    def __init__(self):
        self.chain = self.load_chain()

    def create_genesis_block(self):
        return Block(0, time.time(), "Genesis Block", "0")

    def get_latest_block(self):
        return self.chain[-1]

    def add_block(self, data):
        prev_block = self.get_latest_block()
        new_block = Block(
            index=prev_block.index + 1,
            timestamp=time.time(),
            data=data,
            previous_hash=prev_block.hash
        )
        self.chain.append(new_block)
        self._save_block(new_block)
        return new_block

    def is_chain_valid(self):
        for i in range(1, len(self.chain)):
            prev = self.chain[i - 1]
            curr = self.chain[i]
            if curr.hash != curr.compute_hash():
                return False
            if curr.previous_hash != prev.hash:
                return False
        return True

    def is_hash_in_chain(self, hash_val):
        for block in self.chain:
            if block.data == hash_val:
                return True
        return False

    def _save_block(self, block):
        block_data = {
            "index": block.index,
            "timestamp": block.timestamp,
            "data": block.data,
            "previous_hash": block.previous_hash,
            "hash": block.hash
        }
        blockchain_collection.insert_one(block_data)

    def load_chain(self):
        # Load from MongoDB, sorted by index
        db_chain = list(blockchain_collection.find({}, {"_id": 0}).sort("index", 1))
        
        if not db_chain:
            genesis = self.create_genesis_block()
            self._save_block(genesis)
            return [genesis]
        
        chain = []
        for item in db_chain:
            block = Block(
                item["index"],
                item["timestamp"],
                item["data"],
                item["previous_hash"]
            )
            block.hash = item["hash"]
            chain.append(block)
        return chain

