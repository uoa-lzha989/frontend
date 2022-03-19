import { React, useEffect, useState } from 'react';
import { Button, Dialog, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import styles from './PopUp.module.css';
import ProfileBadge from '../ProfileBadge/ProfileBadge';
import LoadingComponent from '../Loading/LoadingComponent';
import { findPairing } from '../../api/PairingAPI';

function PopUp({ open, setOpen }) {
  let name = 'jason';
  const selectedCourses = ['course1', 'course2', 'course 4'];
  const buddyCourses = ['course1', 'course2', 'course 3'];
  const [sharedCourses, setSharedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buddyFound, setBuddyFound] = useState(false);

  const handleSharedCourses = () => {
    setSharedCourses(selectedCourses.filter((x) => buddyCourses.includes(x)));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddBuddy = () => {
    handleSharedCourses();
    // handleClose();
  };

  const handleSkip = () => {
    handleClose();
  };

  useEffect(() => {
    const findBuddy = async () => {
       try {
          const response = await findPairing(selectedCourses);
          name = response[1].toString();
      
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      };
  }; 
  if (!buddyFound) {
  findBuddy();
  setBuddyFound(true);
  }
}
);

  return (
    <Dialog open={open} fullWidth data-testid="popup">
      <div>
        {loading ? (
          <LoadingComponent />
        ) : (
          <div>
            <div className={styles.icon}>
              <ProfileBadge name={name} size={250} />
            </div>
            <div className={styles.title}>
              <h1> {name} </h1>
            </div>
            <div className={styles.courses}>
              <Typography>Also takes {sharedCourses.join(', ').toUpperCase()}</Typography>
            </div>
            <div className={styles.buddies}>
              <PeopleIcon sx={{ marginRight: '5px' }} />9 Buddies
            </div>
            <div className={styles['message-button']}>
              <Button
                onClick={handleAddBuddy}
                variant="contained"
                sx={{ maxWidth: '120px', maxHeight: '40px', minWidth: '120px', minHeight: '40px' }}>
                say hi
              </Button>
            </div>
            <div className={styles['skip-button']}>
              <Button
                onClick={handleSkip}
                variant="outlined"
                sx={{ maxWidth: '120px', maxHeight: '40px', minWidth: '120px', minHeight: '40px' }}>
                skip
              </Button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default PopUp;
