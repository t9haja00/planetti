import React from "react";
import { Link } from "react-router-dom";
import { Card , Button } from "react-bootstrap";

 function SingleSchedule(props, deleteSchedule) {

    return(


        <Card style={{width:'10rm'}}> 
        <Card.Body>
        <div key={props.schedule_id}>
        <Link
        to={`/view-schedule/${props.uuid}`}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <Card.Title>
        <h2>{props.title}</h2>
        </Card.Title>
        <p>{props.description}</p>
        </Link>
        </div>

        <button
        className={"btn btn-danger"}
        onClick={() => {
          props.deleteSchedule(props.schedule_id);
        }}
      >
        DELETE
      </button>
      {/* edit button */}
      <button
      className={"btn"}
      style={{backgroundColor:"#05386B",color:"white"}}
        onClick={() => {
          props.editSchedule([
            props.schedule_id,
            props.title,
            props.description,
          ]);
        }}
      >
        Edit
      </button>

        </Card.Body>
        </Card>
    )

    }
export default SingleSchedule;
