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
    let curr='MATIC'
    if(funMode){
        curr='FUN'
    }
    function handleBet(e){
        switch(e.target.textContent){
            case `1.5 ${curr}`:
                setWagerAmount(1.5);
            break;
            case `15 ${curr}`:
                setWagerAmount(15);
            break;
            case `25 ${curr}`:
                setWagerAmount(25);
            break;
            case `50 ${curr}`:
                setWagerAmount(50);
            break;
            case `100 ${curr}`:
                setWagerAmount(100);
            break;
            case `250 ${curr}`:
                setWagerAmount(250);
            break;
            default:
                console.log("This should never occur. Congratulations.")
        }
    }
    return(
        <>
        <h3 className='font-header text-center mt-2 mb-2 text-2xl'>It's gonna be:</h3>
        <div className="grid grid-cols-3 gap-5">
            {call===false?<button onClick={betClick} className="butt col-span-3 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-yellow-600">Heads</button>:<button onClick={betClick} className="col-start-2 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600">Heads</button>}
            {call===true?<button onClick={betClick} className="butt col-span-3 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-500">Tails</button>:<button onClick={betClick} className="col-start-2 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600">Tails</button>}
    
    <h3 className='font-header col-span-3 text-center mb-2 text-2xl'>And I'm risking:</h3>
    
                        {/* You can make "ETH" the eth image instead? */}
        {wagerAmount===1.5?<button onClick={handleBet} className="butt px-3 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">1.5 {curr}</button>:<button onClick={handleBet} className="px-3 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">1.5 {curr}</button>}
        {wagerAmount===15?<button onClick={handleBet} className="butt px-2 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">15 {curr}</button>:<button onClick={handleBet} className="px-3 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">15 {curr}</button>}
        {wagerAmount===25?<button onClick={handleBet} className="butt px-3 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">25 {curr}</button>:<button onClick={handleBet} className="px-3 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">25 {curr}</button>}
        {wagerAmount===50?<button onClick={handleBet} className="butt px-3 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">50 {curr}</button>:<button onClick={handleBet} className="px-3 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">50 {curr}</button>}
        {wagerAmount===100?<button onClick={handleBet} className="butt px-3 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">100 {curr}</button>:<button onClick={handleBet} className="px-3 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">100 {curr}</button>}
        {wagerAmount===250?<button onClick={handleBet} className="butt px-3 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">250 {curr}</button>:<button onClick={handleBet} className="px-3 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">250 {curr}</button>}
    </div>
    {error?<h3 className='font-header text-center mt-4 text-2xl text-red-500'>{error}</h3>:<div className="mt-8 mb-4"/>}
    <button onClick={handleClick} className="butt2 mt-0 px-16 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-pink-500 focus:bg-pink-700 focus:outline-none">Fire it up</button>
    </>
    )
}export default Game


