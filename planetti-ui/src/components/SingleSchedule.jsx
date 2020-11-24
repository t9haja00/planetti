import React from "react";
import { Link } from "react-router-dom";
import { Card , Button } from "react-bootstrap";
import styles from "../assets/css/userpage.module.css";
 function SingleSchedule(props, deleteSchedule) {

    return(


        <Card style={{width:'10rm'}}> 
        <Card.Body
        className={styles.card_style}
        >
        <div key={props.schedule_id}>
        <Link
        to={`/view-schedule/${props.uuid}`}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <Card.Title>
        <h3 className={styles.truncated}>{props.title}</h3>
        </Card.Title>
        <p className={styles.truncated}>{props.description}</p>
        </Link>
        </div>
      
        <div className={styles.buttonBar}>
        <button
        className={"btn btn-danger"}
        onClick={() => {
          props.deleteSchedule(props.schedule_id);
        }}
      >
        Delete
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
      </div>
    
        </Card.Body>
        </Card>
    )

    }
export default SingleSchedule;
