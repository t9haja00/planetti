import {
  DropdownButton,
  Dropdown,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import styles from "../assets/css/delete-account.module.css";
function CreateUI(props) {
  return props.customFields.map((el, i) => (
    <div key={i}>
      <div className="form-group">
        <div className={styles.wrapRow}>
          <InputGroup>
            <FormControl
              placeholder="Your fields name in schedule"
              aria-label="Your fields name in schedule"
              aria-describedby="basic-addon2"
              name={el.value + " "}
              onChange={(e) => this.handleChangesInput(e, i)}
            />
            <DropdownButton
              focusFirstItemOnShow={true}
              as={InputGroup.Append}
              variant="outline-secondary"
              title={props.customFields[i].type}
              id="input-group-dropdown-2"
              onSelect={(e) => this.handleChangeSelect(e, i)}
            >
              <Dropdown.Item eventKey="number">Numbers</Dropdown.Item>
              <Dropdown.Item eventKey="email">Email</Dropdown.Item>
              <Dropdown.Item eventKey="text">Text</Dropdown.Item>
              <Dropdown.Item eventKey="url">URL</Dropdown.Item>
            </DropdownButton>
            <InputGroup.Prepend>
              <InputGroup.Text>Mandatory?</InputGroup.Text>
              <InputGroup.Checkbox
                aria-label="Checkbox for following text input"
                name="mandatory"
                type="checkbox"
                defaultChecked={false}
                checked={el.mandatory}
                onChange={(e) => this.handleCheckBox(e, i)}
              />
            </InputGroup.Prepend>
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                type="button"
                value="remove"
                onClick={this.removeClick.bind(this, i)}
              >
                Delete
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    </div>
  ));
}

export default CreateUI;
