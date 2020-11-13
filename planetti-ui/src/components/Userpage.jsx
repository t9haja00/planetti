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
    const [schedules, setSchedules] = useState( [] )
    
     

    useEffect( async () => {
        const id = localStorage.getItem('userId');
        const {data}  = await getSchedules(id)
        setSchedules(data)
          }, [])

     console.log(schedules)

    function deleteSchedule(params) {
      console.log(params)
    }

    return(
        <div>
            {schedules.map(single => (
            <SingleSchedule deleteSchedule={deleteSchedule} key ={single.schedule_id}{...single}/>
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
