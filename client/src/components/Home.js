import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import Game from './Game';
import Socials from './Socials'
import Confirm from './Confirm'
import Navigation from './Navigation'
import coinF from '../images/CoinFront.png';
import coinB from '../images/CoinBack.png';
import User from './User'


function Home({call, wallet, game, setGame, user, setUser, setCall, setResult, setOutcome, result, auth, setAuth, wagerAmount, setWagerAmount, confirm, setConfirm}) {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [spin, setSpin] = useState(false);
    let coin = document.querySelector(".coin");

    function handleLogin(){
        // Assume that you've identified who they are on the frontend at this point
        // will have to add setWallet up above.
        // This is going to show existing user for this wallet (create if they don't have)

        // This acts as a "login" where you send the user information (after getting it)
        
        // This returns the USER, assumes you've logged them in and already gotten wallet
        fetch(`/me/${wallet}`)
        .then((r) => {return r.json();})
        .then(data=>{ setAuth(true); setUser(data); console.log(data)})
        // After this IF the user doesn't exist, then (post) create a user in our DB
    }

    function handleClick(){
        if(call !==null && !!wagerAmount){    
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

        // A crazy basic frontend solution:
        let answer = Math.random();
        setSpin(true)
        setConfirm(false);
           // Confirm this is correct not being >=.
        if(answer>0.5){
            setResult('Tails')
            if(!!call){
                setOutcome(true)
            }else{
                setOutcome(false)
            }
        }
        else{
            setResult('Heads');
            if(!call){
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
        // Timeout after the coin spins to send you to results
        setTimeout(()=>{navigate('/result')}, 3000);
    }

    // Have a popup disclaimer once wallet is connected "saying I certify / agree that this is not illegal where I am, etc." (ONCE)
        return(
        <>
        <div>
            <h1 className="font-header text-center mt-4 mb-2 text-6xl">Double or nothing.</h1>
            {auth?null:<h3 className="font-header text-center mt-2 mb-2 text-xl">With the lowest fees of any coin flip game.</h3>}
            {/* Adds line if not auth in */}
            {auth?null:<h3 className="font-header text-center mt-2 mb-2 text-xl"style={{ fontSize: 'medium' }}>(and no network outages, sorry Solana).</h3>}
            {/* <h3 className="font-header text-center text-xl"> */}
                <div className="flex justify-center">
                    {auth?null:<Socials/>}
                </div>
            {/* </h3> */}
            {/* This pixel font is kinda ugly. You can change it in the font family of tailwind.config. */}
                <div className="grid place-items-center align-middle" >
                {auth?<User user={user}/>:null}

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

                    {/* Render the betting if result is empty. */}
                    {result===''&&auth&&!confirm?<Game error={error} setGame={setGame} wagerAmount={wagerAmount} setWagerAmount={setWagerAmount} call={call} setCall={setCall} handleClick={handleClick}></Game>:null}
                    {confirm?<Confirm game={game} setGame={setGame} wagerAmount={wagerAmount} call={call} setConfirm={setConfirm} handleGamble={handleGamble}/>:null}
                    {spin?<h3 className='font-header text-center mt-8 mb-4 text-2xl'>We're rooting for you...</h3>:null}
                    {/* This button goes away once you've connected. */}
                    {auth?null:<button onClick={handleLogin} className="mt-8 px-4 py-2 border border-transparent text-l font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Select Wallet</button>}
                    {/*  You MAY NEED A SECOND ONE OF THESE to "Play double or nothing" and sign a one time nonce like DCF */}
                </div>
        </div>
        </>
        );
}export default Home
