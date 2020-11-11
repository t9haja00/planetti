import http from "./httpService";
//where does the  schedules api happen
const schedulesAPI = process.env.REACT_APP_SCHEDULES;

//get all schedules with this user id
export function getSchedules(user_id) {
  return http.get(schedulesAPI, {},);
}
//create new schedule for this user_id
export function newSchedule(user_id) {
    return http.post(schedulesAPI, {
        title,
        description,
        user_id
    }, );
  }
  //delete 1 schedule with the selected id
  export function deleteSchedule(schedule_id) {
    return http.delete(schedulesAPI, {
        schedule_id
    },  );
  }