import React, { useState, useEffect, useRef } from 'react';
import { Card, Overlay, Tooltip } from 'react-bootstrap';
import { ScheduleComponent, Inject, Week, ViewsDirective, ViewDirective }
  from '@syncfusion/ej2-react-schedule';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';
import { getScheduleByUUID } from '../services/scheduleService';
// import { getEventsByScheduleId, addEvent, editEvent, deleteEvent } from './../services/eventService';
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
import styles from '../assets/css/view-schedule.module.css';

let dataManager = null;
let dataQuery = null;
const iconsUrl = process.env.REACT_APP_API;

const ViewSchedule = ({ match }) => {

  const [schedule, setSchedule] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const textAreaRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const getSchedule = async () => {
      const { data: scheduleData } =
        await getScheduleByUUID(match.params.uuid);

      // Syncfusion DataManager
      dataManager = new DataManager({
        url: 'http://localhost:3200/events',
        adaptor: new UrlAdaptor(),
      });

      dataQuery = new Query()
        .from('events')
        .addParams('schedule_id', scheduleData[0].schedule_id);

      setSchedule(scheduleData[0]);
    }

    getSchedule();

  }, [match.params.uuid]);

  const onActionBegin = async ({ requestType, data }) => {
    // console.log(this.state.events);
    console.log(requestType, data);
    //   const { data: eventData } = await getEventsByScheduleId(this.state.schedule.schedule_id);

    //   if (requestType === 'eventCreate') {
    //     const newEvent = data[0];
    //     await addEvent(newEvent, this.state.schedule.schedule_id);
    //   }

    //   else if (requestType === 'eventChange') {
    //     let eventToEdit = null;

    //     if (data.occurrence) {
    //       const eventToAdd = data.occurrence;
    //       eventToEdit = data.parent;
    //       await addEvent(eventToAdd, this.schedule.schedule_id);
    //     }
    //     else
    //       eventToEdit = data;

    //     // find the event that match the one being updated
    //     const eventObject = eventData.find(e => e.event.Id === eventToEdit.Id);
    //     await editEvent(eventToEdit, eventObject);
    //   }

    //   else if (requestType === 'eventRemove') {
    //     let eventToDelete = null;

    //     if (data[0].occurrence) {
    //       eventToDelete = data[0].occurrence;
    //       const eventToEdit = data[0].parent;

    //       // find the event that match the one being updated
    //       const eventObject = eventData.find(e => e.event.Id === eventToEdit.Id);
    //       const eventObjectToDelete = eventData.find(e => e.event.Id === eventToDelete.Id);
    //       await editEvent(eventToEdit, eventObject);
    //       await deleteEvent(eventObjectToDelete);
    //     }
    //     else {
    //       const eventToDelete = data[0];

    //       // find the event that match the one being updated
    //       const eventObject = eventData.find(e => e.event.Id === eventToDelete.Id);
    //       await deleteEvent(eventObject);
    //     }
    //   }
  }
  const handleCopyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();

    setTimeout(() => {
      setShowTooltip(false);
    }, 1500);

    setShowTooltip(true);
  };

  return (
    <>
      {schedule ?
        <div className='mx-4 my-4'>
          <div className='row my-3'>
            <div className='col border rounded p-1 shadow' >
              <div className={styles.title}>
                {schedule.title}
              </div>
              <ScheduleComponent
                height='650px'
                showWeekNumber={true}
                firstDayOfWeek={1}
                eventSettings={{ dataSource: dataManager, query: dataQuery }}
                actionBegin={onActionBegin}>
                <ViewsDirective>
                  <ViewDirective option='Week'></ViewDirective>
                </ViewsDirective>
                <Inject services={[Week]} />
              </ScheduleComponent>
            </div>
            <div className='col-lg-2 mt-2'>
              <Card className='mb-3'>
                <div className={styles.description} >
                  Description
                  </div>
                <Card.Body>
                  {schedule.description}
                </Card.Body>
              </Card>
              <Card>
                <div
                  className={styles.description} >
                  Share Link
                  </div>
                <Card.Body
                  className='d-flex flex-wrap'>
                  <label
                    className="sr-only"
                    htmlFor="inlineFormInputGroup">Share Link</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div
                        ref={tooltipRef}
                        className={`${styles['icon-container']} input-group-text`}
                        onClick={handleCopyToClipboard} >
                        <img
                          className={styles.icon}
                          src={`${iconsUrl}/icons/clipboard.svg`}
                          alt='' />
                        <Overlay target={tooltipRef.current} show={showTooltip} placement="top">
                          {(props) => (
                            <Tooltip {...props}>
                              Copied!
                            </Tooltip>
                          )}
                        </Overlay>
                      </div>
                    </div>
                    <input
                      ref={textAreaRef}
                      className={`${styles.link} form-control`}
                      type='text'
                      value={window.location.href}
                      readOnly />
                  </div>
                  <small className={styles['link-comment']}>
                    You can also copy the link from your browser's address bar.
                  </small>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        : <DelayedRender />}
    </>
  );
}

export default ViewSchedule;
