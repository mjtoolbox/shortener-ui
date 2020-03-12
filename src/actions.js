import { userConstraints } from './actionType';

export const userActions = {
  logOut,
  loginSuccess,
  loginFailure,
  setSelectedIndex
};

// Not to confuse this action with Reducer.
// Action is to send out an signal to the store.
// Type is mandatory, but payload is optional.
// Try not to make too complicated. isLogged determined in Reducer.

function loginSuccess(userProfile) {
  return {
    type: userConstraints.LOGIN_SUCCESS,
    payload: userProfile
  };
}

function loginFailure(userProfile) {
  return {
    type: userConstraints.LOGIN_FAILURE,
    payload: userProfile
  };
}

function logOut() {
  return {
    type: userConstraints.LOGOUT,
    payload: ''
  };
}

function setSelectedIndex(index) {
  return {
    type: userConstraints.SET_SELECTED_INDEX,
    selectedIndex: index
  };
}
