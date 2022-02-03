import Home from './Home'
import { Routes, Route, Link } from "react-router-dom";
import React,{useState,useEffect} from "react";
import Result from './Result';


// Have a "wristbanding get" that runs here to see if they are connected.


// Set the heads or tails 

function App() {
  const [logged, setLog] = useState(true);
  // For now (testing) this is set to true, but it should be set to false by default (obviously)
  const [outcome, setOutcome] = useState('');
  const [result, setResult] = useState('');
  const [confirm, setConfirm] = useState(false);
  // Sets the heads or tails call
  const [call, setCall] = useState(0);
  // Set how much is being wagered
  const [wagerAmount, setWagerAmount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/users')
    .then(r=>r.json())
    // Here you should have a "checker" to see time vs. last update, if the curr time is >
    // Then run a patch to update the Price, volume and supply
    .then(data=> {console.log(data)})
    .catch(error=> {console.log(error)})
  },[])

  return (
    <div> 
      {/* Setup router (home, result) */}
      <Routes>
        <Route path='result/' element={<Result outcome={outcome} setOutcome={setOutcome} result={result} setResult={setResult} call={call} setCall={setCall} wagerAmount={wagerAmount} setWagerAmount={setWagerAmount} setConfirm={setConfirm}/>}/>

        <Route path='/' element={<Home 
        confirm={confirm}
        setConfirm={setConfirm}
        setWagerAmount={setWagerAmount}
        wagerAmount={wagerAmount}
        setResult={setResult} 
        setCall={setCall}
        call={call}
        logged={logged}
        setOutcome={setOutcome}
        result={result}
        outcome={outcome}/>}/>

        {/* Create a statistics page */}
      </Routes>
    </div>
  );
}

export default App;
