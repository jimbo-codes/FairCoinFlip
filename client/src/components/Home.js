import React,{useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Game from './Game';
import Socials from './Socials'
import Confirm from './Confirm'
import coinF from '../images/Coin_Heads.png';
import coinB from '../images/Coin_Tails.png';
import User from './User';
import Plays from './Plays';
import {ethers} from 'ethers'
import Web3 from "web3/dist/web3.min"; // web3js caused errors with create react app, fixed it but ended up not using it anyways.


function Home({call, startGame, wallet, setWallet, funMode, setFunMode, setToke, toke, liveBet, setLiveBet, game, recentGames, setGame, user, setUser, setCall, setResult, outcome, setOutcome, result, auth, setAuth, wagerAmount, setWagerAmount, confirm, setConfirm}) {
    const navigate = useNavigate(); // for programatic navigation
    const [error, setError] = useState('');
    const [spin, setSpin] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    let coin = document.querySelector(".coin");
    const [flipped, setFlipped] = useState(false); // i think delete this and one below.
    const [testres, setTestRes] = useState([]);
  
    // { // Ethers function to force refresh if someone changes network on their acct.
    //     // The "any" network will allow spontaneous network changes
    //     const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    //     provider.on("network", (newNetwork, oldNetwork) => {
    //         // When a Provider makes its initial connection, it emits a "network"
    //         // event with a null oldNetwork along with the newNetwork. So, if the
    //         // oldNetwork exists, it represents a changing network
    //         if (oldNetwork) {
    //             window.location.reload();
    //         }
    //     });
    // }
        const networks = {
            polygon: {
              chainId: `0x${Number(137).toString(16)}`,
              chainName: "Polygon Mainnet",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
              },
              rpcUrls: ["https://polygon-rpc.com/"],
              blockExplorerUrls: ["https://polygonscan.com/"]
            },
            mumbai: {
                chainId: '0x13881', // what chainid for mumbai
                chainName: "Mumbai",
                
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18
                },
                rpcUrls: ["https://matic-mumbai.chainstacklabs.com","https://rpc-mumbai.maticvigil.com","https://matic-testnet-archive-rpc.bwarelabs.com"],
                blockExplorerUrls: ["https://mumbai.polygonscan.com"]
              },
            }

            // Network switch to force polygon login
            const handleNetworkSwitch = async (networkName) => {
                setError();
                await changeNetwork({ networkName, setError });
              };
            const changeNetwork = async ({ networkName, setError }) => {
                try {
                    if (!window.ethereum) throw new Error("No crypto wallet found");
                    await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                        ...networks[networkName]
                        }
                    ]
                    });
                } catch (err) {
                    setError(err.message);
                }
                };

        // Onclick function to connect wallet
        function handleLogin(){
    let logBut = document.getElementById('login')
            if (window.ethereum && window.ethereum.isMetaMask) {
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
            // That second button maybe sign a one time nonce
                    // ONLY set these things IF the metamask stuff works
        }

    //   Get metamask acct info
      async function getAccount() {
          // Set this to real polygon network eventually::
        await handleNetworkSwitch("mumbai") // PUTS USER ON RIGHT NETWORK
            // this should also add chain if user doesn't have polygon.
            // https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
            setWallet(result[0]); // sets wallet id state to the acct
            getAccountBalance(result[0]);
            setAuth(true)
        })
        .catch(error => setErrorMessage(error.message))
        }

        // Helper function to get + convert account balance.
        function getAccountBalance(account) {
		    window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		    .then(balance => {
            setUser(ethers.utils.formatEther(balance))
            // console.log(account)
		    })
		.catch(error => {
			setErrorMessage(error.message);
		});
    	};
        
        
    
    // useeffect to update the user based on game results
    useEffect(() => { // Once logged in, update user stats on gameupdate. OR wallet update
        if(auth){
            fetch(`/me/${wallet}`)
            .then(r=>r.json())
            .then(userData=> {setUser(userData)})
            .catch(error=> {console.log(error)})    
        }
        },[game,result])

        
        function getCookie(key) {
            var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
            return b ? b.pop() : "";
          }

    useEffect(()=>{ // use effect to create new user if none exists
        if(auth){
        fetch(`/me/${wallet}`)
                .then((r) => r.json())
                .then(data=>{ 
                    localStorage.setItem('token', data.token)
                    console.log(data.token)
                    setToke(localStorage.getItem("token"))
                    console.log(localStorage.getItem("token"))
                    if(data.error){
                        return fetch(`users/`,{
                            method:'POST',
                            headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                            balance: user,
                            wallet: wallet
                            })
                        })
                        .then(r=>r.json())
                        .then(data=>{setUser(data);})
                    }            
                })
    }
    },[auth])

    function handleClick(){ // erro handling for making bets
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
        if(funMode){
            setSpin(true);
            setConfirm(false);
                fetch('/fun_games',{
                    method:'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                user_id: user.id,
                wagerAmount: wagerAmount,
                call: call,
                })
            })
           .then(r=>r.json())
           .then(data=> {setGame(data)
            coin.style.animation = "none";
            if(!!call){ // Different Flipping animation for when you bet tails:
                // console.log(call)
                // console.log(data.flipResult)
                if(data.flipResult){ // result is tails
                    // This isnt working how you want - flips heads for a ms.
                    setTimeout(function(){
                        coin.style.animation = "spin-tails-W 3s forwards";
                    }, 100);
                }else{
                    setTimeout(function(){
                        coin.style.animation = "spin-heads-L 3s forwards";
                    }, 100);
                }
            }else{
            if(data.flipResult){ // this means reuslt is tails
                    setTimeout(function(){
                    coin.style.animation = "spin-tails 3s forwards";
                    }, 100);    
            }
            else{
                setTimeout(function(){
                    coin.style.animation = "spin-heads 3s forwards";
                }, 100);
            }
        }
            // Timeout after the coin spins to send you to results
            setTimeout(()=>{navigate('/result')}, 3000);
            })
           .catch(error=> {console.log(error)})
        }else{ // handle the actual game
            handleChainBet(); // fire the async function to start bet
        }
    }
    async function handleChainBet(){
        // let contractAddy = "0x7ec17de3b4806384876f581fd43844cc27290013" // FOR RINKERBY
        let contractAddy = "0xef161effbb12fc716f45d11df5c87b11b9483e81" // FOR MUMBAI
        // STOPPED WORKING WITH THE POLYGON CONTRACT + ABI, figure that out.
        // The new contract has some issues I think.
        // RINKEBY ABI:
        // let contractABI = [
        //     {
        //         "inputs": [],
        //         "stateMutability": "payable",
        //         "type": "constructor"
        //     },
        //     {
        //         "anonymous": false,
        //         "inputs": [
        //             {
        //                 "indexed": false,
        //                 "internalType": "bool",
        //                 "name": "_result",
        //                 "type": "bool"
        //             },
        //             {
        //                 "indexed": false,
        //                 "internalType": "uint256",
        //                 "name": "_bet",
        //                 "type": "uint256"
        //             }
        //         ],
        //         "name": "GameResult",
        //         "type": "event"
        //     },
        //     {
        //         "anonymous": false,
        //         "inputs": [
        //             {
        //                 "indexed": true,
        //                 "internalType": "address",
        //                 "name": "previousOwner",
        //                 "type": "address"
        //             },
        //             {
        //                 "indexed": true,
        //                 "internalType": "address",
        //                 "name": "newOwner",
        //                 "type": "address"
        //             }
        //         ],
        //         "name": "OwnershipTransferred",
        //         "type": "event"
        //     },
        //     {
        //         "inputs": [],
        //         "name": "getBalance",
        //         "outputs": [
        //             {
        //                 "internalType": "uint256",
        //                 "name": "",
        //                 "type": "uint256"
        //             }
        //         ],
        //         "stateMutability": "view",
        //         "type": "function"
        //     },
        //     {
        //         "inputs": [],
        //         "name": "owner",
        //         "outputs": [
        //             {
        //                 "internalType": "address",
        //                 "name": "",
        //                 "type": "address"
        //             }
        //         ],
        //         "stateMutability": "view",
        //         "type": "function"
        //     },
        //     {
        //         "inputs": [
        //             {
        //                 "internalType": "uint256",
        //                 "name": "playerChoice",
        //                 "type": "uint256"
        //             }
        //         ],
        //         "name": "playThat",
        //         "outputs": [],
        //         "stateMutability": "payable",
        //         "type": "function"
        //     },
        //     {
        //         "inputs": [],
        //         "name": "renounceOwnership",
        //         "outputs": [],
        //         "stateMutability": "nonpayable",
        //         "type": "function"
        //     },
        //     {
        //         "inputs": [
        //             {
        //                 "internalType": "address",
        //                 "name": "newOwner",
        //                 "type": "address"
        //             }
        //         ],
        //         "name": "transferOwnership",
        //         "outputs": [],
        //         "stateMutability": "nonpayable",
        //         "type": "function"
        //     },
        //     {
        //         "stateMutability": "payable",
        //         "type": "receive"
        //     }
        // ]

        // MUMBAI CONTRACT ABI:
        let contractABI = [
            {
                "inputs": [],
                "stateMutability": "payable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "_result",
                        "type": "bool"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_bet",
                        "type": "uint256"
                    }
                ],
                "name": "GameResult",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "playerChoice",
                        "type": "uint256"
                    }
                ],
                "name": "playThat",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "stateMutability": "payable",
                "type": "receive"
            },
            {
                "inputs": [],
                "name": "getBalance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
        // on testnet the call errors saying to bet more than 0.001 ETH (fix this.)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const testContract = new ethers.Contract(contractAddy, contractABI, signer)
        // increase bet amount by fee:
        let betstring = wagerAmount+wagerAmount*0.035;
        const options = {value: ethers.utils.parseEther(String(betstring))}
            // Passing in options argument to set the value of our function call
            const contCall = await testContract.playThat(1, options)
            // The above fires the metamask popup
            let receipt = await contCall.wait(1).then( //this then fires on confirm of MM.
                setConfirm(false),
                setSpin(true),
                // Setup your coin spin animations here -- then have it spin once more

                setTimeout(function(){
                    coin.style.animation = "spin-heads-live 15s forwards";
                }, 100)
                // for the correct result.
            )
            let obj = receipt.events.find(o => o.args);
            setResult(obj.args)

            // receipt.events[0].args[0]?coinFlipResult=call:
            fetch('/games',{
                        method:'POST',
                        headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                       },
                       body: JSON.stringify({
                       user_id: user.id,
                       wagerAmount: wagerAmount,
                       call: call,
                       result: obj.args
                        })           
                   })
                   .then(r=>r.json())
                   .then(data=> {setGame(data);console.log(data)})
                    .then(navigate('/result'))
                   .catch(error=> {console.log(error)})
            // changed to navigate AFTER the post is made.
    }

    function flipCoin(e){ // Swap side of coin based on bet
        if(e.target.textContent==='Tails'){
            setTimeout(function(){
                coin.style.animation = "flip-tails 1s forwards";
            }, 100);
        }
        else {
            if(call !== 1){
                setTimeout(function(){
                    coin.style.animation = "flip-heads 1s forwards";
                }, 100);    
            }
        }
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
                {auth&&liveBet?<User spin={spin} user={user} game={game} wallet={wallet} funMode={funMode} liveBet={liveBet}/>:null}

                {spin && call?
                // Animation isnt perfect when betting tails - it still flashes heads for a MS.
                <div className="coin" id="coin">
                <div id="coinH" className="heads">
                    <img className="float-left justify-center lg h-42 w-auto"
                    src={coinB}
                    alt="Future Flip Tails"/>
                    </div>
                <div className="tails absolute justify-center"> 
                    <img className="float-left justify-center lg h-42 w-auto"
                    src={coinF}
                    alt="Future Flip Heads"/>
                    </div>
                </div>

                :
                    <div className="coin" id="coin">
                    <div id="coinH" className="heads"> 
                        <img className="float-left justify-center lg h-42 w-auto"
                        src={coinF}
                        alt="Future Flip Heads"/>
                        </div>

                        <div className="tails absolute justify-center ">
                        <img className="float-left justify-center lg h-42 w-auto"
                        src={coinB}
                        alt="Future Flip Tails"/>
                        </div>
                    </div>
                }
                    {/* Render the betting if result is empty. */}
                    {!spin&&auth&&!confirm&&liveBet?<Game funMode={funMode}error={error} flipCoin={flipCoin} setGame={setGame} wagerAmount={wagerAmount} setWagerAmount={setWagerAmount} call={call} setCall={setCall} handleClick={handleClick}></Game>:null}
                    {confirm?<Confirm funMode={funMode} user={user} wagerAmount={wagerAmount} call={call} setConfirm={setConfirm} handleGamble={handleGamble}/>:null}
                    {spin?<h3 className='font-header text-center mt-8 mb-4 text-2xl'>We're rooting for you...</h3>:null}
                    {auth?null:<button disabled={auth} onClick={handleLogin} id="login" className="mt-2 mb-2 px-4 py-2 border border-transparent text-l font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Select Wallet</button>}
                    {/* Below button begins the game */}
                    {!liveBet&&auth?<><button onClick={startGame} id='begin' className='mt-2 mb-2 px-4 py-2 border-4 border-indigo-500 text-4xl font-header hover:bg-indigo-700 hover:text-white shadow-sm'>Click to begin...</button>
                    <h3>compete in <button onClick={startGame} className="text-blue-500">Fun Mode</button></h3>
                    </>
                    :null}
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
                    {/* Adding a comment to fix. */}
                    {/*  You MAY NEED A SECOND ONE OF THESE to "Play double or nothing" and sign a one time nonce like DCF */}
                </div>
        </div>
        </>
        );
}export default Home
