import React,{useEffect} from "react";
import { Link } from 'react-router-dom';
import Socials from './Socials'
import coinF from '../images/Coin_Heads.png';
import coinB from '../images/Coin_Tails.png';
import noCoin from '../images/Coin_Loss.png';
import coinReverse from '../images/Coin_Heads_Reverse.png';
import Navigation from "./Navigation";


// You should route to this page once they have signed the approval transaction, they take the $ out of your wallet AT THIS STAGE

function Result({result, user, setUser, funMode, game, setGame, outcome, wagerAmount, setWagerAmount, call, setCall, setResult, setOutcome, setConfirm}){
    function playAgain(){
    setResult('');
    setOutcome('');
    setWagerAmount(0);
    setCall(1);
    setConfirm(false);
    setGame({})
}
let funFlipResult
game.flipResult?funFlipResult = 'Tails':funFlipResult = 'Heads'

// let resultObj = {...game,
//     result:result,
//     outcome:outcome}
// console.log(resultObj);
// useEffect(() => { 
//     // MAKE SURE TO SET THIS DIFF FOR FUN ROUTE:
//     if(funMode){
//         fetch(`/fun_games/${resultObj.id}`,{
//             method:'PATCH',
//             headers: {
//              'Accept': 'application/json',
//              'Content-Type': 'application/json',
//            },
//            body: JSON.stringify(resultObj)
//         })
//         .then(r=>r.json())
//         // .then(data=>console.log(data))
//         .catch(error=> {console.log(error)})
//     }else{
//         fetch(`/games/${resultObj.id}`,{
//             method:'PATCH',
//             headers: {
//              'Accept': 'application/json',
//              'Content-Type': 'application/json',
//            },
//            body: JSON.stringify(resultObj)
//         })
//         .then(r=>r.json())
//         // Can you just change these things for the User/userid route direct from game?
//         .then(data=>console.log(data))
//         .catch(error=> {console.log(error)})
//     }
//     },[game])
    return(
    // Have outcome say "You win $xxxx ETH! (in green)"
    // Style one of these two things differently?
    <>
        <h1 className="font-header text-center mt-6 mb-2 text-6xl">{game.funUserWin?"Double!":"Nothing."}</h1>
           
            <h3 className="font-header text-center mt-2 mb-2 text-xl">
                <div className="flex justify-center">
                    <Socials/>
                </div>
            </h3>
            {/* This pixel font is kinda ugly. You can change it in the font family of tailwind.config. */}
                <div className="grid place-items-center align-middle" >

                    {/* SET THE IMAGE DISPLAYED BASED ON BEING HEADS OR TAILS. Figure out a flipping animation too. */}
                        {game.funUserWin?
                        result==="Heads"? // Case if won, and result = heads
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
                    <h3 className='font-header text-center mt-8 mb-4 text-2xl'>{funFlipResult}{game.funUserWin?'!':'.'} {game.funUserWin?`You Doubled your money, winning ${game.wagerAmount*2} FUN!`:`You lost ${game.wagerAmount} FUN.`}</h3>
                    <Link to='/' onClick={playAgain} className="h-8 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-yellow-600">Play Again</Link>
    {/* I think you should just put in the betting interface here -- will depend on the logistics of claiming $$$ */}
                </div>
                    

    

</>
    // Put the amount of the bet here, how much you win / lose (red / green)
);

}export default Result