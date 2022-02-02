import { Link } from 'react-router-dom';
import coinFront from '../images/CoinFront.png';
import coinBack from '../images/CoinBack.png';

function Confirm({wagerAmount, bet, setConfirm, handleGamble}){
    let headsName;
    if(bet===1){
        headsName = 'Heads'
    } else if(bet===2){
        headsName = 'Tails'
    }

    function handleClick(){
        // let gambleBtn = document.getElementById("gamble");
        // This asych function should not fire until 
            
            // in the settimeout see what happens if you run something to print your result
        // you're using handle gamble instead, but the below holds.
        // Sent the information from state for bet and the Wager to backend
        // wagerAmount
        // bet (0=heads, 1=tails)
    }
    function goBack(){
        setConfirm(false)
    }

// let resetBtn = document.querySelector("#reset-button");


// It is trying to do this before the gamble btn renders

    return(
        // Put a dollar conversion in this message
        <>
        <h3 className='font-header text-center mt-2 mb-4 text-2xl'>You're about to bet <b><u>{wagerAmount} ETH</u></b>  on <b><u>{headsName}</u></b></h3>
        <div className="grid">
        <button onClick={handleGamble} id="gamble"className="mt-4 mb-4 px-16 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-green-500 focus:bg-pink-700 focus:outline-none">Yep, it's a lock.</button>
        <button onClick={goBack} className="mt-6 align-text-top px-16 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-red-600 shadow-sm hover:bg-red-500 focus:bg-pink-700 focus:outline-none">I changed my Mind</button>
        </div>
        </>
    );
}export default Confirm