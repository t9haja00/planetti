import React from "react";
import { Card , Button } from "react-bootstrap";

 function SingleSchedule(props, deleteSchedule) {

    return(
        <Card style={{width:'10rm'}}> 
        <Card.Body>
        <div key={props.schedule_id}>
        <Card.Title>
        <h2>{props.title}</h2>
        </Card.Title>
        <p>{props.description}</p>
        {/* <li>{props.schedule_id}</li>
        <li>{props.uuid}</li>
        <li>{props.create_time}</li>
        <li>{props.user_id}</li> */}
        {/* Saves the id of the schedule as value of button when delete button is
         pressed then activates the delete function with schudele id as value */}
        <button
        className={"btn btn-danger"}
         onClick={()=>{props.deleteSchedule(props.schedule_id)}}>Delete</button>
        </div>
        </Card.Body>
        </Card>
    )
}
export default SingleSchedule;