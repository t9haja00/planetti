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
  const routeChange = () => {
    let path = `/newSchedule`;
    history.push(path);
  };

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
    //should api return? the uuid
    handleNewScheduleClose();
    // return uuid to route change to new schedule?
    routeChange(data);
  };

  // edit old schedule and update

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

  return (
    <div>
      {schedules.map((single) => (
        <SingleSchedule
          deleteSchedule={handleDeleteShow}
          editSchedule={handleEditScheduleShow}
          key={single.schedule_id}
          {...single}
        />
      ))}
      <div>
        <button onClick={handleNewScheduleShow}>Add new schedule</button>
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
            <p className="h5 mb-5">Give your schedule a Title</p>
            <input
              value={title || ""}
              onChange={(e) => updateTitle(e.target.value)}
            />
            <p className="h5 mb-5">Plase give short description</p>
            <input
              value={description || ""}
              onChange={(e) => updateDescription(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer className={styles["modal-footer"]}>
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
      <div>
        {/* Modal starts for deleting single event */}
        <Modal centered show={showDeleteConfirm} onHide={handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title className={styles["modal-title"]}>
              Are you sure you want to delete this schedule?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles["modal-body"]}>
            <Button
              className="btn-danger"
              onClick={() => handleDelete(scheduleID)}
            >
              Delete schedule
            </Button>
            <Button className={styles.cancel} onClick={handleDeleteClose}>
              Cancel
            </Button>
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
            <p className="h5 mb-5">Edit a Title</p>
            <input
              value={title || ""}
              onChange={(e) => updateTitle(e.target.value)}
            />
            <p className="h5 mb-5">edit your description</p>
            <input
              value={description || ""}
              onChange={(e) => updateDescription(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer className={styles["modal-footer"]}>
            <Button className={styles.cancel} onClick={handleEditScheduleClose}>
              Cancel
            </Button>
            <Button
              className="btn-success"
              onClick={() => {
                handleEditSchedule();
              }}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Userpage;
