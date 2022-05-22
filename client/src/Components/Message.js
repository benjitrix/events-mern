import React from 'react';
import '../css/Message.css'

const Message = ({message, error}) => {
  return (
  <div className={`message ${error ? 'error-true' : 'error-false'}`} style={{textAlign: "center"}}>
    <p>{message}</p>
  </div>
  );
};

export default Message;
