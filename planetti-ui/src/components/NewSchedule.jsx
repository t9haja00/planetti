import React from "react";
import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Select from "react-select";

import styles from "../assets/css/delete-account.module.css";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "email", label: "Email" },
];
class NewSchedule extends Component {
  state = {
    selectedOption: null,
    start_date: Date,
    end_date: Date,
    title: "",
    updateTitle: "",
    description: "",
    updateDescription: "",
  };
  backToUserpage = () => {
    useHistory.push("/");
  };

  handleChange(e) {
    this.setState({ id: e.value, name: e.label });
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <div>
        <div>
          <div>
            {/* required inputs */}
            <div className="form-group">
              <label>Give your schedule a Title</label>
              <input
                className="form-control"
                value={this.state.title || ""}
                onChange={(e) => this.updateTitle(e.target.value)}
              />
              <label>Please give a short description</label>
              <input
                className="form-control"
                value={this.state.description || ""}
                onChange={(e) => this.updateDescription(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
            {/* extra stuff */}
            <div>
              <button>Add new stuff</button>
            </div>
          </div>
          <div>
            <div>Here be the colors? RGB color wheel?</div>
            <input name="color picker" type="color"></input>
          </div>
          <div>
            two data input fields here?
            <input
              type="date"
              name="start_date"
              value={this.state.start_date || ""}
              onChange={(e) => this.setState({ start_date: e.target.value })}
            />
            <input
              type="date"
              name="end_date"
              value={this.state.end_date || ""}
              onChange={(e) => this.setState({ end_date: e.target.value })}
            />
            {console.log(this.state.start_date)}
            {console.log(this.state.end_date)}
            {/* somehow also to do endless? no end date */}
          </div>
          {/* button div */}
          <div>
            <Button className={styles.cancel} onClick={this.backToUserpage}>
              Back
            </Button>
            <Button
              className="btn-success"
              onClick={() => {
                this.handleNewSchedule();
              }}
            >
              Create this schedule
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default NewSchedule;
