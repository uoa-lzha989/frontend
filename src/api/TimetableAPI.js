import moment from 'moment';
import { getData } from './APIUtils';

const convertCourse = (course) => {
  if (course === null) {
    return null;
  }

  return {
    ...course,
    timestamp: moment(course.timestamp).toDate(),
  };
};

/**
 * Fetches the data of all courses in the timetable
 * @return {Promise} data of all the courses
 */
export const getCourses = async () =>
  getData(`api/timetable/users/courses`)?.map((course) => convertCourse(course));

/**
 * Fetches the data of the course with the course id
 * @param {number} courseId id of the course to retrieve
 * @return {Promise} data of the given course
 */
export const getCourse = async (courseId) =>
  convertCourse(getData(`api/timetable/courses/${courseId}`));

/**
 * Fetches the data of a specific users courses
 * @param {number} userId id of the user for the courses to retrieve
 * @return {Promise} data of the users courses
 */

export const getUserCourses = async (userId) => {
  getData(`api/timetable/users/courses/${userId}`)?.map((course) => convertCourse(course));
};
