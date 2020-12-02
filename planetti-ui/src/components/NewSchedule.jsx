import React from "react";
import { Component } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Select from "react-select";

import styles from "../assets/css/delete-account.module.css";
const options = [
  { value: "text", label: "text" },
  { value: "number", label: "number" },
  { value: "email", label: "email" },
];
class NewSchedule extends Component {
  state = {
    values: [],
    start_date: Date,
    end_date: Date,
    title: "",
    description: "",
  };
  backToUserpage = () => {
    useHistory.push("/");
  };
  customStylesSelect = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: "10px dotted pink",
      color: state.selectProps.menuColor,
      padding: 20,
    }),

    control: (_, { selectProps: { width } }) => ({
      width: width,
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
  // stuff for new inputs
  createUI = () => {
    return this.state.values.map((el, i) => (
      <div key={i}>
        <div>
          <input
            name={el.value + " "}
            type="input"
            value={this.state.values[i].value}
            onChange={this.handleChangesInput.bind(this, i)}
          />
          <Select
            value={this.state.values[i].selectedOption}
            onChange={this.handleChangeSelect.bind(this, i)}
            options={options}
            width="200px"
            menuColor="red"
            styles={this.customStylesSelect}
            name="select"
          />
          Is Mandatory? :
          <input
            name="isMandatory"
            type="checkbox"
            defaultChecked={false}
            checked={this.state.values[i].isMandatory}
            onChange={this.handleCheckBox.bind(this, i)}
          />
          <input
            type="button"
            value="remove"
            onClick={this.removeClick.bind(this, i)}
          />
        </div>
      </div>
    ));
  };

  handleChangesInput = (i, event) => {
    let values = [...this.state.values];
    values[i] = { ...values[i], input: event.target.value };
    this.setState({ values });
  };

  handleChangeSelect = (i, event) => {
    let values = [...this.state.values];
    values[i] = { ...values[i], select: event.value };
    this.setState({ values });
  };

  handleCheckBox = (i, event) => {
    let values = [...this.state.values];
    values[i] = { ...values[i], isMandatory: event.target.checked };
    this.setState({ values });
  };

  addClick = () => {
    this.setState((prevState) => ({
      values: [...prevState.values, {}],
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

  handleNewSchedule = () => {
    alert("hello");
  };
  render() {
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
              <button onClick={this.addClick}>new stuff</button>
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
                value={this.state.start_date ? !this.state.end_date : ""}
                onChange={(e) => this.setState({ start_date: e.target.value })}
              />
              <input
                type="date"
                name="end_date"
                value={this.state.end_date ? !this.state.start_date : ""}
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
