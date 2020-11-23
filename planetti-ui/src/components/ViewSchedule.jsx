import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { ScheduleComponent, Inject, Week, ViewsDirective, ViewDirective }
  from '@syncfusion/ej2-react-schedule';
import { getScheduleByUUID } from '../services/scheduleService';
import { getEventsByScheduleId } from './../services/eventService';
import { DelayedRender } from './common/DelayedRender';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";

const ViewSchedule = ({ match }) => {

  const [schedule, setSchedule] = useState(null);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const getSchedule = async () => {
      const { data: scheduleData } =
        await getScheduleByUUID('9efa2ebd-46a2-4312-9982-13ac12ead6ed');

      const { data: eventsData } = await getEventsByScheduleId(scheduleData[0].schedule_id);
      const eventsArr = eventsData.map(e => {
        e.event.StartTime = new Date(e.event.StartTime);
        e.event.EndTime = new Date(e.event.EndTime);
        e.event.IsAllDay = (e.event.IsAllDay == 'true');
      
        return e.event;
      });

      setSchedule(scheduleData[0]);
      setEvents(eventsArr);
    }

    getSchedule();
  }, []);

  const onActionBegin = args => {
    console.log(args);
  }

  return (
    <>
      {schedule ?
        <div className='m-5'>
          <div className='row my-4'>
            <div className='col-2'>
              <Card>
                <Card.Header>
                  {schedule.title}
                </Card.Header>
                <Card.Body>
                  {schedule.description}
                </Card.Body>
              </Card>
            </div>
            <div className='col border rounded p-1 shadow' >
              <ScheduleComponent
                height='650px'
                showWeekNumber={true}
                firstDayOfWeek={1}
                eventSettings={{ dataSource: events }}
                actionBegin={onActionBegin}>
                <ViewsDirective>
                  <ViewDirective option='Week'></ViewDirective>
                </ViewsDirective>
                <Inject services={[Week]} />
              </ScheduleComponent>
            </div>
          </div>
        </div>
        : <DelayedRender />}
    </>
  );
}

export default ViewSchedule;
