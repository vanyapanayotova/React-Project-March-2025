import { useRegister } from "../../../api/authApi";
import { useUserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import styles from "./register.module.css";
import { toast } from 'react-toastify';

export default function Register() {

    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useUserContext();

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const validateRegister = (username, email, password, confirmPassword) => {
        if (username.length < 3) {
            toast.error("Username should be at least 3 chars long!");
            return false;
        }

        if (username.length < 3) {
            toast.error("Username should be at least 3 chars long!");
            return false;
        }

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address!");
            return false;
        }

        if (password.length < 5) {
            toast.error("Passwords should be at least 5 chars long!");
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords don't match!");
            return false;
        }

        return true;
    }

    const registerHandler = async (formData) => {
        const { username, email, password } = Object.fromEntries(formData);
        const confirmPassword = formData.get('confirm-password');

        const validated = validateRegister(username, email, password, confirmPassword);
        if (!validated) {
            return;
        }

        try {
            const authData = await register(username, email, password);
            userLoginHandler(authData);
            navigate('/');
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <>
            <div className="container">
            <div className={`card mx-auto ${styles.card}`}>
                    <div className="card-body">
                        <h1 className="card-title">Registration Form</h1>
                        <h6 className="card-subtitle mb-2 text-muted mb-4">Register to our website to add your cooking recipes.</h6>

                        <form id="register" action={registerHandler}>

                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="username" name="username" id="username" className="form-control" min={3}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" id="email" name="email" placeholder=" " className="form-control" />
                            </div>

                            <div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" name="password" id="register-password" className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirm-password" className="form-label">confirm-password</label>
                                    <input type="password" name="confirm-password" id="confirm-password" className="form-control" />
                                </div>
                            </div>

                            <input className="btn btn-primary" type="submit" value="Register" />

                        </form>

                        <Link to="/login" className="card-link">Login</Link>
                    </div>
                </div >
            </div >

        </>
    );
}