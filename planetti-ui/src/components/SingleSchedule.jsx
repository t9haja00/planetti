import React from "react";

import {Delete} from '../components/common/Delete' 

 function SingleSchedule(props) {
    
    return(
        <div key={props.schedule_id}>
        <li>{props.schedule_id}</li>
        <li>{props.uuid}</li>
        <li>{props.title}</li>
        <li>{props.description}</li>
        <li>{props.create_time}</li>
        <li>{props.user_id}</li>
        {/* Saves the id of the schedule as value of button when delete button is
         pressed then activates the delete function with schudele id as value */}
        <button
         value={props.schedule_id}
        onClick={e=>
            window.confirm("Are you sure you want to delete the schedule?") &&
            Delete(e.target.value)}
        ></button>
        </div>
    )
}
export default SingleSchedule;