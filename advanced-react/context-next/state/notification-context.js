import { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext({
  // these are just default values
  notification: null, // {title, message, status}
  showNotification: notificationData => {},
  hideNotification: () => {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState('');

  useEffect(() => {
    const condition =
      activeNotification &&
      (activeNotification.status === 'succuss' ||
        activeNotification.status === 'error');

    if (condition) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = notificationData => {
    setActiveNotification(notificationData);
  };
  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
