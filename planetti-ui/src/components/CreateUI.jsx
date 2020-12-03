import Select from "react-select";

const options = [
  { value: "text", label: "Text" },
  { value: "number", label: "Only Numbers" },
  { value: "email", label: "Email" },
  { value: "url", label: "Url" },
];
const customStylesSelect = {
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

function CreateUI(props) {
  return props.map((el, i) => (
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
          styles={customStylesSelect}
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
}

export default CreateUI;
