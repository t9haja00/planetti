import React from "react";
import styles from "../assets/css/delete-account.module.css";

function ColorPicker(props) {
  function chooseColor(event) {
    props.chooseColor(event.target.id);
  }

  return (
    <div>
      <label className="form-control">Colors</label>
      <div className={styles.colorContainer}>
        <div className={styles.colorLabel}> Selected Color: </div>
        <div
          className={styles.selectedColor}
          style={{ backgroundColor: props.chosenColor }}
        >
          {" "}
        </div>
        <div className={styles.colorLabel}> Available Colors: </div>
        <div
          className={styles.colorButton}
          id="#16a3a3"
          style={{ backgroundColor: "#16a3a3" }}
          onClick={chooseColor}
        >
          {" "}
          Default{" "}
        </div>
        <div
          className={styles.colorButton}
          id="#f3947c"
          style={{ backgroundColor: "#f3947c" }}
          onClick={chooseColor}
        >
          {" "}
          Peach
        </div>
        <div
          className={styles.colorButton}
          id="#a693bc"
          style={{ backgroundColor: "#a693bc" }}
          onClick={chooseColor}
        >
          {" "}
          Lilac
        </div>
        <div
          className={styles.colorButton}
          id="#353839"
          style={{ backgroundColor: "#353839" }}
          onClick={chooseColor}
        >
          {" "}
          Onyx
        </div>
        <div
          className={styles.colorButton}
          id="#e39e59"
          style={{ backgroundColor: "#e39e59" }}
          onClick={chooseColor}
        >
          {" "}
          Ochre
        </div>
      </div>
    </div>
  );
}
export default ColorPicker;
