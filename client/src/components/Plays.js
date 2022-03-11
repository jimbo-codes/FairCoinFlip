function Plays({game}){
    // to make this table work for fun mode -- just pull fungames and set to funuser blah blah.
    let userAbbrev = game.user.wallet.substring(0,4)
    let date = Date.parse(game.updated_at);
    let currTime = Date.now();
    let seconds = (currTime-date)/1000;
    let time;

        if(seconds<1){
            time = `Now`
        }else if(seconds<60 && seconds>1){
            seconds>=2?time = `${parseInt(seconds)} seconds ago`:time = `${parseInt(seconds)} second ago`
        }else if(seconds<3600 && seconds>=60){
               seconds>=120?time = `${parseInt(seconds/60)} minutes ago`:time = `${parseInt(seconds/60)} minute ago`
        }else if(seconds<86400 && seconds>=3600){
            seconds>=7200?time = `${parseInt(seconds/3600)} hours ago`:time = `${parseInt(seconds/3600)} hour ago`
        }else if(seconds<604800){ // this is # of seconds in a week.
            seconds<172800?time = `${parseInt(seconds/86400)} day ago`:time = `${parseInt(seconds/86400)} days ago`
        }
    let streak= game.userStreak
    return(
        // USE LIGHT / DARKMODE TO SET THE THEME DEPENDING WHICH MODE YOU'RE IN.
        // also setup app.js wristbanding for localstorage of theme state
        <li id="table" className="flex relative px-1 text-xl text-center font-header border-x-2 border-t-2">
            
            {/* Eventually can include a <a></a> tag around this to link player profile */}
            <div className="flex whitespace-nowrap py-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 align-center justify-center align-middle m-auto w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
            <div className="flex px-1 py-2">Wallet ({userAbbrev}..) bet {game.wagerAmount} and
            {game.userWin?
                streak>1? <span className="flex px-1.5 text-green-600"> doubled {streak} times!</span>:
                // User win case
                ` doubled!`:
                // User lose case
                <span className="flex px-1.5 text-red-600">lost everything.</span>
            }</div>
            </div>
            <div className="absolute text-sm right-0 bottom-0 mx-2 mt-2 text-grey-900">{time}</div>
        </li>
        
            
    );
        }export default Plays