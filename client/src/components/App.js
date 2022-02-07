import Home from './Home'
import { Routes, Route } from "react-router-dom";
import React,{useState,useEffect} from "react";
import Result from './Result';
import Navigation from './Navigation'
import User from './User'

function App() {

// Some type of wristbanding -- how does this get implemented w/ web3?
  // useEffect(() => {
  //   fetch("/me").then((response) => {
  //     if (response.ok) {
  //       response.json().then((user) => {setUser(user);console.log(user);setAuth(true)});
  //     }
  //   });
  // }, []);

  const [auth, setAuth] = useState(false);
  const [wallet, setWallet] = useState('');
  const [user, setUser] = useState({});
  const [game, setGame] = useState({});
  // Temporary setting for getting wallet squared.
  // For now (testing) this is set to true, but it should be set to false by default (obviously)
  const [outcome, setOutcome] = useState('');
  const [result, setResult] = useState('');
  const [confirm, setConfirm] = useState(false);
  // Sets the heads or tails call
  const [call, setCall] = useState(0);
  // Set how much is being wagered
  const [wagerAmount, setWagerAmount] = useState(0);
  
  // Attempted fixes for CSRF Token (Required to make non-fetch requests)
  // const [csrfToken, setcsrfTokenState] = useState('');
  // const thing = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  //  let thing = document.head.querySelector("[name='csrf-token']").content
  // console.log(thing);
  // const token = document.querySelector('[name="csrf-token"]') || {content: 'no-csrf-token'}
  // console.log(token);

  useEffect(() => {
    // Have this wallet set from your metamask portion.
  setWallet('jimString');

  // This will eventually be wristbanding. for now using it to pull in games array.
  // Use this to pull in the user info, changing each game.
    fetch(`/me/${wallet}`)
    .then(r=>r.json())
    .then(userData=> {setUser(userData)})
    .catch(error=> {console.log(error)})
  },[game])

  return (
    <div> 
      <div className='top-0'>
        <Navigation />      
        {/* This lower div does nothin' since not sticky */}
          <div className='z-50'>
          </div>
      </div>

      <Routes>
        <Route path='result/' element={<Result user={user} setUser={setUser} game={game} setGame={setGame} outcome={outcome} setOutcome={setOutcome} result={result} setResult={setResult} call={call} setCall={setCall} wagerAmount={wagerAmount} setWagerAmount={setWagerAmount} setConfirm={setConfirm}/>}/>

        <Route path='/' element={<Home 
        user={user}
        game={game}
        setGame={setGame}
        user={user}
        setUser={setUser}
        setAuth={setAuth}
        wallet={wallet}
        setWallet={setWallet}
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
