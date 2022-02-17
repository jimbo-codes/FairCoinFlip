// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract HeadsTails is Ownable {

    // Initialize otwner contract owner variable

    // Define game struct
    struct Game {
        address payable playerAddress;
        uint bet;
        uint playerChoice;
    }

    // Initialize game struct
    Game public game;

    // Constructor that assigns deploying address as owner
    // should this be payable or public? why would it be payable?
    constructor() public {
        owner = msg.sender;
    }

    // Adding in ownership security


    // reciever function to seed account
    receive() external payable {}

    
    // get the contract balance
    function getBalance() public view returns(uint) {
        require(msg.sender == owner, "Only the manager may view the balance");
        return address(this).balance;
    }

    // Random number generator
    function randomOutcome() private view returns(uint) {
        uint r = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, block.number)));
        return r % 2;
    }


    function playThat(uint playerChoice) public payable returns(bool) {
        
        uint outcome = randomOutcome();
        uint bet = (msg.value * 966)/1000;
        address payable player = payable(msg.sender);

        if (outcome == playerChoice) {
            player.transfer(2 * bet);
            console.log("Fuck yea you doubled your money");
            return (outcome == playerChoice);
        } else {
            console.log("You lost all your money. Sad");
            return (outcome == playerChoice);
        }
        
    }

}


