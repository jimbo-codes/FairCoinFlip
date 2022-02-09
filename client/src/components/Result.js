import React,{useEffect} from "react";
import { Link } from 'react-router-dom';
import Socials from './Socials'
import coinF from '../images/Coin_Heads.png';
import coinB from '../images/Coin_Tails.png';
import noCoin from '../images/Coin_Loss.png';
import coinReverse from '../images/Coin_Heads_Reverse.png';
import Navigation from "./Navigation";


// You should route to this page once they have signed the approval transaction, they take the $ out of your wallet AT THIS STAGE

function Result({result, user, setUser, game, setGame, outcome, wagerAmount, setWagerAmount, call, setCall, setResult, setOutcome, setConfirm}){
    function playAgain(){
    setResult('');
    setOutcome('');
    setWagerAmount(0);
    setCall();
    setConfirm(false);
    setGame({})
}

// HOW DO YOU PASS GAMEID Securely here??? - this should probably all be backend w/ sessions (?)
// This is for sure not secure.
let resultObj = {...game, 
    result:result, 
    outcome:outcome}
console.log(result);
useEffect(() => { 
    fetch(`/games/${resultObj.id}`,{
        method:'PATCH',
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(resultObj)
    })
    .then(r=>r.json())
    // Can you just change these things for the User/userid route direct from game?
    .then(data=>console.log(data))

    // No longer need the below user update, you built this into the game + result route.
    // Need to make sure your wristbanding for user is done so you keep updating data.

    //     ()=> {
    //     // Do you want this to occur here? would having it happen on backend in the single above route be better?
    //     return fetch(`/users/${user.id}`,{
    //         method:'PATCH',
    //         headers: {
    //          'Accept': 'application/json',
    //          'Content-Type': 'application/json',
    //        },
    //        body: JSON.stringify(resultObj)
    //     })
    //     .then(r=>r.json())
    //     .then(data=> setUser(data))
    // })
    // Idt you need to do anything w/ this data coming back.
    // Need this kind of syntax to do the double fetch
    // .then(e=>{
    // return fetch(`https://api.coingecko.com/api/v3/coins/${e.coin_id}`)
// })
    .catch(error=> {console.log(error)})
    },[game])

    return(
    // Have outcome say "You win $xxxx ETH! (in green)"
    
    // Style one of these two things differently?
    // Have it delay the display until the animation is done (?)
    <>
        <h1 className="font-header text-center mt-6 mb-2 text-6xl">{outcome?"Double!":"Nothing."}</h1>
           
            <h3 className="font-header text-center mt-2 mb-2 text-xl">
                <div className="flex justify-center">
                    <Socials/>
                </div>
            </h3>
            {/* This pixel font is kinda ugly. You can change it in the font family of tailwind.config. */}
                <div className="grid place-items-center align-middle" >

                    {/* SET THE IMAGE DISPLAYED BASED ON BEING HEADS OR TAILS. Figure out a flipping animation too. */}
                        {outcome?
                        result=="Heads"? // Case if won, and result = heads
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
                    <h3 className='font-header text-center mt-8 mb-4 text-2xl'>{result}{outcome?'!':'.'} {outcome?`You Doubled your money, winning ${wagerAmount*2} ETH!`:`You lost ${wagerAmount} ETH.`}</h3>
                    <Link to='/' onClick={playAgain} className="h-8 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-yellow-600">Play Again</Link>
    {/* I think you should just put in the betting interface here -- will depend on the logistics of claiming $$$ */}
                </div>
                    

    

</>
    // Put the amount of the bet here, how much you win / lose (red / green)
);

}export default Result