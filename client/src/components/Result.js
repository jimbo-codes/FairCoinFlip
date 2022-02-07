import React,{useEffect} from "react";
import { Link } from 'react-router-dom';
import Socials from './Socials'
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

    // Any required actions (post to send ETH, etc.)
}

// HOW DO YOU PASS GAMEID Securely here??? - this should probably all be backend w/ sessions (?)
// This is for sure not secure.
let resultObj = {...game, 
    result:result, 
    outcome:outcome}

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
// TEMP STOPPING THIS TO TEST THE PATCH ALONE.
    // You are updating the user object to reflect the new balance. May not be necessary w/ web3 JS
    // .then(
    // )
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
                        {outcome?<div className="flex">
                                    <img className="float-left justify-center lg h-32 w-auto"
                                    src="https://i.ibb.co/7Js60Ym/Dcf.png"
                                    alt="Degen Coin Flip"/>
                                    <img className="float-right justify-center lg h-32 w-auto"
                                    src="https://i.ibb.co/7Js60Ym/Dcf.png"
                                    alt="Degen Coin Flip"/>
                                    </div>:<img className="float-left justify-center lg h-32 w-auto"
                                    src="https://i.ibb.co/7Js60Ym/Dcf.png"
                                    alt="Degen Coin Flip"/>}
                    <h3 className='font-header text-center mt-8 mb-4 text-2xl'>{result}{outcome?'!':'.'} {outcome?`You Doubled your money, winning ${wagerAmount*2} ETH!`:`You lost ${wagerAmount} ETH.`}</h3>
                    <Link to='/' onClick={playAgain} className="h-8 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-yellow-600">Play Again</Link>
    {/* I think you should just put in the betting interface here -- will depend on the logistics of claiming $$$ */}
                </div>
                    

    

</>
    // Put the amount of the bet here, how much you win / lose (red / green)
);

}export default Result