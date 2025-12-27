import React from 'react';
// BEM: button, button--primary
const Button = ({ children, onClick, variant = 'primary', type = 'button' }) => (
  <button className={`button button--${variant}`} onClick={onClick} type={type}>
    {children}
  </button>
);
export default Button;