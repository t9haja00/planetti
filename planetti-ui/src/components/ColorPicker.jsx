import React from "react";
import styles from "../assets/css/delete-account.module.css";

const Colours = [
  { id: 1, name: "Default", colorCode: "#16a3a3" },
  { id: 2, name: "Peach", colorCode: "#f3947c" },
  { id: 3, name: "Lilac", colorCode: "#a693bc" },
  { id: 4, name: "Goldenrod", colorCode: "#f4c558" },
  { id: 5, name: "Onyx", colorCode: "#353839" },
  { id: 6, name: "Ochre", colorCode: "#e39e59" },
];

function ColorPicker(props) {
  function chooseColor(event) {
    props.chooseColor(event.target.id);
  }

  return (
    <div className="form-group">
      <hr></hr>
      <div className={styles.colorContainer}>
        <div className={styles.colorLabel}> Selected Color: </div>
        <div
          className={styles.selectedColor}
          style={{ backgroundColor: props.chosenColor }}
        ></div>

        <div className={styles.colorButtonsGrid}>
          {Colours.map((Colour) => (
            <div
              className={styles.colorButton}
              id={Colour.colorCode}
              style={{ backgroundColor: Colour.colorCode }}
              onClick={chooseColor}
              key={Colour.id}
            >
              {Colour.name}
            </div>
          ))}
        </div>
      </div>
      <hr></hr>
    </div>
  );
}
export default ColorPicker;
