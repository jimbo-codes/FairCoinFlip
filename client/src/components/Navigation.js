import { useNavigate, useLocation } from 'react-router-dom';

function Navigation({setStatView, setToggle, leaders, toggle}){
    const navigate = useNavigate(); // for programatic navigation
    // Make this a nav disclosure (?)

    let location = useLocation({toggle, setToggle});
    function handleToggle(){
        setToggle(!toggle);
      }
    // Potentially use this to show individual stats (bets, etc.)
    // function stats(){
    //     setStatView(true)
    //     navigate('/stats')
    // }

    // map over the User array depending on which toggle

    function leaders(){
        if(location.pathname==='/stats'){
            setStatView(false)
            navigate('/')        
        }else{
            setStatView(true)
            navigate('/stats')
        }
        }
    return(
        <div className="flex justify-center mt-6 flex-sm-column h-10 justify-content-start items-center align-items-center">
            <div className="mt-2">
                    {/* <button onClick={stats} className="mt-4 px-6 mx-4 py-2 border border-transparent text-l font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 outline-none">Statistics</button> */}
                    {location.pathname==='/stats'?
                    <>
                    <div className='flex align-baseline mt-2 p-2'>
                    <h1 className="inline-block flex items-center justify-center font-header mt-10 mb-2 text-xl">Double or Nothing.</h1>
                    <div>
                    <button onClick={leaders} className="flex mt-8 mb-2 px-4 mx-4 py-2 border border-transparent text-l font-medium rounded-md text-white bg-green-600 shadow-sm outline-none">Play Again</button>
                        <div className="float ml-1 mb-2">
                            <div className="bg-gray-200 text-xs text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
    
                                {toggle?<button onClick={handleToggle}className="inline-flex text-black-200 items-center ease-in focus:outline-none rounded-l-full px-1 py-2 " id="grid">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                <span>Balance</span>
                                </button>
    :
    <button onClick={handleToggle} className="bg-white text-blue-400 rounded-full inline-flex items-center focus:outline-none rounded-l-full px-1 py-2" id="grid">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span>Balance</span>
    </button>}

    {/* Fire emoji */}
    {toggle?
    <button onClick={handleToggle} className="bg-white text-blue-400 rounded-full inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-l-full px-1 py-2 active" id="grid">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
      </svg>
      <span>Streak</span>
    </button>
    :
    <button onClick={handleToggle}className="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-l-full px-1 py-2 active" id="grid">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
        </svg>  
      <span>Streak</span>
    </button>}
  </div>
  </div>
</div>

                    </div>
                    </>
                    :<button onClick={leaders} className="mt-4 px-4 mx-4 py-2 border border-transparent text-l font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 outline-none">Leaderboard</button>}
                    <button></button>
                </div>

            </div>
    );
}export default Navigation