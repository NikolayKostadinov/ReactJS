import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAlertContext} from "../../contexts/AlertContext";
import {useAuthContext} from "../../contexts/AuthContext";
import useValidator from "../../hooks/useValidator";

import * as authService from "../../services/authService";

import styles from './Register.module.css';

const Register = () => {
    const [formState, setFormState] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        repass: ''
    });
    const alertContext = useAlertContext();
    const {userLogin} = useAuthContext();
    const validator = useValidator();

    const navigate = useNavigate();

    const onSubmit = (ev) => {
        ev.preventDefault();
        alertContext.hideAlert(false);
        if (!validator.hasErrors()) {
            alertContext.showLoading()
            authService.register(formState)
                .then(authData => {
                    userLogin(authData);
                    alertContext.showAlert('Вие се регистрирахте успешно в системата!', 'success', true);
                    navigate('/');
                })
                .catch(err => {
                    let message = "Възникна грешка при регистрация!";
                    if (err.message) {
                        message = (<><strong>Възникна грешка при регистрация!</strong> "{err.message || ''}"</>);
                    }
                    alertContext.showAlert(message, 'danger');
                })
                .finally(() => alertContext.hideLoading());
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
        <section id="register-page" className="transparent">
            <div className="overlay">
                <div className="container">
                    <form className={styles.register} onSubmit={onSubmit}>
                        <h1 className="mb-4 text-center">Регистрация</h1>
                        <div className="form-group">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className={validator.getFormControlValidClass("username")}
                                placeholder="Потребител"
                                onChange={onChange}
                                onBlur={(e) => {
                                    validator.minLengthValidator(e, 3)
                                }}
                                value={formState.username}
                            />
                            <p className="invalid-feedback">
                                Потребителското име требва да бъде поне 3 символа!
                            </p>
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                className={validator.getFormControlValidClass("firstname")}
                                placeholder="Име"
                                onChange={onChange}
                                onBlur={(e) => {
                                    validator.minLengthValidator(e, 2)
                                }}
                                value={formState.firstname}
                            />
                            <p className="invalid-feedback">
                                Името требва да бъде поне 2 символа!
                            </p>
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                className={validator.getFormControlValidClass("lastname")}
                                placeholder="Фамилия"
                                onChange={onChange}
                                onBlur={(e) => {
                                    validator.minLengthValidator(e, 3)
                                }}
                                value={formState.lastname}
                            />
                            <p className="invalid-feedback">
                                Фамилията трябва да бъде поне 3 символа!
                            </p>
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={validator.getFormControlValidClass("email")}
                                placeholder="maria@email.com"
                                onChange={onChange}
                                onBlur={validator.emailValidator}
                                value={formState.email}
                            />
                            <p className="invalid-feedback">
                                Невалидна електронна поща!
                            </p>
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className={validator.getFormControlValidClass("password")}
                                placeholder="Парола"
                                onChange={onChange}
                                onBlur={validator.requiredValidator}
                                value={formState.password}
                            />
                            <p className="invalid-feedback">
                                Въвеждането на парола е задължително!
                            </p>
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                name="repass"
                                id="confirm-password"
                                className={validator.getFormControlValidClass("repass")}
                                placeholder="Повторете паролата"
                                onChange={onChange}
                                onBlur={(e) => validator.samePasswordsValidator(e, formState.password)}
                                value={formState.repass}
                            />

                            <p className="invalid-feedback">
                                Паролите трябва да бъдат еднакви!
                            </p>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit"
                                    className="btn btn-primary"
                                    disabled={validator.hasErrors()}
                            >
                                Изпращане
                            </button>
                        </div>
                        <p className="mt-2 mb-0">
                            <span>
                                Ако сте регистриран можете да влезете от <Link to="/login">тук.</Link>
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
export default Register;
