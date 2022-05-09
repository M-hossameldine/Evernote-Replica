import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import classes from './Notification.module.css';
import {
  selectNotification,
  hideNotification,
} from '../../../store/shared-store';
import { IoMdClose, MdError } from '../../../assets';

const Notification: React.FC = (props) => {
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useAppDispatch();
  const notification = useAppSelector(selectNotification);

  let status = notification ? notification.status : null;

  const closeNotificationHandler = () => {
    setShowNotification(false);
    setTimeout(() => dispatch(hideNotification()), 150);
  };

  useEffect(() => {
    if (notification) {
      setShowNotification(true);
      setTimeout(closeNotificationHandler, 2500);
    }
  }, [notification]);

  let statusClasses = '';

  let visiblityClasses = showNotification ? classes.visible : '';

  if (status === 'error') {
    statusClasses = classes.error;
  } else if (status === 'success') {
    statusClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${statusClasses} ${visiblityClasses}`;

  return (
    <div className={cssClasses}>
      <p className={classes.message}>
        {status === 'error' && <MdError className='shrink-0' />}
        {notification && notification.message}
      </p>
      <button className={classes.btn} onClick={closeNotificationHandler}>
        <IoMdClose className='shrink-0 text-xl' />
      </button>
    </div>
  );
};

export default Notification;
