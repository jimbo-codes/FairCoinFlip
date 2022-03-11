//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HeadsTails is Ownable {


    // ***** Modifiers *****

    modifier betConditions {
        require(msg.value >= 0.1 ether, "Live a little - bet more than 1 (MATIC) ETH");
        require(msg.value <= 1000 ether, "You can't bet more than 1000 ETH you degenerate!");
        _;
    }

    // ***** Events *****

    event GameResult(bool _result, uint _bet);

    // Overriding Ownable constructor function to make it payable
    constructor() payable {}
    
    // reciever function to seed account
    receive() external payable {}

    
    // get the contract balance
    function getBalance() public view onlyOwner returns(uint) {
        return address(this).balance;
    }

    // Random number generator
    function randomOutcome() private view returns(uint) {
        uint r = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, block.number)));
        return r % 2;
    }

    // Main game function. 0 = Heads and 1 = Tails. Contract takes a 3.4% fee.
    function playThat(uint playerChoice) public payable betConditions {
        
        uint outcome = randomOutcome();
        uint bet = (msg.value * 966)/1000;
        address payable player = payable(msg.sender);
        bool result = outcome == playerChoice;

        if (result) {
            player.transfer(2 * bet);
            console.log("Fuck yea you doubled your money");
        } else {
            console.log("You lost all your money. Sad");
        }

        emit GameResult(result, bet);
        
    }


}