import Home from './Home'
import { Routes, Route, Link } from "react-router-dom";
import React,{useState,useEffect} from "react";
import Flipped from './Flipped';


// Have a "wristbanding get" that runs here to see if they are connected.

function App() {
  const [logged, setLog] = useState(true);
  // For now (testing) this is set to true, but it should be set to false by default (obviously)
  const [outcome, setOutcome] = useState('');
  const [result, setResult] = useState('');
  const [confirm, setConfirm] = useState(false);
  // Sets the heads or tails bet
  const [bet, setBet] = useState(0);
  // Set how much is being wagered
  const [wagerAmount, setWagerAmount] = useState(0);


  return (
    <div> 
      {/* Setup router (home, result) */}
      <Routes>
        <Route path='result/' element={<Flipped outcome={outcome} setOutcome={setOutcome} result={result} setResult={setResult} bet={bet} setBet={setBet} wagerAmount={wagerAmount} setWagerAmount={setWagerAmount} setConfirm={setConfirm}/>}/>

        <Route path='/' element={<Home 
        confirm={confirm}
        setConfirm={setConfirm}
        setWagerAmount={setWagerAmount}
        wagerAmount={wagerAmount}
        setResult={setResult} 
        setBet={setBet}
        bet={bet}
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
