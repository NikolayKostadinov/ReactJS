import { useState } from "react";

const useValidator = () => {
    const [errors, setErrors] = useState([]);

    const getFormControlValidClass = (name, isSmall) => `form-control ${isSmall ? 'form-control-sm' : null} ${errors[name] ? 'is-invalid' : null}`;

    const hasErrors = () => Object.values(errors).some(x => x);

    const requiredValidator = (e) => {
        addErrorState(e.target.name,
            e.target.value?.length < 1);
    }

    const positiveValidator = (e) => {
        addErrorState(e.target.name,
            Number(e.target?.value) <= 0);
    }

    const minLengthValidator = (e, minLenght) => {
        addErrorState(e.target.name,
            e.target.value.length < minLenght);
    }

    const samePasswordsValidator = (e, otherPassword) => {
        addErrorState(e.target.name, e.target.value !== otherPassword);
    }

    const emailValidator = (e) => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const isValid = e.target.value.match(validRegex);
        addErrorState(e.target.name, !isValid);
    }

    const clearErrors = () => {
        setErrors([]);
    }

    const addErrorState = (field, errorState) => {
        setErrors(err => ({
            ...err,
            [field]: errorState
        }));
    }

    return ({
        clearErrors,
        hasErrors,
        getFormControlValidClass,
        requiredValidator,
        positiveValidator,
        minLengthValidator,
        samePasswordsValidator,
        emailValidator
    })
}


export default useValidator;
