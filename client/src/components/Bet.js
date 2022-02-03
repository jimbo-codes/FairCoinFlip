import React from "react";

function Bet({handleClick, wagerAmount, setWagerAmount, bet, setBet, error}){

    // Whichever one of these is "true" is the bet.
    // on your final button press send the true one

    function betClick(e){
        if(e.target.textContent === 'Heads'){
            setBet(1);
        }else if(e.target.textContent ==='Tails'){
            setBet(2);
        }
        // setBet
        // you can condense this "heads and tails" click into a 0/1 like you did below. Could also be bool.
        // have a "set bet" single state, 0 = heads, 1 = tails.
    }

    function handleBet(e){

        switch(e.target.textContent){
            case '.01 ETH':
                setWagerAmount(0.01);
            break;
            case '.025 ETH':
                setWagerAmount(0.025);
            break;
            case '.05 ETH':
                setWagerAmount(0.05);
            break;
            case '.075 ETH':
                setWagerAmount(0.075);
            break;
            case '.1 ETH':
                setWagerAmount(0.1);
            break;
            case '.25 ETH':
                setWagerAmount(0.25);
            break;
            default:
                console.log("This should never occur")
        }
    }
    return(
        <>
        <h3 className='font-header text-center mt-2 mb-2 text-2xl'>It's gonna be:</h3>
        <div className="grid grid-cols-3 gap-6">
            {/* have onclick's for sending what is bet */}
            {/* I like the way this looks once its already been selected. */}
            {/* How to set it so the focus STAYS */}
            {bet===1?<button onClick={betClick} className="col-span-3 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-yellow-600">Heads</button>:<button onClick={betClick} className="col-start-2 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600">Heads</button>}
            {bet===2?<button onClick={betClick} className="col-span-3 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-500">Tails</button>:<button onClick={betClick} className="col-start-2 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600">Tails</button>}
    
    <h3 className='font-header col-span-3 text-center mb-2 text-2xl'>And I'm risking:</h3>
    
                        {/* You can make "ETH" the eth image instead? */}
        {wagerAmount===0.01?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.01 ETH</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.01 ETH</button>}
        {wagerAmount===0.025?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.025 ETH</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.025 ETH</button>}
        {wagerAmount===0.05?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.05 ETH</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.05 ETH</button>}
        {wagerAmount===0.075?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.075 ETH</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.075 ETH</button>}
        {wagerAmount===0.1?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.1 ETH</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.1 ETH</button>}
        {wagerAmount===0.25?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.25 ETH</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.25 ETH</button>}
    </div>
    {error?<h3 className='font-header text-center mt-4 text-2xl text-red-500'>{error}</h3>:<div className="mt-8 mb-4"/>}
    <button onClick={handleClick} className=" mt-0 px-16 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-pink-500 focus:bg-pink-700 focus:outline-none">Fire it up</button>
    </>
    )
}export default Bet


