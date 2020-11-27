import React from 'react';
import TableBody from './TableBody';


const Table = ({ fields, props }) => {
  return (
    <table className="custom-event-editor" style={{width: '100%'}}>
      <TableBody 
        data={fields} 
        props={props}
        />
    </table>
  );
}

export default Table;