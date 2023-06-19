import {
  SHOW_ALL_ORGANIZATIONS,
  SHOW_SINGLE_ORGANIZATION,
  SHOW_ORGS_THIS_MONTH,
} from "../Constants/orgConstats";




export const organizationHandler = (data = [], action) => {
  switch (action.type) {
    case SHOW_ALL_ORGANIZATIONS:
      return { organizationData: action.data };

    case SHOW_SINGLE_ORGANIZATION:
      return { organization: action.data };

    case SHOW_ORGS_THIS_MONTH:
      return {orgsPerMonth: action.data };

    default:
      return data;
  }
};
