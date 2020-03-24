import axios from "axios";
import Configuration from "./Configuration";

class AuthService {
  constructor() {
    this.config = new Configuration();
    this.login = this.login.bind(this);
  }

  // res.data contains JSON {username, password, loggedin(date type) }
  login(credentials) {
    return axios
      .post(this.config.API_BASE_URL + "/login", credentials)
      .then(res => {
        console.log(res.data);
        this.setUserProfile(res.data);
        return Promise.resolve(res);
      })
      .catch(err => {
        console.log("Authentication failed", err);
      });
  }

  /** signup for future implementation */
  // signup(userInfo) {
  //   return axios
  //     .post(API_BASE_URL + '/register', userInfo)
  //     .then(res => {
  //       if (res.data.status === 200) {
  //         this.setUserProfile(res.data);

  //         return Promise.resolve(res);
  //       } else {
  //         this.setState({ message: res.data.message });
  //         console.log('Authentication failed');
  //       }
  //     })
  //     .catch(err => {
  //       alert(err);
  //     });
  // }

  setUserProfile(data) {
    sessionStorage.setItem("userProfile", JSON.stringify(data));
    sessionStorage.setItem("isLogged", true);
  }
  getUserProfile() {
    return JSON.parse(sessionStorage.getItem("userProfile"));
  }

  loggedIn() {
    const token = this.getUserInfo().token;
    return !!token && !this.isTokenExpired(token);
  }

  logOut() {
    sessionStorage.removeItem("userProfile");
    sessionStorage.removeItem("isLogged");
    return axios.get(this.config.API_BASE_URLE_URL);
  }

  /**
   * JWT helper methods
   */

  // isTokenExpired(token) {
  //   try {
  //     const decoded = decode(token);
  //     if (decoded.exp < Date.now() / 1000) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (err) {
  //     return false;
  //   }
  // }

  // getToken() {
  //   // Using jwt-decode npm package to decode the token
  //   return decode(this.getUserProfile().token);
  // }

  // getAuthHeader() {
  //   console.log(this.getUserInfo());
  //   return {
  //     headers: {
  //       // Authorization: 'Bearer ' + this.getUserInfo().token
  //       Authorization: 'Bearer ' + this.getToken()
  //     }
  //   };
  // }
}

export default AuthService;
