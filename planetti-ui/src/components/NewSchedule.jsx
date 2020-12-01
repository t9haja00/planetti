import React from "react";
import { Component } from "react";
import { Button } from "react-bootstrap";
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
    values: [],
    stuff: [],
    selectedOption: null,
    start_date: Date,
    end_date: Date,
    title: "",
    description: "",
  };
  backToUserpage = () => {
    useHistory.push("/");
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });

    this.addClick(selectedOption);
  };

  // stuff for new inputs
  createUI = () => {
    return this.state.values.map((el, i) => (
      <div key={i}>
        <h1>
          {el.label + " "}
          <label>
            Is Mandatory? :
            <input
              name="isMandatory"
              type="checkbox"
              checked={this.state.values[i].isMandatory}
              onChange={this.handleChanges.bind(this, i)}
            />
          </label>
          <input
            name={el.value + " "}
            type="input"
            value={this.state.values[i].value}
            onChange={this.handleChanges.bind(this, i)}
          />
        </h1>
        <input
          type="button"
          value="remove"
          onClick={this.removeClick.bind(this, i)}
        />
      </div>
    ));
  };

  handleChanges = (i, event) => {
    let values = [...this.state.values];
    values[i] = { ...values[i], isMandatory: event.target.checked };

    this.setState({ values });
  };

  addClick = (selectedOption) => {
    this.setState((prevState) => ({
      values: [...prevState.values, selectedOption],
    }));
  };

  removeClick = (i) => {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.values);
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              {/* required inputs */}
              <div className="form-group">
                <label>Give your schedule a Title</label>
                <input
                  className="form-control"
                  value={this.state.title || ""}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
                <label>Please give a short description</label>
                <input
                  className="form-control"
                  value={this.state.description || ""}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
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
              {this.createUI()}
              <input type="submit" value="test submit" />
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
              {/* {console.log(this.state.start_date)}
              {console.log(this.state.end_date)} */}
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
        </form>
      </div>
    );
  }
}
export default NewSchedule;
