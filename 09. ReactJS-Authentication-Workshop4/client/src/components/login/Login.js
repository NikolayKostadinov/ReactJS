import { useContext,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import * as authService from "../../services/authService";

const Login = () => {
    const [errors, setError] = useState([]);
    const [formState, setFormState] = useState({ email: '', password: '' });
    const {userLogin} =  useContext(AuthContext);
    const navigate = useNavigate();

    function requiredValidator(e, minLenght) {
        addErrorState(e.target.name,
            formState[e.target.name].length < 1);
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
            authService.login(formState.email, formState.password)
            .then(authData => {
                userLogin(authData);
                navigate('/');
            })
            .catch(()=>{
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
        <section id="login-page" className="auth">
            <form id="login" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Sokka@gmail.com"
                        onChange={onChange}
                        onBlur={emailValidator}
                        value={formState.email}
                    />
                    {errors.email &&
                        <p className="form-error">
                            Invalid email!
                        </p>
                    }
                    <label htmlFor="login-pass">Password:</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        onChange={onChange}
                        onBlur={requiredValidator}
                        value={formState.name}
                    />
                    {errors.password &&
                        <p className="form-error">
                            Password is required!
                        </p>
                    }
                    <input type="submit" className="btn submit" defaultValue="Login" />
                    <p className="field">
                        <span>
                            If you don't have profile click <Link to="/register">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
}
export default Login;