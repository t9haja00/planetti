import React from "react";
import { Component } from "react";
import { Button, ToastBody } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { newSchedule } from "../services/scheduleService";

import styles from "../assets/css/delete-account.module.css";

const options = [
  { value: "text", label: "text" },
  { value: "number", label: "number" },
  { value: "email", label: "email" },
];

const todayDate = new Date();

class NewSchedule extends Component {
  state = {
    customFields: [],
    selectedOption: null,
    start_date: todayDate.toISOString().slice(0, 10),
    end_date: todayDate.toISOString().slice(0, 10),
    title: "",
    description: "",
  };
  backToUserpage = () => {
    useHistory.push("/");
  };
  routeChange = (path) => {
    useHistory.push("/view-schedule/" + path);
  };
  customStylesSelect = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: "25px dotted pink",
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
    return this.state.customFields.map((el, i) => (
      <div key={i}>
        <div>
          <input
            name={el.value + " "}
            type="input"
            value={this.state.customFields[i].value}
            onChange={this.handleChangesInput.bind(this, i)}
          />
          <Select
            value={this.state.customFields[i].selectedOption}
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
            checked={this.state.customFields[i].isMandatory}
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
    let customFields = [...this.state.customFields];
    customFields[i] = { ...customFields[i], input: event.target.value };
    this.setState({ customFields });
  };

  handleChangeSelect = (i, event) => {
    let customFields = [...this.state.customFields];
    customFields[i] = { ...customFields[i], select: event.value };
    this.setState({ customFields });
  };

  handleCheckBox = (i, event) => {
    let customFields = [...this.state.customFields];
    customFields[i] = { ...customFields[i], isMandatory: event.target.checked };
    this.setState({ customFields });
  };

  addClick = () => {
    let id = this.state.customFields.length + 1;
    let test = { id: id };
    this.setState((prevState) => ({
      customFields: [...prevState.customFields, test],
    }));
  };

  removeClick = (i) => {
    let customFields = [...this.state.customFields];
    customFields.splice(i, 1);
    this.setState({ customFields });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.customFields);
  };

  handleNewSchedule = async () => {
    console.log(this.state);
    console.log(this.state.customFields);
    let customFieldsSpread = { ...this.state.customFields };
    console.log(customFieldsSpread);
    const userInfo = localStorage.getItem("userInfo");
    const { user_id } = JSON.parse(userInfo);

    let scheduleData = {
      title: this.state.description,
      description: this.state.description,
      user_id: user_id,
      maxDate: this.state.start_date,
      minDate: this.state.end_date,
      schedule_config: {
        id: "1",
        name: "phoneNumber",
        label: "Phone Number",
        type: "number",
        mandatory: "true",
      },
      schedule_color: "#16a3a3",
    };
    console.log(scheduleData);
    scheduleData = await newSchedule(scheduleData);
    this.routeChange(scheduleData[0].uuid);
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
            <label>Colors~~~</label>
            <div>
              two data input fields here?
              <input
                type="date"
                name="start_date"
                value={this.state.start_date}
                onChange={(e) => this.setState({ start_date: e.target.value })}
              />
              <input
                type="date"
                name="end_date"
                value={this.state.end_date}
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
