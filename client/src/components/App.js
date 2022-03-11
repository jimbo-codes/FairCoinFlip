import Home from './Home'
import { Routes, Route } from "react-router-dom";
import React,{useState,useEffect} from "react";
import Result from './Result';
import Navigation from './Navigation'
import Stats from './Stats';
// RUN npm i use-local-storage
// import useLocalStorage from 'use-local-storage';

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
  const [statView, setStatView] = useState(false); // to change nav bar when in stats
  const [toggle, setToggle] = useState(false);
  const [leaders, setLeaders] = useState([]);
  const [toke, setToke] = useState('');

// darkmode
const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const [theme, setTheme] = useState('dark')
// useLocalStorage('theme', defaultDark ? 'dark' : 'light');
const switchTheme = () => {
  // Here -> Store this in state so its remembered for user when you go to site.
  const newTheme = theme === 'light' ? 'dark':'light';
  setTheme(newTheme);
}

  useEffect(() => {
  // Have the fetch NOT check if its a checksum'd ETH address. (downcase it)
    fetch(`/games`)
    .then(r=>r.json())
    .then(games=> {setRecentGames(games)})
    .catch(error=> {console.log(error)})
  },[game])
  function startGame(e){
    if(e.target.textContent==="Fun Mode"){
        setFunMode(true);
    }else{setFunMode(false)}
    setLiveBet(true)

    if(user.balance){
        fetch(`/users/${wallet}`,{
            method:'PATCH',
            headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               balance: user.balance,
            //    Used to have to_f issues with balance being sent like this. check if still the case.
                wallet: wallet})
        })
        .then(r=>r.json())
        .then(userData=>setUser(userData))
        .catch(error=> {console.log(error)})

    }else
    fetch(`/users/${wallet}`,{
                method:'PATCH',
                headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                   balance: user,
                //    I don't like the way the balance is sent here.
                    wallet: wallet})
            })
            .then(r=>r.json())
            .then(userData=>setUser(userData))
            .catch(error=> {console.log(error)})
    // You should sign the one time nonce here (for tx logging so you know who initiated a flip)
        // commit + reveal method (w/ nonce, etc.)
    // The fetch to your database to log user information (comment out the patch to update the balance for now)
    // fire the fetch to your DB, if user exists continue, otherwise create.
}
  return (
    <div className='App' data-theme={theme}> 
      {/* <div className='top-0'> */}
        <Navigation toggle={toggle} switchTheme={switchTheme} setToggle={setToggle} leaders={leaders} setStatView={setStatView}/>
      {/* </div> */}

      <Routes>
        <Route path='/stats/' element={<Stats leaders={leaders} setLeaders={setLeaders} toggle={toggle} setToggle={setToggle} user={user}></Stats>}/>
        <Route path='result/' element={<Result user={user} call={call} startGame={startGame} wallet={wallet} setWallet={setWallet} setLiveBet={setLiveBet} setUser={setUser} funMode={funMode} game={game} setGame={setGame} outcome={outcome} setOutcome={setOutcome} result={result} setResult={setResult} call={call} setCall={setCall} wagerAmount={wagerAmount} setWagerAmount={setWagerAmount} setConfirm={setConfirm}/>}/>
        <Route path='/' element={<Home
        recentGames={recentGames}
        user={user}
        startGame={startGame}
        game={game}
        toke={toke}
        setToke={setToke}
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
