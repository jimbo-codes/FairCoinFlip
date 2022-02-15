function User({user, spin, funMode, liveBet}){
    // We need to work on the sizing depending on screen res.
    // What should mobile flow look like. what info is displayed?
    // Probably JUST do balance, and put rest in statistics?
    
    // Conditional rounding to display appropriate number of decimals based on bal?
    let rounded
    funMode?rounded = Number(user.funBal).toFixed(3):rounded = Number(user.balance).toFixed(4)
return(
    <>
    {liveBet&&!spin?
    funMode?
    <div className="flex justify-center flex-sm-column justify-content-start items-center align-items-center">
        <p className="font-header text-center mx-4 text-xl">Balance: {rounded} FUN   </p>
        <p className="font-header text-center mx-9 text-xl">Win Streak: {user.funStreak}  </p>
    </div>:
    <div className="flex justify-center flex-sm-column justify-content-start items-center align-items-center">
        <p className="font-header text-center mx-4 text-xl">Balance: {rounded} ETH   </p>
        <p className="font-header text-center mx-9 text-xl">Win Streak: {user.winStreak}  </p>
    </div>:null}
    </>

)
}export default User