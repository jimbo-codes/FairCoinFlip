import React,{useEffect, useState} from "react";
import StatTable from "./StatTable";

function Stats({user, leaders, setLeaders, toggle}){

  useEffect(() => {
      fetch(`/leaders`)
      .then(r=>r.json())
      .then(leaders=> {setLeaders(leaders)})
      .catch(error=> {console.log(error)})
    },[])

  if(toggle){ // sort array based on filter setting.
    leaders.sort((a,b) => (a.funStreak > b.funStreak) ? -1 : ((b.funStreak > a.funStreak) ? 1 : 0))
  }else if (!toggle){
    leaders.sort((a,b) => (a.funBal > b.funBal) ? -1 : ((b.funBal > a.funBal) ? 1 : 0))
  }

    return(
<>
<div className="flex flex-col">
  <div className="overflow-x-auto mt-10 sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-center">
          <thead className="border-b bg-gray-800">
            <tr>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                Rank
              </th>
              <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                User
              </th>
              {toggle?
                <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                Win Streak                  
              </th>:
              <th scope="col" className="text-sm font-medium text-white px-6 py-4">
              Balance              
            </th>}
            </tr>
          </thead>
          <tbody>
            {/* here you map over the array to render */}
            {leaders.map((user)=>
            // Setup a component instead
            <StatTable
            key={user.id}
            user={user}
            leaders={leaders}
            toggle={toggle}
            />            
            )}
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</>
    )

}export default Stats