// SPDX-License-Identifier: MIT
pragma solidity 0.6.6;

import "./Ownable.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";


contract CoinFlip is Ownable, VRFConsumerBase {


/* *** Storage ***
===================*/

    uint256 private contractBalance;
    uint256 public randomResult;
    bytes32 internal keyHash;  //For Chailink oracle
    uint256 internal fee;      //For Chailink oracle

    struct Temp {
        bytes32 id;
        uint256 result;
        address playerAddress;
    }

    struct PlayerByAddress {
        uint256 balance;
        uint256 betAmount;
        uint256 betChoice;
        address playerAddress;
        bool betOngoing;
    }

    mapping(address => PlayerByAddress) public playersByAddress; //to check who is the player
    mapping(bytes32 => Temp) public temps; //to check who is the sender of a pending bet


/* *** Events ***
==================*/

    event DepositToContract(address user, uint256 depositAmount, uint256 newBalance);
    event Withdrawal(address player, uint256 amount);
    event NewIdRequest(address indexed player, bytes32 requestId);
    event GeneratedRandomNumber(bytes32 requestId, uint256 randomNumber);
    event BetResult(address indexed player, bool victory, uint256 amount);


/* *** Constructor ***
=======================*/

    constructor() payable public initCosts(0.2 ether)
        VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            0xa36085F69e2889c224210F603D836748e7dC0088  // LINK Token
        )
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        fee = 0.1 * 10 ** 18;
        contractBalance += msg.value;
    }


/* *** Modifiers ***
=====================*/

    modifier initCosts(uint initCost){
        require(msg.value >= initCost, "Contract needs some ETH to initialize the contract balance.");
        _;
    }
    
    modifier betConditions {
        require(msg.value >= 0.001 ether, "Insuffisant amount, please increase your bet!");
        require(msg.value <= getContractBalance()/2, "You can't bet more than half the contract's balance!");
        require(playersByAddress[msg.sender].betOngoing == false, "A bet is already ongoing with this address.");
        _;
    }


/* *** Functions ***
=====================*/

    function bet(uint256 _betChoice) payable public betConditions {
        require(_betChoice == 0 || _betChoice == 1, "The choice must be either 0 or 1");

        uint256 seed = (681717666514 + block.number + block.difficulty);
        playersByAddress[msg.sender].playerAddress = msg.sender;
        playersByAddress[msg.sender].betChoice = _betChoice;
        playersByAddress[msg.sender].betOngoing = true;
        playersByAddress[msg.sender].betAmount = msg.value;
        contractBalance = contractBalance + playersByAddress[msg.sender].betAmount;
        
        bytes32 newRequestId = getRandomNumber(seed);
        temps[newRequestId].playerAddress = msg.sender;
        temps[newRequestId].id = newRequestId;

        emit NewIdRequest(msg.sender, newRequestId);
    }


    function getRandomNumber(uint256 userProvidedSeed) internal returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        
        return requestRandomness(keyHash, fee, userProvidedSeed);
    }
    

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness%2;
        temps[requestId].result = randomResult;
           
        checkResult(randomResult, requestId);

        emit GeneratedRandomNumber(requestId, randomResult);
    }


    function checkResult(uint256 _randomResult, bytes32 _requestId) public returns (bool) {
        address player = temps[_requestId].playerAddress;
        bool win = false;
        uint256 amountWon;

        if(playersByAddress[player].betChoice == _randomResult) {
            win = true;
            amountWon = playersByAddress[player].betAmount*2;
            playersByAddress[player].balance = playersByAddress[player].balance + amountWon;
            contractBalance = contractBalance - amountWon;
        }

        emit BetResult(player, win, amountWon);

        playersByAddress[player].betAmount = 0;
        playersByAddress[player].betOngoing = false;

        delete(temps[_requestId]);
        return win;
    }


    function deposit() public payable {
        require(msg.value > 0);

        contractBalance += msg.value;

        emit DepositToContract(msg.sender, msg.value, contractBalance);
    }


    function getPlayerBalance() public view returns (uint256) {
        return playersByAddress[msg.sender].balance;
    }


    function getContractBalance() public view returns (uint256) {
        return contractBalance;
    }


    function withdrawPlayerBalance() public {
        require(msg.sender != address(0), "This address doesn't exist.");
        require(playersByAddress[msg.sender].balance > 0, "You don't have any fund to withdraw.");
        require(playersByAddress[msg.sender].betOngoing == false, "this address still has an open bet.");

        uint256 amount = playersByAddress[msg.sender].balance;
        msg.sender.transfer(amount);
        delete (playersByAddress[msg.sender]);

        emit Withdrawal(msg.sender, amount);
    }


    function withdrawContractBalance() public onlyOwner {
        payout(msg.sender);
    }

    function payout(address payable to) internal returns (uint256) {
        require(contractBalance != 0, "No funds to withdraw");

        uint256 toTransfer = address(this).balance;
        contractBalance -= toTransfer;
        to.transfer(toTransfer);
        return toTransfer;
    }
}