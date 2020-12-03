import React from "react";
import Form from "../components/common/Form";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { newSchedule } from "../services/scheduleService";
import styles from "../assets/css/delete-account.module.css";
import Joi from "joi";

const options = [
  { value: "text", label: "Text" },
  { value: "number", label: "Only Numbers" },
  { value: "email", label: "Email" },
  { value: "url", label: "Url" },
];

class NewSchedule extends Form {
  state = {
    data: {
      title: "",
    },
    customFields: [],
    selectedOption: null,
    start_date: "",
    end_date: "",
    title: "",
    description: "",
    chosenColor: "#16a3a3",
    errors: {},
  };

  schema = Joi.object({
    title: Joi.string().required(),
  });

  backToUserpage = () => {
    this.props.history.push("/");
  };

  routeChange = (path) => {
    this.props.history.push("/view-schedule/" + path);
  };
  customStylesSelect = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: "250px dotted pink",
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
            type="text"
            value={el.value}
            onChange={(e) => this.handleChangesInput(e, i)}
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

  handleChangesInput = (e, i) => {
    let customFields = [...this.state.customFields];
    customFields[i] = { ...customFields[i], input: e.target.value };
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

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(this.state.customFields);
  // };

  doSubmit = async () => {
    let customFieldsSpread = [...this.state.customFields];
    const userInfo = localStorage.getItem("userInfo");
    const { user_id } = JSON.parse(userInfo);
    let scheduleData = {
      title: this.state.description,
      description: this.state.description,
      user_id: user_id,
      schedule_config: {
        maxDate: this.state.start_date,
        minDate: this.state.end_date,
        fields: customFieldsSpread,
      },
      schedule_color: this.state.chosenColor,
    };
    let { data } = await newSchedule(scheduleData);
    let responseUuid = data[0].uuid;
    console.log(responseUuid);
    this.routeChange(responseUuid);
  };

  chooseColor = (event) => {
    event.preventDefault();
    console.log(event.target.id);
    this.setState({ chosenColor: event.target.id });
  };
  render() {
    return (
      <div>
        <form onSubmit={null}>
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
                {this.state.errors.title && (
                  <small className="text-danger">
                    {this.state.errors.title}
                  </small>
                )}

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
            <div>{this.createUI()}</div>
            <div>
              <label className="form-control">Colors</label>
              <div className={styles.colorContainer}>
                <div className={styles.colorLabel}> Selected Color: </div>
                <div
                  className={styles.selectedColor}
                  style={{ backgroundColor: this.state.chosenColor }}
                >
                  {" "}
                </div>
                <div className={styles.colorLabel}> Available Colors: </div>
                <div
                  className={styles.colorButton}
                  id="#16a3a3"
                  style={{ backgroundColor: "#16a3a3" }}
                  onClick={this.chooseColor}
                >
                  {" "}
                  Default{" "}
                </div>
                <div
                  className={styles.colorButton}
                  id="#f3947c"
                  style={{ backgroundColor: "#f3947c" }}
                  onClick={this.chooseColor}
                >
                  {" "}
                  Peach
                </div>
                <div
                  className={styles.colorButton}
                  id="#a693bc"
                  style={{ backgroundColor: "#a693bc" }}
                  onClick={this.chooseColor}
                >
                  {" "}
                  Lilac
                </div>
                <div
                  className={styles.colorButton}
                  id="#353839"
                  style={{ backgroundColor: "#353839" }}
                  onClick={this.chooseColor}
                >
                  {" "}
                  Onyx
                </div>
                <div
                  className={styles.colorButton}
                  id="#e39e59"
                  style={{ backgroundColor: "#e39e59" }}
                  onClick={this.chooseColor}
                >
                  {" "}
                  Ochre
                </div>
              </div>
            </div>
            <div>
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
                onClick={(e) => this.handlesubmit(e)}
              >
                Create this schedule
              </Button>
            </div>
          </div>
        </form>
        <div>
          <button onClick={this.addClick}>new stuff</button>
          <input type="submit" value="test submit" />
        </div>
      </div>
    );
  }
}
export default NewSchedule;
