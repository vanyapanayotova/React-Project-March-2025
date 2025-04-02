import styles from "./profile.module.css";
import useAuth from "../../../hooks/useAuth";

const Profile = () => {
  const { email, username } = useAuth();

  return (
    <div className="container">
      <div className={`card mx-auto ${styles.card}`}>
        <div className="card-body">
          <h1 className="card-title">User profile</h1>
          <hr />

            <div>
              <p><b>Username:</b> {username}</p>
              <p><b>Email:</b> {email}</p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
