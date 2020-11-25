/* Packages
------------*/
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
/* Components
--------------*/
import {
  getSchedules,
  newSchedule,
  updateSchedule,
  deleteSchedule,
} from "../services/scheduleService";
import SingleSchedule from "./SingleSchedule";
import { useHistory } from "react-router-dom";

/* Styles
----------*/
import styles from "../assets/css/delete-account.module.css";
import styles2 from "../assets/css/userpage.module.css";

let scheduleID;

const Userpage = () => {
  //Using the dom history to push the path
  const history = useHistory();
  const [schedules, setSchedules] = useState([]);
  //states for pop up modules
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showNewSchedule, setShowNewSchedule] = useState(false);
  const [showEditSchedule, setEditNewSchedule] = useState(false);
  // input field states for modules
  const [title, updateTitle] = useState("");
  const [description, updateDescription] = useState("");

  useEffect(() => {
    async function fetchData() {
      const userInfo = localStorage.getItem("userInfo");
      const { user_id } = JSON.parse(userInfo);
      const { data } = await getSchedules(user_id);
      setSchedules(data);
    }
    fetchData();
    //so gets all the schedules for given user id
  }, []);

  // delete functions start

  const handleDeleteClose = () => {
    setShowDeleteConfirm(false);
  };

  const handleDeleteShow = (schedule_id) => {
    setShowDeleteConfirm(true);
    scheduleID = schedule_id;
  };

  const handleDelete = async (scheduleID) => {
    await deleteSchedule(scheduleID);
    const userInfo = localStorage.getItem("userInfo");
    const { user_id } = JSON.parse(userInfo);
    const { data } = await getSchedules(user_id);
    setSchedules(data);
    handleDeleteClose();
  };

  // new schedule funtions

  const handleNewScheduleClose = () => {
    setShowNewSchedule(false);
    updateTitle("");
    updateDescription("");
  };
  const handleNewScheduleShow = () => {
    setShowNewSchedule(true);
  };
  const handleNewSchedule = async () => {
    console.log(title);
    console.log(description);
    const userInfo = localStorage.getItem("userInfo");
    const { user_id } = JSON.parse(userInfo);
    const scheduleInfo = {
      title: title,
      description: description,
      user_id: user_id,
    };
    const { data } = await newSchedule(scheduleInfo);
    handleNewScheduleClose();
    routeChange(data[0].uuid);
  };

  // edit old schedule and update it to database

  const handleEditScheduleClose = () => {
    setEditNewSchedule(false);
  };

  const handleEditScheduleShow = (props) => {
    setEditNewSchedule(true);
    scheduleID = props[0];
    // setting the input field defult values
    updateTitle(props[1]);
    updateDescription(props[2]);
  };

  const handleEditSchedule = async () => {
    //need schedule ID here
    const schedule_id = scheduleID;

    const UpdatedScheduleInfo = {
      title: title,
      description: description,
      schedule_id: schedule_id,
    };
    await updateSchedule(UpdatedScheduleInfo);
    const userInfo = localStorage.getItem("userInfo");
    const { user_id } = JSON.parse(userInfo);
    const { data } = await getSchedules(user_id);
    setSchedules(data);
    handleEditScheduleClose();
  };

  // Used to push to new scedules main window.
  const routeChange = (path) => {
    history.push("/view-schedule/" + path);
  };

  return (
    <div>
      <div className={styles2.centerContent}>
      <div className={styles2.gridContainer}>
      <div onClick={handleNewScheduleShow}  className={styles2.clickDiv}>
        Add New Schedule
      </div>
      {schedules.map((single) => (
        <SingleSchedule
          deleteSchedule={handleDeleteShow}
          editSchedule={handleEditScheduleShow}
          key={single.schedule_id}
          {...single}
        />
      ))}
      </div>
      <div>
        {/* Modal start for new schedule */}
        <Modal centered show={showNewSchedule} onHide={handleNewScheduleClose}>
          <Modal.Header closeButton>
            <Modal.Title className={styles["modal-title"]}>
              Create New schedule
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="form-group">
            <label>Give your schedule a Title</label>
            <input className="form-control"
              value={title || ""}
              onChange={(e) => updateTitle(e.target.value)}
            />
            <hr></hr>
            <label>Please give a short description</label>
            <input className="form-control"
              value={description || ""}
              onChange={(e) => updateDescription(e.target.value)}
            />
            </div>
          </Modal.Body>
          <Modal.Footer className={styles["modal-footer"]}>
          <Button className={styles.cancel} onClick={handleNewScheduleClose}>
              Cancel
            </Button>
            <Button
              className="btn-success"
              onClick={() => {
                handleNewSchedule();
              }}
            >
              Create new schedule
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
        </div>
      <div>
        {/* Modal starts for deleting single event */}
        <Modal centered show={showDeleteConfirm} onHide={handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title className={styles["modal-title"]}>
              Are you sure you want to delete this schedule?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles["modal-body"]}>
            <div class={styles2.buttonBar}>
            <Button
              className="btn-danger"
              onClick={() => handleDelete(scheduleID)}
            >
              Delete schedule
            </Button>
            <Button className={styles.cancel} onClick={handleDeleteClose}>
              Cancel
            </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        {/* Modal starts for editing single event */}

        <Modal
          centered
          show={showEditSchedule}
          onHide={handleEditScheduleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title className={styles["modal-title"]}>
              Edit schedule
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles["modal-body"]}>
          <div className="form-group">
            <label>Edit a Title</label>
            <input className="form-control"
              value={title || ""}
              onChange={(e) => updateTitle(e.target.value)}
            />
            <hr></hr>
            <label>edit your description</label>
            <input className="form-control"
              value={description || ""}
              onChange={(e) => updateDescription(e.target.value)}
            />
             </div>
          </Modal.Body>
          <Modal.Footer className={styles["modal-footer"]}>
            <Button
              className="btn-success"
              onClick={() => {
                handleEditSchedule();
              }}
            >
              Save changes
            </Button>
            <Button className={styles.cancel} onClick={handleEditScheduleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Userpage;
