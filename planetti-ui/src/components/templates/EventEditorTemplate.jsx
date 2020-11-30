import React from 'react';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';


const EventEditorTemplate = ({ fields, props, minDate, maxDate }) => {

  return (
    <table className="custom-event-editor" style={{ width: '100%' }}>
      <tbody>
        {fields.map(field =>
          <tr key={field.id}>
            <td className='e-textlabel'>{field.label}</td>
            <td>
              <input
                id={field.id}
                className='e-field e-input'
                name={field.name}
                type={field.type}
                style={{ width: '100%' }} />
            </td>
          </tr>
        )}
        <tr>
          <td className='e-textlabel'>From</td>
          <td>
            <DateTimePickerComponent
              id='StartTime'
              className='e-field'
              data-name='StartTime'
              min={minDate}
              max={maxDate}
              value={new Date(props.startTime || props.StartTime)}
            />
          </td>
        </tr>
        <tr>
          <td className='e-textlabel'>To</td>
          <td>
            <DateTimePickerComponent
              id='EndTime'
              className='e-field'
              data-name='EndTime'
              min={minDate}
              max={maxDate}
              value={new Date(props.endTime || props.EndTime)}
            />
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Comment</td>
          <td>
            <textarea id="Description" className="e-field e-input" name="Description" style={{ width: '100%', height: '60px !important', resize: 'vertical' }}>

            </textarea>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EventEditorTemplate;