import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import * as authService from "../../services/authService";

const Register = () => {
    const [errors, setError] = useState([]);
    const [formState, setFormState] = useState({ email: '', password: '' });
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    function requiredValidator(e, minLenght) {
        addErrorState(e.target.name,
            formState[e.target.name].length < 1);
    }

    function samePasswordsValidator(e) {
        addErrorState(e.target.name, formState.password !== formState.repass);
    }

    function addErrorState(field, errorState) {
        setError(err => ({
            ...err,
            [field]: errorState
        }));
    }

    function emailValidator(e) {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let isValid = formState[e.target.name].match(validRegex);
        addErrorState(e.target.name, !isValid);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (Object.values(errors).every(v => !v)) {
            authService.register(formState.email, formState.password)
                .then(authData => {
                    userLogin(authData);
                    navigate('/');
                })
                .catch(() => {
                    navigate('/')
                })
        }
    }

    const onChange = (ev) => {
        setFormState(state =>
        ({
            ...state,
            [ev.target.name]: ev.target.value
        }));
    }
    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Register</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                        onChange={onChange}
                        onBlur={emailValidator}
                        value={formState.email}
                    />
                    {errors.email &&
                        <p className="form-error">
                            Invalid email!
                        </p>
                    }
                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        onChange={onChange}
                        onBlur={requiredValidator}
                        value={formState.name}
                    />
                    {errors.password &&
                        <p className="form-error">
                            Password is required!
                        </p>
                    }
                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        type="password"
                        name="repass"
                        id="confirm-password"
                        onChange={onChange}
                        onBlur={samePasswordsValidator}
                        value={formState.name}
                    />
                    {errors.repass &&
                        <p className="form-error">
                            Passwords must be the same!
                        </p>
                    }
                    <input className="btn submit" type="submit" defaultValue="Register" />
                    <p className="field">
                        <span>
                            If you already have profile click <Link to="/login">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
}
export default Register;