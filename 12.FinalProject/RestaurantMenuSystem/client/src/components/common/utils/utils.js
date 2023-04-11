export const getFormControlClass = (error, isSmall) => `form-control ${isSmall?'form-control-sm':null} ${error ? 'is-invalid' : null}`;
export const hasError = (errors) => Object.values(errors).some(x => x);

export const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

export const delay = (duration)=> {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}
