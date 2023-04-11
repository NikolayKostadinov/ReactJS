import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import styles from './Login.module.css';

import * as authService from "../../services/authService";
import { useAlertContext } from "../../contexts/AlertContext";
import useValidator from "../../hooks/useValidator";

const Login = () => {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const authContext = useAuthContext();
    const alertContext = useAlertContext();
    const navigate = useNavigate();
    const validator = useValidator();

    const onSubmit = (ev) => {
        ev.preventDefault();
        alertContext.hideAlert();
        if (!validator.hasErrors()) {
            alertContext.showLoading();
            authService.login(formState.username, formState.password)
                .then(authData => {
                    authContext.userLogin(authData);
                    navigate('/');
                })
                .catch((err) => {
                    if (err.code && (err.code === 401 || err.code === 403)) {
                        alertContext.showAlert('Невалидно потребителско име или парола', 'danger');
                    } else {
                        alertContext.showAlert('Неуспешна операция', 'danger');
                    }
                })
                .finally(()=>alertContext.hideLoading())
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
        <section id="login-page" className="transparent extended">
            <div className="overlay extended">
                <div className="container">
                    <form className={styles.login} onSubmit={onSubmit} autoComplete="new-password">
                        <div className="brand-logo" />
                        <h1 className="mb-4">Вход в системата</h1>
                        <div className="form-group">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className={validator.getFormControlValidClass('username')}
                                placeholder="Потребител"
                                onChange={onChange}
                                onBlur={validator.requiredValidator}
                            />
                            <p className="invalid-feedback">
                                Полето потребител е задължително!
                            </p>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={validator.getFormControlValidClass("password")}
                                placeholder="Парола"
                                onChange={onChange}
                                onBlur={validator.requiredValidator}
                                value={formState.name}
                            />
                            <p className="invalid-feedback">
                                Полето парола е задължително!
                            </p>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary" disabled={validator.hasErrors()}>Вход</button>
                        </div>
                        <p className="mt-2 mb-0">
                            <span>
                                Ако нямате профил можете да се регистрирате <Link to="/register">тук</Link>
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
export default Login;
