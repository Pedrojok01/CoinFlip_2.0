// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract Ownable {
    address public owner;

    constructor() {
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