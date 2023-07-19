import { combineReducers } from 'redux';
import cometChatReducer from './cometChatReducer';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
  cometChatReducer,
  dashboardReducer
});

export default rootReducer;
