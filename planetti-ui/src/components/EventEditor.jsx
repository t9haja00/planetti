import React from 'react';
import Table from './common/Table';


const EventEditor = ({fields, props}) => {

  return (
    <Table 
      fields={fields} 
      props={props}
      />
  );

};

export default EventEditor;