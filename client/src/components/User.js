import { useEffect } from "react"

function User({user, spin, game, funMode, wallet, liveBet}){
    // We need to work on the sizing depending on screen res.
    // What should mobile flow look like. what info is displayed?
    // Probably JUST do balance, and put rest in statistics?

    // Here: the user should be updated at the end of each game.
    // useEffect(()=>{
    //     fetch(`/users/${wallet}`,{
    //         method:'PATCH',
    //         headers: {
    //          'Accept': 'application/json',
    //          'Content-Type': 'application/json',
    //        },
    //        body: JSON.stringify({
    //            balance: user,
    //             wallet: wallet})
    //     })
    //     .then(r=>r.json())
    //     .then(data=>console.log(data))
    //     .catch(error=> {console.log(error)})
    // },[game,liveBet])
    // Conditional rounding to display appropriate number of decimals based on bal?
    let rounded
    funMode?rounded = Number(user.funBal).toFixed(3):rounded = Number(user.balance).toFixed(2)
return(
    <>
    {liveBet&&!spin?
    funMode?
    <div className="flex justify-center flex-sm-column justify-content-start items-center align-items-center">
        <p className="font-header text-center mx-4 text-xl">Balance: {rounded} FUN   </p>
        <p className="font-header text-center mx-9 text-xl">Win Streak: {user.funStreak}  </p>
    </div>:
    <div className="flex justify-center flex-sm-column justify-content-start items-center align-items-center">
        <p className="font-header text-center mx-4 text-xl">Balance: {rounded} MATIC   </p>
        <p className="font-header text-center mx-9 text-xl">Win Streak: {user.winStreak}  </p>
    </div>:null}
    </>

)
}export default User