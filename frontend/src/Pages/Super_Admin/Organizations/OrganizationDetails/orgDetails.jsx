import React, { useEffect, useState } from "react";
import "./orgDetails.css";
import BasicMenu from "../../../../Components/DropMenu/menu";
import img from "../../../../assets/images/placeholder.jpg";
import DataTable from "../../../../Components/table/table";
import BackBtn from "../../../../Components/Buttons/back";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrganization } from "../../../../Redux/Organizations/orgActions";
import { getAllUsers } from "../../../../Redux/Users/userActions";
import { adminTableHeader } from "../../../../Constants/tableConstants";
import { deleteOrganization } from "../../../../Redux/Organizations/orgActions";



export default function OrgDetails() {
  const navigate = useNavigate()
  const [orgDet, setOrgDet] = useState(true);
  const [activeBtn, setActiveBtn] = useState(true);

  const {id} = useParams();
  const dispatch = useDispatch()
  const organization = useSelector((state) => state.organizationHandler.organization);
  const admins = useSelector((state) => state.userHandler.admins);
  const orgAdmis = admins?.filter(a => a.organization === organization?.name);

  const deleteOrg = () => {
    dispatch(deleteOrganization(id))
    navigate('/organizations')
  }

  useEffect(() => {
    dispatch(getSingleOrganization(id))
    dispatch(getAllUsers());
  }, [])

  return (
    <div className="container">
      <div className="org-det-header">
        <BackBtn/>
        <BasicMenu  route = {'/organization/edit/'+ id} handleDelete = {deleteOrg}/>
      </div>
      <div className="org-details">
        <div className="tabs">
          <button
            onClick={() => {
              setOrgDet(true);
              setActiveBtn(true);
            }}
            className="switch-btn"
            style={{
              color: !activeBtn ? "black" : "white",
              backgroundColor: !activeBtn ? "white" : "#4583F5 ",
            }}
          >
            General Information
          </button>
          <button
            onClick={() => {
              setOrgDet(false);
              setActiveBtn(false);
            }}
            className="switch-btn"
            style={{
              color: !activeBtn ? "white" : "black",
              backgroundColor: !activeBtn ? "#4583F5" : "white",
            }}
          >
            Admins
          </button>
        </div>
        {orgDet && (
          <div className="org-det-content">
            <div className="org-content-head">
              <div className="logo">
              <img src={organization?.picture || img} alt="image" />
              </div>
              <div className="title">
                <span className="pri-heading">{organization?.name}</span>
                <p>{organization?.email}</p>
              </div>
            </div>
            <div className="bio org-det-field">
              <span className="org-det-left">Bio</span>
              <p>
                {organization?.bio}
              </p>
            </div>
            <div className="address org-det-field">
              <span className="org-det-left">Address</span>
              <p>
              {organization?.address + "," + organization?.city + "," + organization?.country}
              </p>
            </div>
            <div className="rep org-det-field">
              <span className="org-det-left">Representative Name</span>
              <p>
              {organization?.representative}
              </p>
            </div>
            <div className="rep-contact org-det-field">
              <span className="org-det-left">Representative Contact</span>
              <p>
              {organization?.contact}
              </p>
            </div>
          </div>
        )}
        {!orgDet && (
          <div className="org-det-admins">
            {orgAdmis.length > 0 ? <DataTable tableHeader={adminTableHeader} data={orgAdmis} image = {true} route = {'/adminDetails/'}/> : 
            <div style = {{color: 'gray', textAlign: 'center'}}>No Admins yet</div>}
          </div>
        )}
      </div>
    </div>
  );
}
