import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Bet from './Bet';
import Socials from './Socials'
import Confirm from './Confirm'
import Navigation from './Navigation'
// import Flipped from './Flipped';


function Home({bet, setBet, setResult, setOutcome, result, logged, outcome, wagerAmount, setWagerAmount, confirm, setConfirm}) {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    function handleClick(){
    // bet, wagerAmount
    if(!!bet && !!wagerAmount){
        setConfirm(true)
    }else {
        setError('You must select either heads or tails, and a wager.')
    }
    // have this send you to a CONFIRMATION screen
    // make sure that a wager and bet are both selected - display an error message if not.
    // ERROR HANDLING IF A BET and a wager isn't made.

    // console.log("Wager: "+wagerAmount)
    // Math based on what was bet here (again this should end up on backend.)
    // SEND THE BET TO API - this entire operation should happen on backend.
    // send the selection of wager too.
    
    // The animation should occur, and the result should be displayed ABOVE the "it's gonna be"

    // fetch('/test')
    // .then(res=>res.json())
    // .then(console.log('clicked'))
    }

    function handleGamble(){
        let answer = Math.random();

    // I THINK THIS SHOULDN"T BE EQUAL HERE? -- confirm the math.
    if(answer<=0.5){
        setResult('Heads');
        if(bet===1){
            setOutcome(true)
        }else{
            setOutcome(false)
        }
    }else{
        setResult('Tails')
        if(bet===2){
            setOutcome(true)
        }else{
            setOutcome(false)
        }
    }

    // AFTER DETERMINING RESULT:
    console.log("Random Seed: " +answer);
    navigate('/result');
    }

    // Have a popup disclaimer once wallet is connected "saying I certify / agree that this is not illegal where I am, etc."
        return(
        <>
        <div>
            <h1 className="font-header text-center mt-8 mb-2 text-6xl">Double or nothing.</h1>
            <h3 className="font-header text-center mt-2 mb-2 text-xl">With the lowest fees of any coin flip game.</h3>
            {/* Adds line if not logged in */}
            {logged?null:<h3 className="font-header text-center mt-2 mb-2 text-xl"style={{ fontSize: 'medium' }}>(and no network outages, sorry Solana).</h3>}
            <h3 className="font-header text-center mt-2 mb-2 text-xl">
                <div className="flex justify-center">
                    <Socials/>
                </div>
            </h3>
            {/* This pixel font is kinda ugly. You can change it in the font family of tailwind.config. */}
                <div className="grid place-items-center align-middle" >

                    {/* SET THE IMAGE DISPLAYED BASED ON BEING HEADS OR TAILS. Figure out a flipping animation too. */}
                    <img className="float-left justify-center lg h-32 w-auto"
                    src="https://i.ibb.co/7Js60Ym/Dcf.png"
                    alt="Degen Coin Flip"/>

                    {/* Render the betting if result is empty. */}
                    {result===''&&logged&&!confirm?<Bet error={error} wagerAmount={wagerAmount} setWagerAmount={setWagerAmount} bet={bet} setBet={setBet} handleClick={handleClick}></Bet>:null}
                    {confirm?<Confirm wagerAmount={wagerAmount} bet={bet} setConfirm={setConfirm} handleGamble={handleGamble}/>:null}
                    {/* This should be a link to /result instead */}
                    {/* {result!==''&&logged?<Flipped outcome={outcome} bet={bet} tails={tails} result={result}/>:null} */}
                    {/* Render a win or lose component if result */}

                    {/* This button goes away once you've connected. */}
                    {logged?null:<button className="mt-8 px-4 py-2 border border-transparent text-l font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Select Wallet</button>}
                    {/*  You MAY NEED A SECOND ONE OF THESE to "Play double or nothing" and sign a one time nonce like DCF */}
                </div>
        </div>
        </>
        );
}export default Home