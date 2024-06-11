// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { CoinFlip } from "../CoinFlip.sol";

contract CoinFlipHelper is CoinFlip {
    constructor(
        address _vrfCoordinator,
        bytes32 _keyHash,
        uint256 _subscriptionId
    ) payable CoinFlip(_vrfCoordinator, _keyHash, _subscriptionId) {}

    function testFulfillRandomWords(uint256 requestId, uint256[] calldata randomWords) public {
        fulfillRandomWords(requestId, randomWords);
    }
}
