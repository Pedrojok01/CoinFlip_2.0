pragma solidity >= 0.5.0 < 0.7.0;

contract Ownable {
    address public owner;

    constructor() public{
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "You are not entitled to execute this function.");
        _; //Continue
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        owner = newOwner;
    }
}