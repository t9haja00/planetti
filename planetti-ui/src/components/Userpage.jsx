/* Packages
------------*/
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
/* Components
--------------*/
import { getSchedules } from "../services/scheduleService";
import SingleSchedule from "./SingleSchedule";
import { useHistory } from "react-router-dom";
import { deleteSchedule } from "../services/scheduleService";

/* Styles
----------*/
import styles from "../assets/css/delete-account.module.css";

const Userpage = () => {
  //Using the dom history to push the path
  const history = useHistory();
  const [schedules, setSchedules] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [scheduleIDDelete, setscheduleIdDelete] = useState();
  const routeChange = () => {
    let path = `/Add_schedule`;
    history.push(path);
  };

  useEffect(async () => {
    const userInfo = localStorage.getItem("userInfo");
    const { user_id } = JSON.parse(userInfo);
    console.log(user_id);
    const { data } = await getSchedules(user_id);
    //so gets all the schedules for given user id
    setSchedules(data);
  }, []);

  const handleClose = () => {
    setShowDeleteConfirm(false);
  };

  const handleShow = (schedule_id) => {
    setShowDeleteConfirm(true);
    setscheduleIdDelete(schedule_id);
  };
  const handleDeleteSchedule = async () => {
    const schedule_id = scheduleIDDelete;
    await deleteSchedule(schedule_id);
    const userInfo = localStorage.getItem("userInfo");
    const { user_id } = JSON.parse(userInfo);
    const { data } = await getSchedules(user_id);
    setSchedules(data);
    handleClose();
  };

  return (
    <div>
      {schedules.map((single) => (
        <SingleSchedule
          deleteSchedule={handleShow}
          key={single.schedule_id}
          {...single}
        />
      ))}
      <div>
        <button onClick={routeChange}>Add new schedule</button>
      </div>
      <div>
        <Modal centered show={showDeleteConfirm} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className={styles["modal-title"]}>
              Are you sure you want to delete this schedule?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles["modal-body"]}>
            <Button className="btn-danger" onClick={handleDeleteSchedule}>
              Delete schedule
            </Button>
            <Button className={styles.cancel} onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Userpage;
