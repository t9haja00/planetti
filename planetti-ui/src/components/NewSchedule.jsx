import React from "react";
import Form from "../components/common/Form";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { newSchedule } from "../services/scheduleService";
import styles from "../assets/css/delete-account.module.css";
import Joi from "joi";
//import  CreateUI  from "../components/CreateUI";
import ColorPicker from "../components/ColorPicker";

const options = [
  { value: "text", label: "Text" },
  { value: "number", label: "Only Numbers" },
  { value: "email", label: "Email" },
  { value: "url", label: "Url" },
];

const todayDate = new Date();

class NewSchedule extends Form {
  state = {
    data: {
      title: "",
      start_date: "",
      end_date: "",
    },
    customFields: [],
    selectedOption: null,
    start_date: "",
    end_date: "",
    description: "",
    chosenColor: "#16a3a3",
    showDatePicker: "",
    errors: {},
  };

  schema = Joi.object({
    title: Joi.string().required(),
    start_date: Joi.date().allow(""),
    end_date: Joi.date().min(Joi.ref("start_date")).allow("")
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
            value={el.selectedOption}
            onChange={(e) => this.handleChangeSelect(e, i)}
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
            checked={el.isMandatory}
            onChange={(e) => this.handleCheckBox(e, i)}
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

  handleChangeSelect = (e, i) => {
    let customFields = [...this.state.customFields];
    customFields[i] = { ...customFields[i], select: e.value };
    this.setState({ customFields });
  };

  handleCheckBox = (e, i) => {
    let customFields = [...this.state.customFields];
    customFields[i] = { ...customFields[i], isMandatory: e.target.checked };
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

  doSubmit = async () => {
    let customFieldsSpread = [...this.state.customFields];
    const userInfo = localStorage.getItem("userInfo");
    const { user_id } = JSON.parse(userInfo);
    let scheduleData = {
      title: this.state.data.title,
      description: this.state.description,
      user_id: user_id,
      schedule_config: {
        maxDate: this.state.data.end_date,
        minDate: this.state.data.start_date,
        fields: customFieldsSpread,
      },
      schedule_color: this.state.chosenColor,
    };
    let { data } = await newSchedule(scheduleData);
    let responseUuid = data[0].uuid;
    console.log(responseUuid);
    this.routeChange(responseUuid);
  };

  chooseColor = (color) => {
    console.log(color);
    this.setState({ chosenColor: color });
  };

  DatePickerHandler = (e) =>
  {
    
    this.state.showDatePicker ?
    
    this.setState({
     // showDatePicker: e.target.checked,
     data : { start_date: "", end_date: ""}
     
    })
    :
    this.setState({
     // showDatePicker: e.target.checked,

      data : { start_date: todayDate.toISOString().slice(0,10) , end_date : todayDate.toISOString().slice(0,10) }
    })

  }

  render() {
    return (
      <div className={styles.createPageContainer}>
        <form onSubmit={null}>
          <div>
            <div>
              {/* required inputs */}
              <div className="form-group">
                <label>Give your schedule a Title</label>
                <input
                  className="form-control"
                  value={this.state.data.title || ""}
                  onChange={(e) =>
                    this.setState((prevState) => ({
                      data: {
                        ...prevState.data,
                        title: e.target.value,
                      },
                    }))
                  }
                />
                {this.state.errors.title && (
                  <small className="text-danger">
                    {this.state.errors.title}
                  </small>
                )}
                <label>
                  Please give a short description if you want (Optional)
                </label>
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
            <ColorPicker
              chooseColor={this.chooseColor}
              chosenColor={this.state.chosenColor}
            />

            <div>
              Want to have custom schedule duration?{" "}
              <input
                type="checkbox"
                name="showDatePicker"
                checked={this.state.showDatePicker}
                onChange={(e) => {
                
                 
                  this.setState({
                    showDatePicker: e.target.checked,
                    // data : { start_date: todayDate.toISOString().slice(0,10)}
                  });
                  this.DatePickerHandler(e);
                  console.log(this.state.data.start_date);
                  
                  

                }}
              />
              {this.state.showDatePicker && (
                <div>
                  <div>
                    {this.state.errors.start_date && (
                      <small className="text-danger">
                        {this.state.errors.start_date}
                      </small>
                    )}
                  </div>
                  <label>Start date</label>
                  <input
                    type="date"
                    name="start_date"
                    value={this.state.data.start_date}
                    onChange={(e) =>
                      this.setState((prevState) => ({
                        data: {
                          ...prevState.data,
                          start_date: e.target.value,
                        },
                      }))
                    }
                  />
                  <div>
                    {this.state.errors.end_date && (
                      <small className="text-danger">
                        {this.state.errors.end_date}
                      </small>
                    )}
                    <label> End date</label>
                    <input
                      type="date"
                      name="end_date"
                      value={this.state.data.end_date}
                      onChange={(e) =>
                        this.setState((prevState) => ({
                          data: {
                            ...prevState.data,
                            end_date: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              )}
            </div>
            <div className={styles.buttonBar}>
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
        </div>
      </div>
    );
  }
}
export default NewSchedule;
