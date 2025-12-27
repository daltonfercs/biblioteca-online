import React from 'react';
// BEM: empty-state
const EmptyState = ({ message }) => (
  <div className="empty-state">
    <p className="empty-state__text">{message}</p>
  </div>
);
export default EmptyState;