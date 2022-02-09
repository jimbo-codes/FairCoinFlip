function User({user, liveBet}){
    // We need to work on the sizing depending on screen res.
    // What should mobile flow look like. what info is displayed?
    // I don't like how this is displayed right now.
    // Probably JUST do balance, and put rest in statistics?
return(
    <>
    {liveBet?<div className="flex justify-center flex-sm-column justify-content-start items-center align-items-center">
        <p className="font-header text-center mx-4 text-xl">Balance: {user.balance} ETH   </p>
        <p className="font-header text-center mx-9 text-xl">Win Streak: {user.winStreak}  </p>
    </div>:null}
    </>

)
}export default User