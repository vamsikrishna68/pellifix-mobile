import { combineReducers } from 'redux';
import cometChatReducer from './cometChatReducer';
import dashboardReducer from './dashboardReducer';
import sidebarReducer from './sidebarReducer';

const rootReducer = combineReducers({
  cometChatReducer,
  dashboardReducer,
  sidebarReducer
});

export default rootReducer;
