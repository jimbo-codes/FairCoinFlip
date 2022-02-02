import React,{useState,useEffect} from "react";
import Bet from './Bet';
import Flipped from './Flipped';

function Home({}) {

    const [logged, setLog] = useState(true);
    // For now (testing) this is set to true, but it should be set to false by default (obviously)

    const [outcome, setOutcome] = useState('');
    const [result, setResult] = useState('');

    const [heads, setHeads] = useState(false);
    const [tails, setTails] = useState(false);

    

    function handleClick(){
    // ERROR HANDLING IF A BET and a wager isn't made.
    let answer = Math.random();
    if(answer<=0.5){
        setResult('Heads');
        if(heads){
            setOutcome('You doubled your money!')
        }else{
            setOutcome('You lost.')
        }
    }else{
        setResult('Tails')
        if(tails){
            setOutcome('You doubled your money!')
        }else{
            setOutcome('You lost.')
        }
    }
    // The animation should occur, and the result should be displayed ABOVE the "it's gonna be"


    // fetch('/test')
    // .then(res=>res.json())
    // .then(console.log('clicked'))
    }
    // Have a popup disclaimer once wallet is connected "saying I certify / agree that this is not illegal where I am, etc."

    // Break this into multiple components, Bet
    // play again
        return(
        <div>
            <h1 className="font-header text-center mt-8 mb-8 text-4xl">Double or nothing.</h1>
            {/* This pixel font is kinda ugly. You can change it in the font family of tailwind.config. */}
                <div className="grid place-items-center align-middle" >

                    {/* SET THE IMAGE DISPLAYED BASED ON BEING HEADS OR TAILS. Figure out a flipping animation too. */}
                    <img onClick={handleClick} className="float-left justify-center lg h-32 w-auto"
                    src="https://i.ibb.co/7Js60Ym/Dcf.png"
                    alt="Degen Coin Flip"/>

                    {/* Render the betting if result is empty. */}
                    {result===''&&logged?<Bet setHeads={setHeads} setTails={setTails} heads={heads} tails={tails} handleClick={handleClick}></Bet>:null}
                    {result!==''&&logged?<Flipped outcome={outcome} heads={heads} tails={tails} result={result}/>:null}
                    {/* Render a win or lose component if result */}

                    {/* This button goes away once you've connected. */}
                    {logged?null:<button className="mt-8 px-4 py-2 border border-transparent text-l font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Select Wallet</button>}
                </div>
        </div>

// <p className="text-8xl  mx-4 float-left justify-center text-center ">+</p>
//                         {/* Add a PLUS sign, then the Matic emblem */}
//         <img className="float-left mt-4" src="https://i.ibb.co/Mp2DKwy/polyg2.jpg" alt="polyg2" border="0"/>

        )
    }export default Home