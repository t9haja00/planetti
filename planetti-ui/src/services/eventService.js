import http from './httpService';

const eventsAPI = process.env.REACT_APP_EVENTS;

// get events by schedule_id
export function getEventsByScheduleId(scheduleId) {
  return http.get(`${eventsAPI}/${scheduleId}`);
}