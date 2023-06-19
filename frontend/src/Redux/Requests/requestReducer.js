import { SHOW_ALL_REQUESTS, SHOW_SINGLE_REQUEST } from "../Constants/requestConstants";

  
  
  export const requestHandler = (data = [], action) => {
    switch (action.type) {
        case SHOW_ALL_REQUESTS:
            return {requests : action.data}

        case SHOW_SINGLE_REQUEST:
            return {request: action.data}
      
      default:
        return data;
    }
  };
  