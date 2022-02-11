import Home from './Home'
import { Routes, Route } from "react-router-dom";
import React,{useState,useEffect} from "react";
import Result from './Result';
import Navigation from './Navigation'

function App() {
// Some type of wristbanding -- how does this get implemented w/ web3?
  // useEffect(() => {
  //   fetch("/me").then((response) => {
  //     if (response.ok) {
  //       response.json().then((user) => {setUser(user);console.log(user);setAuth(true)});
  //     }
  //   });
  // }, []);

  // For now (testing) this is set to true, but it should be set to false by default (obviously)
  const [auth, setAuth] = useState(false);
  const [wallet, setWallet] = useState(''); // Wallet object to set on metamask login
  const [balance, setBalance] = useState(0); // User balanace to set on metamask login
  const [user, setUser] = useState({}); // user object to be set after either creation or fetch
  const [game, setGame] = useState({}); // Current game state obj (updated with results as they occur)
  const [recentGames, setRecentGames] = useState({}); // Fetch for the array of games to display on homepage
  const [outcome, setOutcome] = useState(''); // what side of the coin was landed on
  const [result, setResult] = useState(''); // result object (?)
  const [confirm, setConfirm] = useState(false); // If we display intermediate confirm screen
  const [call, setCall] = useState(0); // if player calls heads or tails (0=heads, 1 = tails)
  const [wagerAmount, setWagerAmount] = useState(0); // amount player is betting
  const [liveBet, setLiveBet] = useState(false); // variable to go from logged -> playing
  const [funMode, setFunMode] = useState(false); // play with fake money.

  // Attempted fixes for CSRF Token (Required to make non-fetch requests)
  // const [csrfToken, setcsrfTokenState] = useState('');
  // const thing = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  //  let thing = document.head.querySelector("[name='csrf-token']").content
  // console.log(thing);
  // const token = document.querySelector('[name="csrf-token"]') || {content: 'no-csrf-token'}
  // console.log(token);

  useEffect(() => {

  // This will eventually be wristbanding. for now using it to pull in games array.
  // Have the fetch NOT check if its a checksum'd ETH address. (downcase it)
    fetch(`/games`)
    .then(r=>r.json())
    .then(games=> {console.log(games);setRecentGames(games)})
    .catch(error=> {console.log(error)})
  },[game])

  return (
    <div> 
      <div className='top-0'>
        <Navigation />      
      </div>

      <Routes>
        <Route path='result/' element={<Result user={user} setUser={setUser} funMode={funMode} game={game} setGame={setGame} outcome={outcome} setOutcome={setOutcome} result={result} setResult={setResult} call={call} setCall={setCall} wagerAmount={wagerAmount} setWagerAmount={setWagerAmount} setConfirm={setConfirm}/>}/>

        <Route path='/' element={<Home
        recentGames={recentGames}
        user={user}
        game={game}
        setGame={setGame}
        funMode={funMode}
        setFunMode={setFunMode}
        user={user}
        setUser={setUser}
        setAuth={setAuth}
        wallet={wallet}
        setWallet={setWallet}
        liveBet={liveBet}
        setLiveBet={setLiveBet}
        // csrfToken={csrfToken}
        confirm={confirm}
        setConfirm={setConfirm}
        setWagerAmount={setWagerAmount}
        wagerAmount={wagerAmount}
        setResult={setResult} 
        setCall={setCall}
        call={call}
        auth={auth}
        setOutcome={setOutcome}
        result={result}
        outcome={outcome}/>}/>

        {/* Create a statistics page */}
      </Routes>
    </div>
  );
}

export default App;
