import React from "react";

function Game({handleClick, flipCoin, funMode, wagerAmount, setWagerAmount, call, setCall, error}){
    
    function betClick(e){
        if(e.target.textContent === 'Heads'){
            if(call===0){
                setCall(false)
            }else{
                setCall(false);
                flipCoin(e)
            }
        }else if(e.target.textContent ==='Tails'){
            setCall(true);
            flipCoin(e)
        }
    }
    let curr='ETH'
    if(funMode){
        curr='FUN'
    }
    function handleBet(e){
        switch(e.target.textContent){
            case `.01 ${curr}`:
                setWagerAmount(0.01);
            break;
            case `.025 ${curr}`:
                setWagerAmount(0.025);
            break;
            case `.05 ${curr}`:
                setWagerAmount(0.05);
            break;
            case `.075 ${curr}`:
                setWagerAmount(0.075);
            break;
            case `.1 ${curr}`:
                setWagerAmount(0.1);
            break;
            case `.25 ${curr}`:
                setWagerAmount(0.25);
            break;
            default:
                console.log("This should never occur. Congratulations.")
        }
    }
    return(
        <>
        <h3 className='font-header text-center mt-2 mb-2 text-2xl'>It's gonna be:</h3>
        <div className="grid grid-cols-3 gap-5">
            {call===false?<button onClick={betClick} className="col-span-3 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-yellow-600">Heads</button>:<button onClick={betClick} className="col-start-2 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600">Heads</button>}
            {call===true?<button onClick={betClick} className="col-span-3 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-500">Tails</button>:<button onClick={betClick} className="col-start-2 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600">Tails</button>}
    
    <h3 className='font-header col-span-3 text-center mb-2 text-2xl'>And I'm risking:</h3>
    
                        {/* You can make "ETH" the eth image instead? */}
        {wagerAmount===0.01?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.01 {curr}</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.01 {curr}</button>}
        {wagerAmount===0.025?<button onClick={handleBet} className="px-3 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.025 {curr}</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.025 {curr}</button>}
        {wagerAmount===0.05?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.05 {curr}</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.05 {curr}</button>}
        {wagerAmount===0.075?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.075 {curr}</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.075 {curr}</button>}
        {wagerAmount===0.1?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.1 {curr}</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.1 {curr}</button>}
        {wagerAmount===0.25?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.25 {curr}</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.25 {curr}</button>}
    </div>
    {error?<h3 className='font-header text-center mt-4 text-2xl text-red-500'>{error}</h3>:<div className="mt-8 mb-4"/>}
    <button onClick={handleClick} className=" mt-0 px-16 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-pink-500 focus:bg-pink-700 focus:outline-none">Fire it up</button>
    </>
    )
}export default Game


