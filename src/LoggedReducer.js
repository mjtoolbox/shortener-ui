import { userConstraints } from './actionType';

let userProfile = JSON.parse(sessionStorage.getItem('userProfile'));

// In case if we need to pass token.
const emptyProfile = {
  username: '',
  logdate: ''
};

const initialState = userProfile
  ? { isLogged: true, userProfile }
  : { isLogged: false, emptyProfile };

const LoggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstraints.LOGIN_SUCCESS:
      return {
        isLogged: true, // driven value
        userProfile: action.payload
      };
    case userConstraints.LOGOUT:
      return {
        isLogged: false,
        userProfile: ''
      };
    default:
      return state;
  }
};
export default LoggedReducer;
