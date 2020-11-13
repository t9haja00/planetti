/* Packages
------------*/
import React, { useEffect, useState } from 'react';
/* Components
--------------*/
import { getSchedules } from '../services/scheduleService';
import SingleSchedule from './SingleSchedule';


/* Styles
----------*/
  

const Userpage = () => {

    const [schedules, setSchedules] = useState(
        ({schedule_id :"1",
        uuid:"1",
        title:"1",
        description:"1",
        create_time:"1",
        user_id:"1",}))

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
                <button href ="/Add_schedule">
                Add schedule
                </button>
            </div>
           </div>
            )       
}

export default  Userpage;
