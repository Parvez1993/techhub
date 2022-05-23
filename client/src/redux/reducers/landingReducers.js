import {
  LANDING_BEGIN,
  LANDING_FAIL,
  LANDING_SUCCESS,
} from "../constants/landingConstants";

export const LandingListReducer = (state = { landing: [] }, action) => {
  switch (action.type) {
    case LANDING_BEGIN:
      return { loading: true, landing: [] };

    case LANDING_SUCCESS:
      return {
        loading: false,
        landing: action.payload,
      };
    case LANDING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
