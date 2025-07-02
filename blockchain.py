import time

class Block:
    def __init__(self, index, timestamp, data_hash, previous_hash):
        self.index = index
        self.timestamp = timestamp
        self.data_hash = data_hash
        self.previous_hash = previous_hash

    def to_dict(self):
        return {
            "index": self.index,
            "timestamp": self.timestamp,
            "data_hash": self.data_hash,
            "previous_hash": self.previous_hash
        }

class SimpleBlockchain:
    def __init__(self):
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):
        genesis_block = Block(0, time.time(), "0"*64, "0"*64)
        self.chain.append(genesis_block)

    def add_block(self, data_hash):
        last_block = self.chain[-1]
        new_block = Block(
            index=len(self.chain),
            timestamp=time.time(),
            data_hash=data_hash,
            previous_hash=last_block.data_hash
        )
        self.chain.append(new_block)
        return new_block

    def verify_hash(self, data_hash):
        for block in self.chain:
            if block.data_hash == data_hash:
                return True
        return False
