import React, { useState } from "react";
import styles from "./profile.module.css";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    username: "",
    email: "",
    tel: ""
  });
  const [form, setForm] = useState({
    username: "",
    email: "",
    tel: ""
  });

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setForm(profileDetails);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileDetails(form);
    setIsEditMode(false);
  };

  const onCancel = (e) => {
    e.preventDefault();
    setIsEditMode(false);
  };

  return (
    <div className="container">
      <div className={`card mx-auto ${styles.card}`}>
        <div className="card-body">
          <h1 className="card-title">User profile</h1>
          <hr />
          {!isEditMode ? (
            <div>
              <p><b>Username:</b> {profileDetails.username}</p>
              <p><b>Email:</b> {profileDetails.email}</p>
              <p><b>Phone:</b> {profileDetails.tel}</p>
              <button className="btn btn-primary" onClick={toggleEditMode}>Edit</button>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-bold">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  minLength="5"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tel" className="form-label fw-bold">Phone number</label>
                <input
                  type="text"
                  className="form-control"
                  id="tel"
                  name="tel"
                  value={form.tel}
                  onChange={handleChange}
                />
              </div>
              <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
