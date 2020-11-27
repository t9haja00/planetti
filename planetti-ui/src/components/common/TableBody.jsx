import React from 'react';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';


const TableBody = ({ data, props }) => {

  return (
    <tbody>
      {data.map(field =>
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
            value={new Date(props.endTime || props.EndTime)}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default TableBody;