function Navigation(){
    // Make this a nav disclosure (?)
    return(
        <div className="flex justify-center flex-sm-column h-10 justify-content-start items-center align-items-center">
            <div className="mt-2 d-flex flex-column shortcut-row">
                <div className="mt-2 d-flex flex-row mb-2 toolbar">
                    <button className="mt-4 px-6 mx-4 py-2 border border-transparent text-l font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 outline-none">Statistics</button>
                    <button className="mt-4 px-4 mx-4 py-2 border border-transparent text-l font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 outline-none">Leaderboard</button>
                    <button></button>
                    {/* Put a USER icon thing (to set a username) */}
                    {/* Make sure this is responsive so if you resize and make it big it'll place approrpiately */}
                </div>

            </div>
        </div>
    );
}export default Navigation