function StatTable({user, leaders, toggle}){
    // Truncate the wallet id:
    let userAbbrev = user.wallet.substring(0,4)
    let userEnd = user.wallet.substring(38,42)
    return(
        <tr className="bg-white border-b">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{leaders.indexOf(user)+1}</td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {`${userAbbrev}...${userEnd}`}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {toggle?user.funStreak:user.funBal}
        </td>
      </tr>

    )
}export default StatTable