import React from "react";
import { Link } from 'react-router-dom';
import Socials from './Socials'
import coinF from '../images/Coin_Heads.png';
import coinB from '../images/Coin_Tails.png';
import noCoin from '../images/Coin_Loss.png';
import coinReverse from '../images/Coin_Heads_Reverse.png';
import {ethers} from 'ethers'


function Result({result, funMode, game, startGame, user, setUser, wallet, setWallet, setLiveBet, setGame, outcome, wagerAmount, setWagerAmount, call, setCall, setResult, setOutcome, setConfirm}){
    function playAgain(){ // reset state to play again.
    setResult('');
    setOutcome('');
    setWagerAmount(0);
    setCall(1);
    setConfirm(false);
    setGame({})
}
let funFlipResult
let wordCall;
let opposite;
let cashResult;



if(call){ // set words for flip state
    wordCall = 'Tails';
    opposite = 'Heads'
}else{wordCall='Heads'; opposite = 'Tails'}

if(!funMode){ // set result data for fun / non fun mode.
    result[0]? funFlipResult = wordCall : funFlipResult = opposite
    if(result[0]){
        cashResult = ethers.utils.formatEther(String(result[1]*2))
    }else{
        cashResult = ethers.utils.formatEther(String(result[1]))
    }
}else{
    game.funUserWin? funFlipResult = wordCall : funFlipResult = opposite
}

// console.log(ethers.utils.formatEther(result[1]))
// Figure out how to add back GAS in here to display correct amount -- 0.000285 matic

    return(
    // Have outcome say "You win $xxxx ETH! (in green)"
    <>
    {!funMode?
    <>
        <h1 className="font-header text-center mt-6 mb-2 text-6xl">{result[0]?"Double!":"Nothing."}</h1>
           
            <h3 className="font-header text-center mt-2 mb-2 text-xl">
                <div className="flex justify-center">
                    <Socials/>
                </div>
            </h3>
            {/* Idk about this pixel font. Maybe replace. */}
                <div className="grid place-items-center align-middle" >
                        {result[0]?
                        funFlipResult==="Heads"? // Case if won, and result = heads
                        <div className="flex">
                                    <img className="float-left px-2 justify-center lg h-32 w-auto"
                                    src={coinReverse}
                                    alt="Future Flip Heads"/>
                                    <img className="float-right justify-center lg h-32 w-auto"
                                    src={coinF}
                                    alt="Future Flip Tails"/>
                                    </div>:
                                        <div className="flex">
                                        <img className="float-left px-2 justify-center lg h-32 w-auto"
                                        src={coinB}
                                        alt="Future Flip Heads"/>
                                        <img className="float-right justify-center lg h-32 w-auto"
                                        src={coinB}
                                        alt="Future Flip Tails"/>
                                        </div>:
                                    <img className="float-left justify-center lg h-32 w-auto"
                                    src={noCoin}
                                    alt="Losing Coin"/>}
                    <h3 className='font-header text-center mt-8 mb-4 text-2xl'>{funFlipResult}{result[0]?'!':'.'} {result[0]?`You Doubled your money, winning ${cashResult} MATIC!`:`You lost ${cashResult} MATIC.`}</h3>
                    <Link to='/' onClick={playAgain} className="h-8 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-yellow-600">Play Again</Link>
                </div>
    </>

    : /// BELOW THIS IS second half of ternary for fun mode.
                <>
                <h3 className="font-header text-center mt-2 mb-2 text-xl">
                <div className="flex justify-center">
                    <Socials/>
                </div>
            </h3>
            {/* Idk about this pixel font. Maybe replace. */}
                <div className="grid place-items-center align-middle" >
                        {game.funUserWin?
                        funFlipResult==="Heads"? // Case if won, and result = heads
                        <div className="flex">
                                    <img className="float-left px-2 justify-center lg h-32 w-auto"
                                    src={coinReverse}
                                    alt="Future Flip Heads"/>
                                    <img className="float-right justify-center lg h-32 w-auto"
                                    src={coinF}
                                    alt="Future Flip Tails"/>
                                    </div>:
                                        <div className="flex">
                                        <img className="float-left px-2 justify-center lg h-32 w-auto"
                                        src={coinB}
                                        alt="Future Flip Heads"/>
                                        <img className="float-right justify-center lg h-32 w-auto"
                                        src={coinB}
                                        alt="Future Flip Tails"/>
                                        </div>:
                                    <img className="float-left justify-center lg h-32 w-auto"
                                    src={noCoin}
                                    alt="Losing Coin"/>}
                    <h3 className='font-header text-center mt-8 mb-4 text-2xl'>{funFlipResult}{game.funUserWin?'!':'.'} {game.funUserWin?`You Doubled your money, winning ${wagerAmount*2} FUN!`:`You lost ${wagerAmount} FUN.`}</h3>                    
                    <Link to='/' onClick={playAgain} className="h-8 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-yellow-600">Play Again</Link>
                </div>
                    </>}
</>

);
}export default Result