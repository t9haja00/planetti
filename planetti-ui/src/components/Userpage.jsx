/* Packages
------------*/
import React, { useEffect, useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";

/* Components
--------------*/
import {
  getSchedules,
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
  const [showEditSchedule, setEditNewSchedule] = useState(false);
  // input field states for modules
  const [title, updateTitle] = useState("");
  const [description, updateDescription] = useState("");
  const [error, updateError] = useState("");

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

  const handleNewSchedule = () => {
    history.push("/new-schedule/");
  };
  // edit old schedule and update it to database

  const handleEditScheduleClose = () => {
    setEditNewSchedule(false);
    updateError("");
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

  const editScheduleValidation = (props) => {
    updateTitle(props.value);
    if (props.value == "") updateError("Title cannot be empty");
    else updateError("");
  };

  return (
    <div>
      <div className={styles2.centerContent}>
        <div className={styles2.gridContainer}>
          <Card onClick={handleNewSchedule} className={styles2.clickDiv}>
            <h4>Add New Schedule</h4>
          </Card>
          {schedules.reverse().map((single) => (
            <SingleSchedule
              deleteSchedule={handleDeleteShow}
              editSchedule={handleEditScheduleShow}
              key={single.schedule_id}
              {...single}
            />
          ))}
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
              <input
                required
                id="title"
                name="title"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => editScheduleValidation(e.target)}
                maxLength="40"
              />
              <div className="invalid-feedback d-block">{error}</div>
              <hr></hr>
              <label>edit your description</label>
              <textarea
                maxLength="1000"
                rows="3"
                className="form-control"
                value={description || ""}
                onChange={(e) => updateDescription(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className={styles["modal-footer"]}>
            <Button
              disabled={error}
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
