import { outLocal} from '../../utils/HelperFunctions/helperFunctions'
const token = JSON.parse(outLocal("token"));

// To remove "" from the token being sent
export const Header = { Authorization: "Bearer " + token };

//Default route
const default_route = "http://localhost:4000";

//Organization routes
const organization_route = default_route + "/organization";
export const get_all_organizations = organization_route + "/";
export const add_new_organization = organization_route + "/";
export const get_single_organization = organization_route + "/";
export const edit_organization = organization_route + "/";
export const delete_organization = organization_route + "/";
export const get_organization_count = organization_route + "/count";

//User routes
const user_route = default_route + "/user";
export const user_login = user_route + "/login";
export const get_all_users = user_route + "/";
export const add_new_user = user_route + "/";
export const get_single_user = user_route + "/";
export const edit_user = user_route + "/";
export const delete_user = user_route + "/";
export const get_admin_count = user_route + "/count";

//Complaint routes
const complaint_route = default_route + "/complaint";
export const get_all_complaints = complaint_route + "/";
export const add_new_complaint = complaint_route + "/";
export const get_single_complaint = complaint_route + "/";
export const resolve_complaint = complaint_route + "/";
export const get_complaints_count = complaint_route + "/count";


// Category routes
const category_route = default_route + "/category";
export const get_all_categories = category_route + "/";
export const get_all_categories_with_vendors = category_route + "/all";
export const get_single_category = category_route + "/";
export const edit_category = category_route + "/";
export const delete_category = category_route + "/";
export const add_new_categorie = category_route + "/";
export const delete_categorie = category_route + "/";
export const get_count_categories = category_route + "/count";



// Vendor routes
const vendor_route = default_route + "/vendor";
export const get_all_vendors = vendor_route + "/";
export const add_new_vendor = vendor_route + "/";
export const get_single_vendor = vendor_route + "/";
export const add_count_vendor = vendor_route + "/count";
export const edit_vendor = vendor_route + "/";


// Inventory routes
const item_route = default_route + "/item";
export const get_all_items = item_route + "/";
export const add_new_item = item_route + "/";
export const get_single_item =item_route + "/";
export const get_item_count =item_route + "/count";
export const edit_item = item_route + "/";



// Request routes
const request_route = default_route + "/request";
export const get_all_requests = request_route + "/";
export const add_new_request = request_route + "/";
export const get_single_request = request_route + "/";
export const edit_request = request_route + "/";