import axios from "axios";
import {
  LANDING_BEGIN,
  LANDING_FAIL,
  LANDING_SUCCESS,
} from "../constants/landingConstants";

export const getLandingProducts = () => async (dispatch) => {
  try {
    dispatch({ type: LANDING_BEGIN });
    const { data } = await axios.get(`/api/landing`);

    dispatch({
      type: LANDING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LANDING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
