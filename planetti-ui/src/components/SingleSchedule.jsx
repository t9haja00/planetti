import React from "react";

function SingleSchedule(props, deleteSchedule, editSchedule) {
  return (
    <div key={props.schedule_id}>
      <li> schedule ID: {props.schedule_id}</li>
      <li> Schedule UUID: {props.uuid}</li>
      <li> Title: {props.title}</li>
      <li> Description: {props.description}</li>
      <li> creation time: {props.create_time}</li>
      <li> user ID: {props.user_id}</li>
      {/* Saves the id of the schedule as value of button when delete button is
         pressed then activates the delete function with schudele id as value */}
      <button
        onClick={() => {
          props.deleteSchedule(props.schedule_id);
        }}
      >
        DELETE
      </button>
      {/* edit button */}
      <button
        onClick={() => {
          props.editSchedule([
            props.schedule_id,
            props.title,
            props.description,
          ]);
        }}
      >
        EDIT
      </button>
    </div>
  );
}
export default SingleSchedule;
