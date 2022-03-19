import { Button, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CourseCard from '../../components/CourseCard/CourseCard';
import PopUp from '../../components/PopUp/PopUp';

import styles from './Pairing.module.css';
import { getCourses } from '../../api/TimetableAPI';

const StyledButton = styled(Button)(() => ({
  '&.MuiButton-root': {
    border: '2px #666666 solid',
  },
  '&.MuiButton-outlined': {
    color: '#666666',
  },
}));

function Pairing() {
  const [numOfSelectedCourses, setNumOfSelectedCourses] = useState(0);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);

  /**
   * If the course is not selected, add to the selectedCourses list.
   * If the course is selected, remove from the list.
   * @param {*} courseName
   */
  const handleSelectedCourse = (courseName) => {
    const numberOfCourse = selectedCourses.length;
    const filteredSelectedCourse = selectedCourses.filter((value) => courseName !== value);

    if (filteredSelectedCourse.length === numberOfCourse) {
      setSelectedCourses([...filteredSelectedCourse, courseName]);
      const prev = numOfSelectedCourses;
      setNumOfSelectedCourses(prev + 1);
    } else {
      setSelectedCourses(filteredSelectedCourse);
      const prev = numOfSelectedCourses;
      setNumOfSelectedCourses(prev - 1);
    }
  };

  /**
   * Send selected course to popup componenet
   */
  const handleFindBuddy = () => {
    setOpen(true);
  };

  /**
   * Fetch course timetable
   */
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getCourses();
      setCourses(response);
    };

    fetchCourses();
  }, []);

  const header = (
    <Grid container direction="row" justifyContent="space-between" alignItems="center">
      <Grid item>
        <Grid container spacing={1}>
          <Grid item>
            <Typography>
              <strong>{numOfSelectedCourses} Courses Selected </strong>
            </Typography>
          </Grid>
          <Grid item>
            <CheckCircleOutlinedIcon />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <StyledButton variant="outlined" onClick={() => handleFindBuddy()}>
          <Typography color="primaryDark">FIND MY BUDDY</Typography>
          <ArrowForwardIcon />
        </StyledButton>
        <PopUp
          open={open}
          setOpen={setOpen}
          selectedCourses={selectedCourses}
        />
      </Grid>
    </Grid>
  );

  return (
    <Container>
      <Grid container direction="column" spacing={3}>
        <Grid xs={12} sm={12} md={6} item>
          {header}
        </Grid>
        <Grid item>
          <Grid container>
            {courses.map(({ courseId, name, semester, studentCount, buddyCount }) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                col={4}
                key={courseId}
                className={styles.card}
                onClick={() => handleSelectedCourse(name)}>
                <CourseCard
                  key={courseId}
                  courseName={name}
                  semesterNumber={semester}
                  numbOfStudents={studentCount}
                  numOfBuddies={buddyCount}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Pairing;
