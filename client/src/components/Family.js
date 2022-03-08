import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Family.css";
import NewMember from "./NewMember";
import moment from "moment";

function Family() {
  const [members, setMembers] = useState([]);
  const [familyName, setFamilyName] = useState("");

  const accountId = localStorage.getItem("account_id");

  // function to get member names
  const getMemberNames = () => {
    axios.get(`/api/family/?accountId=${accountId}`).then((res) => {
      const familyMembersArray = res.data.familyMembers;
      setMembers(familyMembersArray);
      setFamilyName(res.data.familyMembers[0].family_name);
    });
  };

  useEffect(() => {
    getMemberNames();
  }, []);

  return (
    <>
      <div className="family-container">
        <h2 id="family-name"> The {familyName} Family </h2>

        <div class="card-group">
          {members.map((member) => (
            <div class="card family-card">
              <div class="card-body">
                <img
                  class="card-img-top"
                  src="blank-profile-picture.png"
                  alt="Card image cap"
                />
                <h3 class="card-title">{member.first_name} </h3>
                <p class="card-text">{member.email}</p>
                <p class="card-text">
                  <small class="text-muted">
                    Joined in {moment(member.joined_on).format("YYYY-MM-DD")}
                  </small>
                </p>
              </div>
            </div>
          ))}
        </div>
        <NewMember />
      </div>
    </>
  );
}

export default Family;
