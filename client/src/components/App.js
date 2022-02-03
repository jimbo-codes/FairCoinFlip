import Home from './Home'
import { Routes, Route, Link } from "react-router-dom";
import React,{useState,useEffect} from "react";
import Result from './Result';

// Have a "wristbanding get" that runs here to see if they are connected.


// Set the heads or tails 

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
  setWallet('jimString');

    fetch('/users')
                  // for some reason you NEEDED to return this here
    .then(response=>{return response.json()})
    // Here you should have a "checker" to see time vs. last update, if the curr time is >
    // Then run a patch to update the Price, volume and supply
    .then(data=> {console.log(data)})
    .catch(error=> {console.log(error)})
  },[])

  // ',{
  //   method:'POST',
  //   headers: {
  //    'Accept': 'application/json',
  //    'Content-Type': 'application/json',
  //    'xsrf-token': csrfToken
  //  },

  return (
    <div> 
      {/* Setup router (home, result) */}
      <Routes>
        <Route path='result/' element={<Result outcome={outcome} setOutcome={setOutcome} result={result} setResult={setResult} call={call} setCall={setCall} wagerAmount={wagerAmount} setWagerAmount={setWagerAmount} setConfirm={setConfirm}/>}/>

        <Route path='/' element={<Home 
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
