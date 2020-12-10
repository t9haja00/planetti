import http from "./httpService";

//where does the  schedules api happen
const schedulesAPI = process.env.REACT_APP_SCHEDULES;
const appAPI = process.env.REACT_APP_API;

//get all schedules with this user id
export function getSchedules(user_id) {
  return http.get(`${schedulesAPI}/${user_id}`);
}

// get schedule by uuid
export function getScheduleByUUID(UUID) {
  return http.get(`${appAPI}/${UUID}/schedules`);
}

//create new schedule for this user_id
export function newSchedule(schedule) {
  const { title, description, user_id,schedule_config,schedule_color } = schedule
  return http.post(schedulesAPI, {
    title,
    description,
    user_id,
    schedule_config,
    schedule_color
  });
}

//delete 1 schedule with the selected id
export function deleteSchedule(schedule_id) {
  return http.delete(`${schedulesAPI}/${schedule_id}`);
}

export function updateSchedule(updatedScheduleData) {
  const { title, description, schedule_id } = updatedScheduleData;
  return http.put(`${schedulesAPI}/${schedule_id}`, {
    title,
    description
  });
}



