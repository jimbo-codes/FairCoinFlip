import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Game from './Game';
import Socials from './Socials'
import Confirm from './Confirm'
import Navigation from './Navigation'
import coinF from '../images/CoinFront.png';
import coinB from '../images/CoinBack.png';
// import Flipped from './Flipped';


function Home({call, wallet, setWallet, game, setGame, user, setUser, setCall, setResult, setOutcome, result, auth, setAuth, outcome, wagerAmount, setWagerAmount, confirm, setConfirm}) {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [spin, setSpin] = useState(false);
    let coin = document.querySelector(".coin");

    function handleLogin(){
        // Assume that you've identified who they are on the frontend at this point
        // Setstate for a wallet

        // This is going to show existing user for this wallet (create if they don't have)

        // This acts as a "login" where you send the user information (after getting it)
        
        // This returns the USER, assumes you've logged them in and already gotten wallet
        fetch(`/me/${wallet}`)
        .then((r) => {return r.json();})
        .then(data=>{ setAuth(true); setUser(data); console.log(data)})
    }

    function handleClick(){
        // call, wagerAmount
        if(!!call && !!wagerAmount){    
            // REMEMBER TO DELETE IF THEY GO BACK !!!!
            fetch('/games',{
                method:'POST',
                headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({
               user_id: user.id,
               wagerAmount: wagerAmount,
               call: call
                })           
           })
           .then(r=>r.json())
           .then(data=> {console.log(data);setGame(data)})
           .catch(error=> {console.log(error)})
           
           // REMEMBER TO FIRE A DELETE FOR THE GAME IF THEY GO BACK.
            
    
                setError('')
            setConfirm(true)
        }else if(!!call){
            setError('You must select a wager.')
        }else if(!!wagerAmount){
            setError('You must select either heads or tails.')
        }else{
            setError('You must select either heads or tails, and a wager.')
        }
        }

    function handleGamble(){
        // FIRST THING TO DO HERE IS HAVE wallet SIGN THE TRANSACTION & xfer funds, then execute below code (except for the math.)
            // Here go to backend results (and create the random seed)


        // A crazy basic frontend solution:
        let answer = Math.random();
        setSpin(true)
        setConfirm(false);
        // Pretty sure this shouldn't be greater than or equal to here -- confirm the math.
        if(answer<=0.5){
            setResult('Heads');
            if(call===1){
                setOutcome(true)
            }else{
                setOutcome(false)
            }
        }else{
            setResult('Tails')
            if(call===2){
                setOutcome(true)
            }else{
                setOutcome(false)
            }
        }
        // Make that coin spin beyotch
        coin.style.animation = "none";
        if(answer<=0.5){
            setTimeout(function(){
                coin.style.animation = "spin-heads 3s forwards";
            }, 100);
        }
        else{
            setTimeout(function(){
                coin.style.animation = "spin-tails 3s forwards";
            }, 100);
        }
        // setGame({...outcome,result})
        // Timeout after the coin spins to send you to results
        setTimeout(()=>{navigate('/result')}, 3000);
    }

    // Have a popup disclaimer once wallet is connected "saying I certify / agree that this is not illegal where I am, etc."
        return(
        <>
        <Navigation/>
        <div>
            <h1 className="font-header text-center mt-6 mb-2 text-6xl">Double or nothing.</h1>
            {auth?null:<h3 className="font-header text-center mt-2 mb-2 text-xl">With the lowest fees of any coin flip game.</h3>}
            {/* Adds line if not auth in */}
            {auth?null:<h3 className="font-header text-center mt-2 mb-2 text-xl"style={{ fontSize: 'medium' }}>(and no network outages, sorry Solana).</h3>}
            <h3 className="font-header text-center mt-2 mb-2 text-xl">
                <div className="flex justify-center">
                    <Socials/>
                </div>
            </h3>
            {/* This pixel font is kinda ugly. You can change it in the font family of tailwind.config. */}
                <div className="grid place-items-center align-middle" >

                    {/* SET THE IMAGE DISPLAYED BASED ON BEING HEADS OR TAILS. Figure out a flipping animation too. */}
                    {/* <div className="relative"> */}
                    <div className="coin" id="coin">
                    <div className="heads"> 
                        <img className="float-left justify-center lg h-42 w-auto"
                        src={coinF}
                        alt="Degen Coin Flip"/>
                        </div>

                        <div className="tails absolute justify-center ">
                        <img className="float-left justify-center lg h-32 w-auto"
                        src={coinB}
                        alt="Degen Coin Flip"/>
                        </div>
                    </div>

{/* TEMPORARY - REMOVE THESE ONCE SPINNING WORKS. */}
                    {/* <div class="buttons">
   <button className='temp' id="flip-button">Flip Coin</button>
   <button className='temp' id="reset-button">Reset</button>
</div> */}

                    {/* Render the betting if result is empty. */}
                    {result===''&&auth&&!confirm?<Game error={error} setGame={setGame} wagerAmount={wagerAmount} setWagerAmount={setWagerAmount} call={call} setCall={setCall} handleClick={handleClick}></Game>:null}
                    {confirm?<Confirm game={game} setGame={setGame} ßwagerAmount={wagerAmount} call={call} setConfirm={setConfirm} handleGamble={handleGamble}/>:null}
                    {spin?<h3 className='font-header text-center mt-8 mb-4 text-2xl'>We're rooting for you...</h3>:null}
                    {/* This should be a link to /result instead */}
                    {/* {result!==''&&auth?<Flipped outcome={outcome} call={call} tails={tails} result={result}/>:null} */}
                    {/* Render a win or lose component if result */}

                    {/* This button goes away once you've connected. */}
                    {auth?null:<button onClick={handleLogin} className="mt-8 px-4 py-2 border border-transparent text-l font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Select Wallet</button>}
                    {/*  You MAY NEED A SECOND ONE OF THESE to "Play double or nothing" and sign a one time nonce like DCF */}
                </div>
        </div>
        </>
        );
}export default Home
