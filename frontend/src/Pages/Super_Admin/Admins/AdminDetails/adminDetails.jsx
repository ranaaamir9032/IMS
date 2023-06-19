import React, { useEffect } from "react";
import "./adminDetails.css";
import BasicMenu from "../../../../Components/DropMenu/menu";
import img from "../../../../assets/images/placeholder.jpg";
import BackBtn from "../../../../Components/Buttons/back";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../../../../Redux/Users/userActions";
import { deleteUser } from "../../../../Redux/Users/userActions";



function AdminDetails() {
  const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userHandler.user);


  const deleteAdmin = () => {
    dispatch(deleteUser(id))
    navigate('/admins')
  }


  useEffect(() => {
    dispatch(getSingleUser(id));
  }, []);

  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header">
          <BackBtn />
          <h1>Admin Details</h1>
        </div>
        <div className="right-header">
          <BasicMenu route = {'/admin/edit/'+id} handleDelete = {deleteAdmin}/>
        </div>
      </div>
      <>
        <div className="admin-info">
          <div className="profile-pic">
            <img src={user?.picture || img} alt="image" />
          </div>
          <div className="admin-details">
            <span className="pri-heading">{user?.username}</span>
            <p className="gray-text">{user?.email}</p>
            <p className="gray-text">+{user?.contact}</p>
          </div>
        </div>
        <div className="admin-organization">
          <span style={{ margin: "2% 0", fontSize: "larger" }}>
            Organization
          </span>
          <div className="admin-organization">
            <div className="org-content-head no-border">
              <div className="profile-pic">
                <img src={user?.organization?.picture || img} alt="image" />
              </div>
              <div className="title">
                <span className="pri-heading"></span>
                <p>{user?.organization?.email}</p>
              </div>
            </div>
            <div className="no-border org-det-field">
              <span className="org-det-left">Representative Name</span>
              <p style={{ width: "60%" }}>
                {user?.organization?.representative}
              </p>
            </div>
            <div className="rep-contact org-det-field ">
              <span className="org-det-left">Representative Contact</span>
              <p style={{ width: "60%" }}>{user?.organization?.contact}</p>
            </div>
            <div className="no-border org-det-field">
              <span className="org-det-left">Bio</span>
              <p style={{ width: "60%" }}>{user?.organization?.bio}</p>
            </div>
            <div className="no-border org-det-field">
              <span className="org-det-left">Address</span>
              <p style={{ width: "60%" }}>
                {user?.organization?.address +
                  "," +
                  user?.organization?.city +
                  "," +
                  user?.organization?.country}
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default AdminDetails;
