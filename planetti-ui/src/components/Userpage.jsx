/* Packages
------------*/
import React, { useEffect, useState } from 'react';
/* Components
--------------*/
import { getSchedules } from '../services/scheduleService';
import SingleSchedule from './SingleSchedule';
import { useHistory } from "react-router-dom";


/* Styles
----------*/
  

const Userpage = () => {
    //Using the dom history to push the path
  const history = useHistory();
  const routeChange = () =>{ 
    let path = `/Add_schedule`; 
    history.push(path);
  }
    const [schedules, setSchedules] = useState(
    [
        ({schedule_id :"1",
        uuid:"2",
        title:"3",
        description:"4",
        create_time:"5",
        user_id:"6",})
    ]
        )

    // useEffect( async () => {
    //     const user_id = localStorage.getItem('userId');
    //     const {data} =this.schedules;
    //     const {data:test}  = await getSchedules(user_id);
    //     setSchedules(test)
    //       }, [])
 
    console.log(schedules)

    return(
        <div>
            {schedules.map(single => (
            <SingleSchedule key ={single.schedule_id}{...single}/>
            ))
            }
            <div>
                <button onClick= {routeChange}>
                Add new schedule
                </button>
             </div>
           </div>
            )       
}

export default  Userpage;
