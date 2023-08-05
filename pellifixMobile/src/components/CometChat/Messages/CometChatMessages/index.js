/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import CometChatMessagesUI from './CometChatMessagesUI';
import { useLocation, useNavigate } from 'react-router-native';

const CometChatMessages = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
      <CometChatMessagesUI location={location.state} navigate={navigate} {...props} />
  )
}

export default CometChatMessages;
