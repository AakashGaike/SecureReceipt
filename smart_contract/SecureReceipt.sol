// smart_contract/SecureReceipt.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SecureReceipt {
    mapping(bytes32 => bool) public receiptHashes;

    function storeReceiptHash(bytes32 hash) public {
        receiptHashes[hash] = true;
    }

    function verifyReceiptHash(bytes32 hash) public view returns (bool) {
        return receiptHashes[hash];
    }
}
