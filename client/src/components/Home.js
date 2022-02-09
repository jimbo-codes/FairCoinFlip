import React,{useState, useEffect} from "react";
import { useNavigate, Link } from 'react-router-dom';
import Game from './Game';
import Socials from './Socials'
import Confirm from './Confirm'
import Navigation from './Navigation'
import coinF from '../images/Coin_Heads.png';
import coinB from '../images/Coin_Tails.png';
import User from './User';
import Plays from './Plays';
import {ethers} from 'ethers'
import Web3 from "web3/dist/web3.min";
// NEED TO USE THIS IMPORT ^, but not using it anyways.

function Home({call, wallet, setWallet, liveBet, setLiveBet, game, recentGames, setGame, user, setUser, setCall, setResult, setOutcome, result, auth, setAuth, wagerAmount, setWagerAmount, confirm, setConfirm}) {
    const navigate = useNavigate(); // for programatic navigation
    const [error, setError] = useState('');
    const [spin, setSpin] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    let coin = document.querySelector(".coin");
    let logBut = document.getElementById('login')

    
    { // Ethers function to force refresh if someone changes network on their acct.
        // The "any" network will allow spontaneous network changes
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        provider.on("network", (newNetwork, oldNetwork) => {
            // When a Provider makes its initial connection, it emits a "network"
            // event with a null oldNetwork along with the newNetwork. So, if the
            // oldNetwork exists, it represents a changing network
            if (oldNetwork) {
                window.location.reload();
            }
        });
    }

        // Onclick function to connect wallet
        function handleLogin(){
            if (window.ethereum && window.ethereum.isMetaMask) {
                console.log('MetaMask Here!');
                // Here change your button text to "connecting" and add disabled=true to button.
                logBut.disabled = true;
                logBut.textContent = "Connecting..."
                logBut.className = "mt-2 mb-2 px-4 py-2 border border-transparent text-l font-medium rounded-md text-white bg-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                getAccount();
            }else {
                logBut.textContent = "Install Metamask";
                // create an <a> href to link them to install metamask (not necessary rn)
                setErrorMessage('Please install MetaMask browser extension to interact');
            }
            // After running getaccount have them cick another button to setauth (letsride, etc.)
            // That second button has them sign a one time nonce (idk why you'd need this)
                    // ONLY set these things IF the metamask stuff works
    
            // Move this fetch to the second button to play (which fires one time nonce (?))
            
            // After this IF the user doesn't exist, then (post) create a user in our DB
        }

    //   Get metamask acct info
      async function getAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
            setWallet(result[0]); // sets wallet state to the acct
            getAccountBalance(result[0]);
            // set auth tru
        })
        .then(() => setAuth(true))
        .catch(error => setErrorMessage(error.message))
        }

        // Helper function to get + convert account balance.
        function getAccountBalance(account) {
		    window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		    .then(balance => {
            setUser(ethers.utils.formatEther(balance))
		    })
		.catch(error => {
			setErrorMessage(error.message);
		});
    	};
        
        function startGame(){
            // You're going to sign the one time nonce here (why is this necessary?)
            // The fetch to your database to log user information (comment out the patch to update the balance for now)
            // fire the fetch to your DB, if user exists continue, otherwise create.
        console.log(wallet)
        // Downcase the wallet in your database when identifying who
        fetch(`/me/${wallet}`)
        .then((r) => {return r.json();})
        .then(data=>{ 
            setUser(data);
            console.log(data)})    
            setLiveBet(true)
        }
    
    // Once logged in, update user stats on gameupdate. OR wallet update
    useEffect(() => {
        if(auth){
            fetch(`/me/${wallet}`)
            .then(r=>r.json())
            .then(userData=> {setUser(userData)})
            .catch(error=> {console.log(error)})    
        }
        },[wallet,game])

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

            // This post is undefined when you make it
            console.log(user)
            // THIS RETURNS THE BALANCE NOT THE ACTUAL USER ^^
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
           .then(data=> {setGame(data)})
           .catch(error=> {console.log(error)})

        // A basic frontend solution:
        let answer = Math.random();
        setSpin(true)
        setConfirm(false);

        // For security fairly certain you shouldn't be setting the outcome on frontend
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
                {auth?<User user={user} liveBet={liveBet}/>:null}

                    <div className="coin" id="coin">
                    <div className="heads"> 
                        <img className="float-left justify-center lg h-42 w-auto"
                        src={coinF}
                        alt="Future Flip Heads"/>
                        </div>

                        <div className="tails absolute justify-center ">
                        <img className="float-left justify-center lg h-32 w-auto"
                        src={coinB}
                        alt="Future Flip Tails"/>
                        </div>
                    </div>

                    {/* Render the betting if result is empty. */}
                    {result===''&&auth&&!confirm&&liveBet?<Game error={error} setGame={setGame} wagerAmount={wagerAmount} setWagerAmount={setWagerAmount} call={call} setCall={setCall} handleClick={handleClick}></Game>:null}
                    {confirm?<Confirm game={game} setGame={setGame} wagerAmount={wagerAmount} call={call} setConfirm={setConfirm} handleGamble={handleGamble}/>:null}
                    {spin?<h3 className='font-header text-center mt-8 mb-4 text-2xl'>We're rooting for you...</h3>:null}
                    {auth?null:<button disabled={auth} onClick={handleLogin} id="login" className="mt-2 mb-2 px-4 py-2 border border-transparent text-l font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Select Wallet</button>}
                    {/* Below button begins the game */}
                    {!liveBet&&auth?<button onClick={startGame} className='mt-2 mb-2 px-4 py-2 border-4 border-indigo-500 text-4xl font-header hover:bg-indigo-700 hover:text-white shadow-sm'>Click to begin...</button>:null}
                    {liveBet?null:
                    <>
                    <h3 className='font-header text-center mt-8 mb-4 text-4xl'>Recent Games</h3>
                    <div className="shadow-lg container mx-auto bg-white w-auto mt-2 divide-gray-200" id="market-table">
                        <ul>
                            {Array.isArray(recentGames)?recentGames.map((game)=> {
                                return <Plays key={game.id} game={game}/>
                            }):null}
                        </ul>
                  </div>
                  </>
                    }
                    {/*  You MAY NEED A SECOND ONE OF THESE to "Play double or nothing" and sign a one time nonce like DCF */}
                </div>
        </div>
        </>
        );
}export default Home
