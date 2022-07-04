// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract CoinFlip is Ownable, VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;
    LinkTokenInterface LINKTOKEN;

    /* Storage:
     ***********/

    address constant vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab;
    address constant link_token_contract = 0x01BE23585060835E02B77ef475b0Cc51aA1e0709;

    bytes32 constant keyHash = 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;
    uint16 constant requestConfirmations = 3;
    uint32 constant callbackGasLimit = 100000;
    uint32 constant numWords = 1;
    uint64 subscriptionId;
    uint256 private contractBalance;

    //uint256[] public randomWords;
    uint256 public requestId;

    struct Temp {
        uint256 id;
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
    mapping(uint256 => Temp) public temps; //to check who is the sender of a pending bet by Id

    /* Events:
     *********/

    event DepositToContract(address user, uint256 depositAmount, uint256 newBalance);
    event Withdrawal(address player, uint256 amount);
    event NewIdRequest(address indexed player, uint256 requestId);
    event GeneratedRandomNumber(uint256 requestId, uint256 randomNumber);
    event BetResult(address indexed player, bool victory, uint256 amount);

    /* Constructor:
     **************/

    constructor(uint64 _subscriptionId) payable initCosts(0.1 ether) VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        LINKTOKEN = LinkTokenInterface(link_token_contract);
        subscriptionId = _subscriptionId;
        contractBalance += msg.value;
    }

    /* Modifiers:
     ************/

    modifier initCosts(uint256 initCost) {
        require(msg.value >= initCost, "Contract needs some ETH.");
        _;
    }

    modifier betConditions() {
        require(msg.value >= 0.001 ether, "Insuffisant amount, please increase your bet!");
        require(msg.value <= getContractBalance() / 2, "Can't bet more than half the contract's balance!");
        require(!playersByAddress[msg.sender].betOngoing, "Bet already ongoing with this address");
        _;
    }

    /* Functions:
     *************/

    function bet(uint256 _betChoice) public payable betConditions {
        require(_betChoice == 0 || _betChoice == 1, "Must be either 0 or 1");

        playersByAddress[msg.sender].playerAddress = msg.sender;
        playersByAddress[msg.sender].betChoice = _betChoice;
        playersByAddress[msg.sender].betOngoing = true;
        playersByAddress[msg.sender].betAmount = msg.value;
        contractBalance += playersByAddress[msg.sender].betAmount;

        requestId = requestRandomWords();
        temps[requestId].playerAddress = msg.sender;
        temps[requestId].id = requestId;

        emit NewIdRequest(msg.sender, requestId);
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords() public returns (uint256) {
        return
            COORDINATOR.requestRandomWords(keyHash, subscriptionId, requestConfirmations, callbackGasLimit, numWords);
    }

    function fulfillRandomWords(uint256, uint256[] memory _randomWords) internal override {
        uint256 randomResult = _randomWords[0] % 2;
        temps[requestId].result = randomResult;

        checkResult(randomResult, requestId);
        emit GeneratedRandomNumber(requestId, randomResult);
    }

    function checkResult(uint256 _randomResult, uint256 _requestId) private returns (bool) {
        address player = temps[_requestId].playerAddress;
        bool win = false;
        uint256 amountWon = 0;

        if (playersByAddress[player].betChoice == _randomResult) {
            win = true;
            amountWon = playersByAddress[player].betAmount * 2;
            playersByAddress[player].balance = playersByAddress[player].balance + amountWon;
            contractBalance -= amountWon;
        }

        emit BetResult(player, win, amountWon);

        playersByAddress[player].betAmount = 0;
        playersByAddress[player].betOngoing = false;

        delete (temps[_requestId]);
        return win;
    }

    function deposit() external payable {
        require(msg.value > 0);
        contractBalance += msg.value;
        emit DepositToContract(msg.sender, msg.value, contractBalance);
    }

    function withdrawPlayerBalance() external {
        require(msg.sender != address(0), "This address doesn't exist.");
        require(playersByAddress[msg.sender].balance > 0, "You don't have any fund to withdraw.");
        require(!playersByAddress[msg.sender].betOngoing, "this address still has an open bet.");

        uint256 amount = playersByAddress[msg.sender].balance;
        payable(msg.sender).transfer(amount);
        delete (playersByAddress[msg.sender]);

        emit Withdrawal(msg.sender, amount);
    }

    /* View functions:
     *******************/

    function getPlayerBalance() external view returns (uint256) {
        return playersByAddress[msg.sender].balance;
    }

    function getContractBalance() public view returns (uint256) {
        return contractBalance;
    }

    /* PRIVATE :
     ***********/

    function withdrawContractBalance() external onlyOwner {
        _payout(payable(msg.sender));
        if (LINKTOKEN.balanceOf(address(this)) > 0) {
            bool isSuccess = LINKTOKEN.transfer(msg.sender, LINKTOKEN.balanceOf(address(this)));
            require(isSuccess, "Link withdraw failed");
        }
    }

    function addConsumer(address consumerAddress) external onlyOwner {
        COORDINATOR.addConsumer(subscriptionId, consumerAddress);
    }

    function removeConsumer(address consumerAddress) external onlyOwner {
        // Remove a consumer contract from the subscription.
        COORDINATOR.removeConsumer(subscriptionId, consumerAddress);
    }

    function cancelSubscription(address receivingWallet) external onlyOwner {
        // Cancel the subscription and send the remaining LINK to a wallet address.
        COORDINATOR.cancelSubscription(subscriptionId, receivingWallet);
        subscriptionId = 0;
    }

    function _payout(address payable to) private returns (uint256) {
        require(contractBalance != 0, "No funds to withdraw");

        uint256 toTransfer = address(this).balance;
        contractBalance = 0;
        to.transfer(toTransfer);
        return toTransfer;
    }
}
