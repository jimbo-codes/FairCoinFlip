function Plays({game}){

    let userAbbrev = game.user.wallet.substring(0,4)
    let space = " "
    let date = Date.parse(game.updated_at);
    let currTime = Date.now();
    let seconds = (currTime-date)/1000;
    // Conditional to display seconds, minutes, hours, days
    let time;
    if(seconds<1){
        time = `Now`
    }else if(seconds<60 && seconds>1){
        time = `${parseInt(seconds)} seconds ago`
    }else if(seconds<3600 && seconds>=60){
        time = `${parseInt(seconds/60)} minutes ago`
    }else if(seconds<86400 && seconds>=3600){
        time = `${parseInt(seconds/3600)} hours ago`
    }else if(parseInt(seconds<604800)){
        time = `${seconds/86400} days ago`
    }
    let streak= game.userStreak
    return(
                 // Set conditional and conditional formatting for win/loss (and winstreak)
        <li className="flex relative px-1 text-xl text-center font-header border-x-2 border-t-2 divide-gray-200 text-gray-900">
            
            {/* Eventually can include a <a></a> tag around this to link player profile */}
            <div className="flex whitespace-nowrap py-2 text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 align-center justify-center align-middle m-auto w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
            {/* <div className={} */}
            {/* <div className="flex"> */}
            <div className="flex px-1 py-2 text-gray-900">Wallet ({userAbbrev}..) bet {game.wagerAmount} and
            {game.userWin?
                // HOW TO SET THE USER WINSTREAK at each discrete flip???
                streak>1? <span className="flex px-1.5 text-green-600"> doubled {streak} times!</span>:
                // <b className="text-green-700 mx-2"> </b>
                // User win case
                ` doubled!`:
                // User lose case
                <span className="flex px-1.5 text-red-600">lost everything.</span>
            }</div>
            </div>

            {/* </div> */}
            <div className="absolute text-sm right-0 bottom-0 mx-2 mt-2 text-grey-900">{time}</div>
        </li>
        
            
    );
        }export default Plays