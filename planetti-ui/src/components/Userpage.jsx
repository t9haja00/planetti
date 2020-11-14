/* Packages
------------*/
import React, { useEffect, useState } from 'react';
/* Components
--------------*/
import { getSchedules } from '../services/scheduleService';
import SingleSchedule from './SingleSchedule';
import { useHistory } from "react-router-dom";
import {Delete} from '../components/common/Delete';

/* Styles
----------*/


const Userpage = () => {
    //Using the dom history to push the path
  const history = useHistory();
  const[ renderCount, updateRenderCount] =useState(1);
  const [schedules, setSchedules] = useState( [] )

  const routeChange = () =>{ 
    let path = `/Add_schedule`; 
    history.push(path);
  }
   
useEffect( async () => {
        console.log(' inside the Use effect ');
        const id = localStorage.getItem('userId');
        const {data}  = await getSchedules(id)
        setSchedules(data)
          }, [renderCount])

    //  console.log(schedules)

     function deleteSchedule(params) {
      const test= {
        params,
        updateRenderCount,
        val :renderCount
      }
        if (window.confirm("Are you sure you want to delete this schedule?")) {
          console.log("yes delete")
           return  Delete(test);
                             }
        else{
            console.log("no")
        }
    
     }
     console.log(renderCount+ " = render count value")
  

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
