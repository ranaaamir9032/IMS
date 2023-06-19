import { GET_ALL_ORGANIZATIONS, ADD_NEW_ORGANIZATION , SET_SEARCH_RESULTS, GET_SINGLE_ORGANIZATION, GET_ORGS_THIS_MONTH, EDIT_ORGANIZATION, DELETE_ORGANIZATION} from "../Constants/orgConstats";



export const getAllOrganizations = () => {
  return {
    type: GET_ALL_ORGANIZATIONS,
  };
};

export const addNewOrg = (data) => {
  return {
    type: ADD_NEW_ORGANIZATION,
    data,
  };
};


export const editOrganization = (data) => {
  return {
    type: EDIT_ORGANIZATION,
    data
  };
};


export const deleteOrganization = (data) => {
  return {
    type: DELETE_ORGANIZATION,
    data
  };
};



export const getOrgCount = () => {
  return {
    type: GET_ORGS_THIS_MONTH,
  };
};


export const getSingleOrganization = (data) => {
  return {
    type: GET_SINGLE_ORGANIZATION,
    data
  };
};

