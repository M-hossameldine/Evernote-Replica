import classes from './Notification.module.css';

import { IoMdClose, MdError } from '../../../assets';

const Notification: React.FC<{
  message: JSX.Element | string;
  status: 'success' | 'error';
}> = (props) => {
  const { message, status } = props;

  let statusClasses = '';

  if (status === 'error') {
    statusClasses = classes.error;
  } else if (status === 'success') {
    statusClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={cssClasses}>
      <p className={classes.message}>
        {status === 'error' && <MdError className='shrink-0' />}
        {message}
      </p>
      <button className={classes.btn}>
        <IoMdClose className='shrink-0 text-xl' />
      </button>
    </div>
  );
};

export default Notification;
