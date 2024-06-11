// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { VRFV2PlusClient } from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

contract VRFCoordinatorMock {
    event RandomWordsRequested(
        bytes32 keyHash,
        uint256 requestId,
        uint256 preSeed,
        uint256 subId,
        uint16 requestConfirmations,
        uint32 callbackGasLimit,
        uint32 numWords,
        bytes extraArgs,
        address sender
    );

    event RandomWordsFulfilled(uint256 requestId, address consumer);

    error VRFCoordinatorMock__FulfillRandomWordsFailed();

    uint256 public requestCounter = 1;

    struct Request {
        uint256 subId;
        uint32 callbackGasLimit;
        uint32 numWords;
        bytes extraArgs;
    }

    mapping(uint256 => Request) internal s_requests;

    function requestRandomWords(VRFV2PlusClient.RandomWordsRequest calldata _req) external returns (uint256) {
        uint256 requestId = requestCounter++;
        uint256 preSeed = requestCounter; // Simulating a seed

        s_requests[requestId] = Request({
            subId: _req.subId,
            callbackGasLimit: _req.callbackGasLimit,
            numWords: _req.numWords,
            extraArgs: _req.extraArgs
        });

        bytes memory extraArgsBytes = VRFV2PlusClient._argsToBytes(_fromBytes(_req.extraArgs));

        s_requests[requestId] = Request({
            subId: _req.subId,
            callbackGasLimit: _req.callbackGasLimit,
            numWords: _req.numWords,
            extraArgs: _req.extraArgs
        });

        emit RandomWordsRequested(
            _req.keyHash,
            requestId,
            preSeed,
            _req.subId,
            _req.requestConfirmations,
            _req.callbackGasLimit,
            _req.numWords,
            extraArgsBytes,
            msg.sender
        );
        return requestId;
    }

    function fulfillRandomWords(uint256 requestId, address consumer) external {
        // Simulating random word fulfillment
        uint256[] memory randomWords = new uint256[](1);
        randomWords[0] = 1;

        (bool success, ) = consumer.call(
            abi.encodeWithSignature("testFulfillRandomWords(uint256,uint256[])", requestId, randomWords)
        );
        if (!success) revert VRFCoordinatorMock__FulfillRandomWordsFailed();

        emit RandomWordsFulfilled(requestId, consumer);
    }

    /// @dev Convert the extra args bytes into a struct
    /// @param extraArgs The extra args bytes
    /// @return The extra args struct
    function _fromBytes(bytes calldata extraArgs) internal pure returns (VRFV2PlusClient.ExtraArgsV1 memory) {
        return abi.decode(extraArgs[4:], (VRFV2PlusClient.ExtraArgsV1));
    }
}
