import { useActionState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { useLogin } from "../../../api/authApi";
import { UserContext } from "../../../contexts/UserContext";
import styles from "./login.module.css";

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();
    const loginHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);
        const authData = await login(values.email, values.password);
        userLoginHandler(authData);
        navigate(-1);
    };

    const [_, loginAction, isPending] = useActionState(loginHandler, { email: '', password: '' });

    return (
        <>
            <div className="container">
                <div className={`card mx-auto ${styles.card}`}>
                    <div className="card-body">
                        <h1 className="card-title">Login Form</h1>
                        <h6 className="card-subtitle mb-2 text-muted mb-4">Login to our website to add your cooking recipes.</h6>

                        <form id="login" action={loginAction}>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" id="email" name="email" placeholder=" " className="form-control" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="login-password" className="form-label">Password</label>
                                <input type="password" id="login-password" name="password" className="form-control" />
                            </div>
                            <input type="submit" className="btn btn-primary" value="Login" disabled={isPending} />

                        </form>

                        <Link to="/register" className="card-link">Register</Link>

                    </div>
                </div>
            </div >
        </>
    );
}