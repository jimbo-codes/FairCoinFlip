import React,{useState,useEffect} from "react";
function Bet({handleClick, heads, tails, setHeads, setTails}){
    const [bet, setBet] = useState(0);


    // Whichever one of these is "true" is the bet.
    // on your final button press send the true one

    function headsClick(){
        // you can condense this "heads and tails" click into a 0/1 like you did below. Could also be bool.
        if(tails){
            setTails(!tails)
            setHeads(!heads)
        }else{
            setHeads(true);
        }
    }
    function tailsClick(){
        if(heads){
            setHeads(!heads)
            setTails(!tails)    
        }else{
            setTails(true);
        }
    }

    function handleBet(e){
        switch(e.target.textContent){
            case '.01 ETH':
                setBet(1);
            break;
            case '.025 ETH':
                setBet(2);
            break;
            case '.05 ETH':
                setBet(3);
            break;
            case '.075 ETH':
                setBet(4);
            break;
            case '.1 ETH':
                setBet(5);
            break;
            case '.25 ETH':
                setBet(6);
            break;
        }
    }
    return(
        <>
        <h3 className='font-header text-center mt-8 mb-2 text-2xl'>It's gonna be:</h3>
        <div className="grid grid-cols-3 gap-6">
            {/* have onclick's for sending what is bet */}
            {/* I like the way this looks once its already been selected. */}
            {/* How to set it so the focus STAYS */}
            {heads?<button onClick={headsClick} className="col-span-3 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-yellow-600">Heads</button>:<button onClick={headsClick} className="col-start-2 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600">Heads</button>}
            {tails?<button onClick={tailsClick} className="col-span-3 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-500">Tails</button>:<button onClick={tailsClick} className="col-start-2 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600">Tails</button>}
    
    <h3 className='font-header col-span-3 text-center mb-2 text-2xl'>And I'm risking:</h3>
    
                        {/* You can make "ETH" the eth image instead? */}
        {bet===1?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.01 ETH</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.01 ETH</button>}
        {bet===2?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.025 ETH</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.025 ETH</button>}
        {bet===3?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.05 ETH</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.05 ETH</button>}
        {bet===4?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.075 ETH</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.075 ETH</button>}
        {bet===5?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.1 ETH</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.1 ETH</button>}
        {bet===6?<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-indigo-700 outline-none ring-2 ring-offset-2 ring-red-400">.25 ETH</button>:<button onClick={handleBet} className="px-4 py-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">.25 ETH</button>}
    </div>
    
    <button onClick={handleClick} className="mt-12 px-16 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-pink-500 focus:bg-pink-700 focus:outline-none">Fire it up</button>
    </>
    )
}export default Bet


