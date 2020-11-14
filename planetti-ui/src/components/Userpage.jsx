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
  const[updateCount , upDateCount] =useState(1);
  const [schedules, setSchedules] = useState( [] )

  const routeChange = () =>{ 
    let path = `/Add_schedule`; 
    history.push(path);
  }
   
useEffect( async () => {
        console.log('render');
        const id = localStorage.getItem('userId');
        const {data}  = await getSchedules(id)
        setSchedules(data)
          }, [updateCount])

     console.log(schedules)

     function deleteSchedule(params) {
      const test= {
        params,
        upDateCount,
        val :updateCount
      }
      console.log(test);
        if (window.confirm("Are you sure you want to delete this schedule?")) {
          console.log("yes")
           return  Delete(test);
                             }
        else{
            console.log("no")
        }
    
     }
     console.log(updateCount)
  

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
