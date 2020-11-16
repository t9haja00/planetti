/* Packages
------------*/
import React, { useEffect, useState } from "react";
/* Components
--------------*/
import { getSchedules } from "../services/scheduleService";
import SingleSchedule from "./SingleSchedule";
import { useHistory } from "react-router-dom";
import { deleteSchedule } from "../services/scheduleService";

/* Styles
----------*/

const Userpage = () => {
  //Using the dom history to push the path
  const history = useHistory();
  const [schedules, setSchedules] = useState([]);

  const routeChange = () => {
    let path = `/Add_schedule`;
    history.push(path);
  };

  useEffect(async () => {
    console.log(" inside the Use effect ");
    const id = localStorage.getItem("userId");
    const { data } = await getSchedules(id);
    //so gets all the schedules for given user id
    setSchedules(data);
  }, []);

  const handleDeleteSchedule = async (schedule_id) => {
    await deleteSchedule(schedule_id);
    const id = localStorage.getItem("userId");
    const { data } = await getSchedules(id);
    setSchedules(data);
  };

  return (
    <div>
      {schedules.map((single) => (
        <SingleSchedule
          deleteSchedule={handleDeleteSchedule}
          key={single.schedule_id}
          {...single}
        />
      ))}
      <div>
        <button onClick={routeChange}>Add new schedule</button>
      </div>
    </div>
  );
};

export default Userpage;
