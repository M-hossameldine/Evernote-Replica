import classes from './Notification.module.css';

import { useEffect, useState } from 'react';

import {
  hideNotification,
  selectNotification,
  useAppDispatch,
  useAppSelector,
} from '~store';

import { MdError } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

const Notification: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useAppDispatch();
  const notification = useAppSelector(selectNotification);

  const status = notification ? notification.status : null;

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

  const visibilityClasses = showNotification ? classes.visible : '';

  if (status === 'error') {
    statusClasses = classes.error;
  } else if (status === 'success') {
    statusClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${statusClasses} ${visibilityClasses}`;

  return (
    <div className={cssClasses}>
      <p className={classes.message}>
        {status === 'error' && <MdError className="shrink-0" />}
        {notification && notification.message}
      </p>
      <button
        aria-label="Close Notification"
        className={classes.btn}
        onClick={closeNotificationHandler}
      >
        <IoMdClose className="shrink-0 text-xl" />
      </button>
    </div>
  );
};

export default Notification;
