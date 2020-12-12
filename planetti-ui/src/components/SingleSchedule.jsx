import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import styles from "../assets/css/userpage.module.css";

function SingleSchedule(props) {
  return (
    <div className={styles.grid_item}>
      <Card style={{ width: "100%", height:"100%",  backgroundColor: props.schedule_color }}>
        <Card.Body
          className={styles.card_style}
        >
          <div key={props.schedule_id}>
            <Link
              to={`/view-schedule/${props.uuid}`}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Card.Title>
                <h4 className={styles.truncated_title}>{props.title}</h4>
              </Card.Title>
              <p className={styles.truncated_paragraph}>{props.description}</p>
            </Link>
          </div>
          <hr></hr>
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
              style={{ backgroundColor: "#05386B", color: "white" }}
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
    </div>
  );
}
export default SingleSchedule;
