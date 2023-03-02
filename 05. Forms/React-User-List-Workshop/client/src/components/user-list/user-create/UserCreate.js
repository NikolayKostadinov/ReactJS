import { useState } from 'react';
export default function UserCreate({
    onClose,
    onUserCreate
}) {
    const [errors, setError] = useState({});
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        imageUrl: "",
        phoneNumber: "",
        country: "",
        city: "",
        street: "",
        streetNumber: ""
    });

    function changeHandler(e) {
        setFormState({
            ...formState,
            [e.target.name]: (e.target.type === 'checkbox') ?
                e.target.checked
                : e.target.value
        });
    }

    function submitHandler(e) {
        e.preventDefault();
        const { country, city, street, streetNumber, ...userData } = formState;
        userData.address = { country, city, street, streetNumber };
        onUserCreate(userData);
    }

    function minLenghtValidator(e, minLenght) {
        addErrorState(e.target.name, 
            formState[e.target.name].length < minLenght);
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

    function imgUrlValidator(e) {
        var validRegex = /\.(jpg|jpeg|png|webp|avif|gif)$/;
        let isValid = formState[e.target.name].match(validRegex);

        addErrorState(e.target.name, !isValid);
    }

    function positiveNumberValidator(e){
        addErrorState(e.target.name, 
            Number(formState[e.target.name]) <= 0);
    }

    return (
        <div className="overlay">
            <div className="backdrop" onClick={onClose} />
            <div className="modal">
                <div className="user-container">
                    <header className="headers">
                        <h2>Add User</h2>
                        <button className="btn close" onClick={onClose}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                                className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path fill="currentColor"
                                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                                </path>
                            </svg>
                        </button>
                    </header>
                    <form onSubmit={submitHandler}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First name</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input id="firstName" name="firstName" type="text"
                                        value={formState.firstName}
                                        onChange={changeHandler}
                                        onBlur={(e) => minLenghtValidator(e, 3)}
                                    />
                                </div>
                                {errors.firstName &&
                                    <p className="form-error">
                                        First name should be at least 3 characters long!
                                    </p>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last name</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input id="lastName" name="lastName" type="text"
                                        value={formState.lastName}
                                        onChange={changeHandler}
                                        onBlur={(e) => minLenghtValidator(e, 3)}
                                    />
                                </div>
                                {errors.lastName &&
                                    <p className="form-error">
                                        Last name should be at least 3 characters long!
                                    </p>
                                }
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-envelope"></i></span>
                                    <input id="email" name="email" type="text"
                                        value={formState.email}
                                        onChange={changeHandler}
                                        onBlur={emailValidator} />
                                </div>
                                {errors.email &&
                                    <p className="form-error">Email is not valid!</p>
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone number</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-phone"></i></span>
                                    <input id="phoneNumber" name="phoneNumber" type="text"
                                        value={formState.phoneNumber}
                                        onChange={changeHandler}
                                        onBlur={(e) => minLenghtValidator(e, 6)}
                                    />
                                </div>
                                {errors.phoneNumber &&
                                    <p className="form-error">Phone number is not valid!</p>
                                }
                            </div>
                        </div>

                        <div className="form-group long-line">
                            <label htmlFor="imageUrl">Image Url</label>
                            <div className="input-wrapper">
                                <span><i className="fa-solid fa-image"></i></span>
                                <input id="imageUrl" name="imageUrl" type="text"
                                    value={formState.imageUrl}
                                    onChange={changeHandler}
                                    onBlur={imgUrlValidator}
                                />
                            </div>
                            {errors.imageUrl &&
                                <p className="form-error">ImageUrl is not valid!</p>
                            }
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-map"></i></span>
                                    <input id="country" name="country" type="text"
                                        value={formState.country}
                                        onChange={changeHandler}
                                        onBlur={(e) => minLenghtValidator(e, 2)}
                                    />
                                </div>
                                {errors.country &&
                                    <p className="form-error">
                                        Country should be at least 2 characters long!
                                    </p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-city"></i></span>
                                    <input id="city" name="city" type="text"
                                        value={formState.city}
                                        onChange={changeHandler}
                                        onBlur={(e) => minLenghtValidator(e, 3)}
                                    />
                                </div>
                                {errors.lastName &&
                                    <p className="form-error">
                                        City should be at least 3 characters long!
                                    </p>
                                }
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="street">Street</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-map"></i></span>
                                    <input id="street" name="street" type="text"
                                        value={formState.street}
                                        onChange={changeHandler}
                                        onBlur={(e) => minLenghtValidator(e, 3)}
                                    />
                                </div>
                                {errors.street &&
                                    <p className="form-error">
                                        Street should be at least 3 characters long!
                                    </p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="streetNumber">Street number</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-house-chimney"></i></span>
                                    <input id="streetNumber" name="streetNumber" type="text"
                                        value={formState.streetNumber}
                                        onChange={changeHandler}
                                        onBlur={positiveNumberValidator}
                                    />
                                </div>
                                {errors.streetNumber &&
                                    <p className="form-error">
                                        Street number should be a positive number!
                                    </p>
                                }
                            </div>
                        </div>
                        <div id="form-actions">
                            <button id="action-save" className="btn" type="submit" disabled ={Object.values(errors).some(v=>v)}>Save</button>
                            <button id="action-cancel" className="btn" type="button" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}