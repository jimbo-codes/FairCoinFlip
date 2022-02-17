function Confirm({wagerAmount, funMode, call, user, setConfirm, handleGamble}){
    let headsName;
    if(!!call){
        headsName = 'Tails'
    }else if(call !== null){
        headsName = 'Heads'
    }

    return(
        // CONFIRM THAT THIS 
        // Put a dollar conversion in this message - get ETH snapshot data
        <>
        {funMode?
        user.funBal>wagerAmount?
        // you can make this fun mode bet, show confirm
        <> 
        <h3 className='font-header text-center mt-2 mb-4 text-2xl'>You're about to bet <b><u>{wagerAmount} FUN</u></b>  on <b><u>{headsName}</u></b></h3>
        <div className="grid">
        <button onClick={handleGamble} id="gamble"className="mt-4 mb-4 px-16 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-green-500 focus:bg-pink-700 focus:outline-none">Yep, it's a lock.</button>
        <button onClick={()=>setConfirm(false)} className="mt-6 align-text-top px-16 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-red-600 shadow-sm hover:bg-red-500 focus:bg-pink-700 focus:outline-none">I changed my Mind</button>
        </div>
    </>
        : // case for if you cannot afford fun mode bet
        <> 
        <h3 className='font-header text-center mt-2 mb-4 text-2xl'>Your current balance is <b><u>{user.balance} MATIC</u></b>. You're trying to bet <b><u>{wagerAmount} MATIC</u></b></h3>
        <div className="grid">
        <button onClick={()=>setConfirm(false)} className="mt-6 align-text-top px-16 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-red-600 shadow-sm hover:bg-red-500 focus:bg-pink-700 focus:outline-none">Let me fix that...</button>
        </div> </>
        // This is for if NOT in fun mode.
    :user.balance>wagerAmount?<> 
        <h3 className='font-header text-center mt-2 mb-4 text-2xl'>You're about to bet <b><u>{wagerAmount} MATIC</u></b>  on <b><u>{headsName}</u></b></h3>
        <div className="grid">
        <button onClick={handleGamble} id="gamble"className="mt-4 mb-4 px-16 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-green-500 focus:bg-pink-700 focus:outline-none">Yep, it's a lock.</button>
        <button onClick={()=>setConfirm(false)} className="mt-6 align-text-top px-16 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-red-600 shadow-sm hover:bg-red-500 focus:bg-pink-700 focus:outline-none">I changed my Mind</button>
        </div>
    </>:
        <> 
        <h3 className='font-header text-center mt-2 mb-4 text-2xl'>Your current balance is <b><u>{user.balance} ETH</u></b>. You're trying to bet <b><u>{wagerAmount} ETH</u></b></h3>
        <div className="grid">
        <button onClick={()=>setConfirm(false)} className="mt-6 align-text-top px-16 h-12 border border-transparent text-xl font-medium rounded-md text-white bg-red-600 shadow-sm hover:bg-red-500 focus:bg-pink-700 focus:outline-none">Let me fix that...</button>
        </div> </>}

        </>
    );
}export default Confirm