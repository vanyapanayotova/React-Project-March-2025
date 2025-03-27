import { useRegister } from "../../../api/authApi";
import { useUserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import "./style.css";


export default function Register() {

    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useUserContext();

    const registerHandler = async (formData) => {
        const { email, password } = Object.fromEntries(formData);

        const confirmPassword = formData.get('confirm-password');

        if (password !== confirmPassword) {
            console.log('Password missmatch');

            return;
        }

        const authData = await register(email, password);

        userLoginHandler(authData);

        navigate('/');

    }

    return (
        <>

            <div className="container">

                <div className="card mx-auto">
                    <div className="card-body">
                        <h1 className="card-title">Registration Form</h1>
                        <h6 className="card-subtitle mb-2 text-muted mb-4">Register to our website to add your cooking recipes.</h6>


                        <form id="register" action={registerHandler}>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="username" name="username" id="username" className="form-control" />

                                {/* <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    aria-describedby="username"
                [class]="
                                isFieldTextMissing('username') || isNotMinLength ? 'is-invalid' : ''
                                "
                                name="username"
                                formControlName="username" 
            >

                            @if(form.get('username')?.touched){
                                <div className="invalid-feedback">
                                    @if(form.get('username')?.errors?.['required']){
                                        <p className="form-text error">Username is required!</p>
                                    }
                                    <!--  -->
                                    @if(form.get('username')?.errors?.['minlength']){
                                        <p className="form-text error">Username must be at least 5 characters!</p>
                                    }
                                </div>
                            } */}


                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" id="email" name="email" placeholder=" " className="form-control"/>
                            {/* <input
                                type="email"
                                className="form-control"
                                aria-describedby="emailHelp"
            [class]="isFieldTextMissing('email') || isEmailNotValid ? 'is-invalid' : ''"
                            name="email"
                            id="email"
                            formControlName="email"
          >
                            @if(form.get('email')?.touched){
                                <div className="form-text">
                                    @if(form.get('email')?.errors?.['required']){
                                        <p className="error">Email is required!</p>
                                    }

                                    @if(form.get('email')?.errors?.['emailValidator']){
                                        <p className="error">Email is not valid!</p>
                                    }
                                </div>
                            } */}
                        </div>

                        <div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name="password" id="register-password" className="form-control"/>
                                {/* <input
                                    type="password"
                                    className="form-control" 
            [class]="(
                                (passGroup?.get('password')?.touched &&
                                passGroup?.get('password')?.errors?.['required'] ) ||
                                (passGroup?.get('password')?.touched &&
                                passGroup?.get('password')?.errors?.['minlength'])
                                ) ? 'is-invalid' : ''"
                                name="password"
                                id="password"
                                formControlName="password" 
            >
                                @if(passGroup?.get('password')?.touched){
                                    <div className="form-text">
                                        @if(passGroup?.get('password')?.errors?.['required']){
                                            <p className="error">Password is required!</p>
                                        }
                                        <!--  -->
                                        @if(passGroup?.get('password')?.errors?.['minlength']){
                                            <p className="error">Password must be at least 5 characters!</p>
                                        }
                                    </div>
                                } */}
                            </div>


                            <div className="mb-3">
                                <label htmlFor="confirm-password" className="form-label">confirm-password</label>
                                <input type="password" name="confirm-password" id="confirm-password" className="form-control"/>
                                {/* <input
                                    type="password"
                                    className="form-control"
                                    id="rePassword"
              [class]="(
                                (passGroup?.get('rePassword')?.touched &&
                                (passGroup?.get('rePassword')?.errors?.['required'] ||
                                passGroup?.errors?.['matchPasswordsValidator']))
                                ) ? 'is-invalid' : ''"
                                name="rePassword"
                                formControlName="rePassword" 
            >
                                @if(passGroup?.get('rePassword')?.touched){
                                    <div className="form-text">
                                        @if(passGroup?.errors?.['matchPasswordsValidator'] ||
                                        passGroup?.get('rePassword')?.errors?.['required']){
                                            <p className="error">Repeat Password does not match password!</p>
                                        }
                                    </div>
                                } */}
                            </div>
                        </div>

                        {/* <button
                            type="submit"
                            className="btn btn-primary"
          [disabled]="form.invalid" 
          
        >
                        Register
                    </button> */}

                    <input className="btn btn-primary" type="submit" value="Register" />

                </form>

                <Link to="/login" className="card-link">Login</Link>
            </div>
        </div >
</div >

       </>
   );
}