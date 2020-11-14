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
function deleteSchedule(params) {
  console.log(params)
  if (window.confirm("Are you sure you want to delete this schedule?")) {
      console.log("yes")
       return Delete(params)
    }
    else{
        console.log("no")
    }

 }

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
