import { GET_CURRENT_USER, LOGOUT } from "./types";

import userService from "../services/user.service";

export const getCurrentUser = () => (dispatch) => {
  return userService.getCurrentUser().then(
    (response) => {
      dispatch({
        type: GET_CURRENT_USER,
      });

      return Promise.resolve(response);
    },

    (error) => {
      dispatch({
        type: LOGOUT,
      });

      return Promise.reject();
    }
  );
};
