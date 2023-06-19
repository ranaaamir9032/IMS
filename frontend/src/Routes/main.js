import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/login";
import ResetPasswor from "../Pages/Login/ResetPassword/resetPasswor";
import Dashboard from "../Pages/Super_Admin/Dashboard/dashboard";
import Header from "../Components/Header/header";
import Organizations from "../Pages/Super_Admin/Organizations/OrganizationsList/organizations";
import Admins from "../Pages/Super_Admin/Admins/AdminsList/admins";
import Complaints from "../Pages/Super_Admin/Complaints/ComplaintsList/complaints";
import AddOrgPage from "../Pages/Super_Admin/Organizations/AddOrganization/addOrg";
import AddAdmin from "../Pages/Super_Admin/Admins/AddNewAdmin/addAdmin";
import EditAdmin from "../Pages/Super_Admin/Admins/EditAdmin/editAdmin";
import OrgDetails from "../Pages/Super_Admin/Organizations/OrganizationDetails/orgDetails";
import EditOrgPage from "../Pages/Super_Admin/Organizations/EditOrganization/editOrganization";
import AdminDetails from "../Pages/Super_Admin/Admins/AdminDetails/adminDetails";
import ComplaintDetails from "../Pages/Super_Admin/Complaints/ComplaintsDetail/complaintDetails";
import AdminDashboard from "../Pages/Admin/Dashboard/adminDashboard";
import Categories from "../Pages/Admin/Categories/CategoriesList/categories";
import CategoryDetails from "../Pages/Admin/Categories/CategoryDetails/categoryDetails";
import EditCategory from "../Pages/Admin/Categories/EditCategory/editCategory";
import AdminComplaints from "../Pages/Admin/Complaints/ComplaintsList/AdminComplaints";
import AdminComplaintDetails from "../Pages/Admin/Complaints/ComlaintDetails/adminComplaintDetails";
import Employees from "../Pages/Admin/Employees/EmployeesList/employees";
import Inventory from "../Pages/Admin/Inventory/ItemsList/inventory";
import Requests from "../Pages/Admin/Requests/RequestList/requests";
import Returns from "../Pages/Admin/Returns/ReturnsList/returns";
import Vendors from "../Pages/Admin/Vendors/VendorsList/vendors";
import EditVendor from "../Pages/Admin/Vendors/EditVendor/editVendor";
import AddItem from "../Pages/Admin/Inventory/AddItem/addItem";
import AddCategory from "../Pages/Admin/Categories/AddCategory/addCategory";
import AddSubCategory from "../Pages/Admin/Categories/AddSubCategories/addSubCategory";
import AddVendor from "../Pages/Admin/Vendors/AddVendor/addVendor";
import AddComplaint from "../Pages/Admin/Complaints/AddComplaint/addComplaint";
import AddEmployee from "../Pages/Admin/Employees/AddEmployee/addEmployee";
import ItemDetails from "../Pages/Admin/Inventory/itemDetails/itemDetails";
import EditItem from "../Pages/Admin/Inventory/EditItem/editItem";
import EmpDetails from "../Pages/Admin/Employees/EmployeeDetails/empDetails";
import ReqDetails from "../Pages/Admin/Requests/RequestDetails/reqDetails";
import ProtectedRoutes from "./protectedRoutes";
import PublicRoutes from "./publicRoutes";
import VendorDetails from "../Pages/Admin/Vendors/VendorDetails/vendorDetails";
import EmployeeDashboard from "../Pages/Employee/Dashboard/dashboard";
import EmployeeProfile from "../Pages/Employee/Profile/employeeProfile";
import AddComplaints from "../Pages/Employee/Complaints/AddComplaints/addComplaints";
import EmployeeComplaints from "../Pages/Employee/Complaints/ComplaintsList/employeeComplaints";
import EmployeeComplaintDetail from "../Pages/Employee/Complaints/ComplaintsDetail/empComplaintDetail";
import AddRequest from "../Pages/Employee/Requests/AddRequest/addRequest";
import EmployeeRequests from "../Pages/Employee/Requests/ListRequests/employeeRequests";
import EmployeeRequestDetail from "../Pages/Employee/Requests/RequestDetail/employeeRequestDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Login />} />
            <Route path="/resetPassword" element={<ResetPasswor />} />
          </Route>

          <Route element={<ProtectedRoutes role={"superadmin"} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="organizations" element={<Organizations />} />
            <Route path="newOrg" element={<AddOrgPage />} />
            <Route path="organization/edit/:id" element={<EditOrgPage />} />
            <Route path="orgDetails/:id" element={<OrgDetails />} />
            <Route path="admins" element={<Admins />} />
            <Route path="newAdmin" element={<AddAdmin />} />
            <Route path="admin/edit/:id" element={<EditAdmin />} />
            <Route path="adminDetails/:id" element={<AdminDetails />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="complaintDetails/:id" element={<ComplaintDetails />} />
          </Route>

            <Route element={<ProtectedRoutes role={"admin"} />}>
              <Route path="adminDashboard" element={<AdminDashboard />} />
              <Route path="categories" element={<Categories />} />
              <Route path="addCategory" element={<AddCategory />} />
              <Route path="addSubCategory/:id" element={<AddSubCategory />} />
              <Route path="category/:id" element={<CategoryDetails />} />
              <Route path="category/edit/:id" element={<EditCategory />} />
              <Route path="adminComplaints" element={<AdminComplaints />} />
              <Route path="addComplaint" element={<AddComplaint />} />
              <Route path="complaint/:id" element={<AdminComplaintDetails />} />
              <Route path="employees" element={<Employees />} />
              <Route path="addEmployee" element={<AddEmployee />} />
              <Route path="employeeDetails/:id" element={<EmpDetails />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="addItem" element={<AddItem />} />
              <Route path="itemDetails/:id" element={<ItemDetails />} />
              <Route path="item/:id" element={<EditItem />} />
              <Route path="requests" element={<Requests />} />
              <Route path="request/:id" element={<ReqDetails />} />
              <Route path="returns" element={<Returns />} />
              <Route path="vendors" element={<Vendors />} />
              <Route path="addVendor" element={<AddVendor />} />
              <Route path="Vendor/edit/:id" element={<EditVendor />} />
              <Route path="Vendor/:id" element={<VendorDetails />} />
            </Route>

            <Route element={<ProtectedRoutes role={"employee"} />}>
              <Route path="employeeDashboard" element={<EmployeeDashboard />} />
              <Route path="employee/profile" element={<EmployeeProfile />} />
              <Route path="employee/complaints/new" element={<AddComplaints />} />
              <Route path="employee/complaints" element={<EmployeeComplaints />} />
              <Route path="employee/complaints/:id" element={<EmployeeComplaintDetail />} />
              <Route path="employee/requests" element={<EmployeeRequests />} />
              <Route path="employee/requests/new" element={<AddRequest />} />
              <Route path="employee/requests/:id" element={<EmployeeRequestDetail />} />
             
            </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;


// Change route names
// Chnage names of states
// change toggle buttons 
// pagination from backend
// use mui themes
// user role not to be stored in local