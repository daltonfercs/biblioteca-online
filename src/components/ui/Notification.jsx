import React from 'react';
// BEM: notification
const Notification = ({ message }) => (
  <div className="notification">
    <span className="notification__icon">ℹ️</span> {message}
  </div>
);
export default Notification;