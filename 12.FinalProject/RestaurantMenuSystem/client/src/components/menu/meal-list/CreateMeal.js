import {useEffect, useState} from "react";
import {useAlertContext} from "../../../contexts/AlertContext";
import useValidator from "../../../hooks/useValidator";
import useUploadImg from "../../../hooks/useUploadImg";

const CreateMeal = ({
                        isCreate,
                        restaurantId,
                        mealType,
                        onCreateHandler,
                        unloadCreate
                    }) => {
    const initialFormState = {restaurantId, mealType};
    const [formState, setFormState] = useState({...initialFormState});
    const validator = useValidator();
    const alertContext = useAlertContext();
    const {uploadImage} = useUploadImg();

    const setResult = (fieldName, value) => {
        setFormState(state =>
            ({
                ...state,
                [fieldName]: value
            }));
    }

    const onChange = (ev) => {
        setResult(ev.target.name, ev.target.value);
    }

    const onCancel = (ev) => {
        ev.preventDefault();
        setFormState({...initialFormState});
        validator.clearErrors();
        unloadCreate();
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (!validator.hasErrors()) {
            onCreateHandler(formState);
        }
        setFormState({...initialFormState});
    }

    const uploadMealImage = (e) => {
        alertContext.showLoading();
        uploadImage('meals', e)
            .then(url => {
                setResult('imageUrl', url);
            })
            .catch(err => {
                console.log(err);
                alertContext.showAlert('Неуспешна операция!', 'danger');
            })
            .finally(() => alertContext.hideLoading());
    }

    if (!isCreate) return null;

    return (
        <div className="dark-form-overlay">
            <div className="col-md-6 mb-4 create-form-wrapper">
                <form onSubmit={onSubmit} className="create-form">
                    <h1 className="title text-center mb-4">Създаване на ястие</h1>
                    <div className="custom-list">
                        <div className="img-holder">
                            <div className="img-wrapper">
                                <img
                                    src={formState.imageUrl}
                                    className="img-responsive"
                                    alt={formState.title}
                                />
                            </div>
                            <label htmlFor="file" className="btn btn-sm btn-primary">Качи картинка</label>
                            <input id="file" type="file" accept="image/*" onChange={uploadMealImage}
                                   style={{"display": "none"}}/>
                        </div>
                        <div className="info">
                            <div className="head clearfix pb-0">
                                <div className="row">
                                    <div className="form-group col-sm-9 mb-2">
                                        <input
                                            type="text"
                                            name="title"
                                            className={validator.getFormControlValidClass("title", true)}
                                            placeholder="Название"
                                            value={formState.title}
                                            onChange={onChange}
                                            onBlur={validator.requiredValidator}
                                        />
                                        <p className="invalid-feedback">
                                            Полето название е задължително!
                                        </p>
                                    </div>
                                    <div className="form-group col-sm-3 mb-0">
                                        <input
                                            type="text"
                                            name="price"
                                            className={validator.getFormControlValidClass("price", true)}
                                            value={formState.price}
                                            onChange={onChange}
                                            onBlur={validator.positiveValidator}
                                            placeholder="Цена"
                                        />
                                        <p className="invalid-feedback">
                                            Полето цена трябва да е полoжително!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group my-2">
                                <textarea rows="3"
                                          type="text"
                                          name="ingredients"
                                          className={`w-100 ${validator.getFormControlValidClass("ingredients", true)}`}
                                          value={formState.ingredients}
                                          onChange={onChange}
                                          onBlur={validator.requiredValidator}
                                          placeholder="Съставки"
                                >
                                </textarea>
                                <p className="invalid-feedback">
                                    Въвеждането на съставки е задължително!
                                </p>
                            </div>
                            <div className="meal-management">
                                <button type="submit" className="btn btn-sm btn-primary"
                                        disabled={validator.hasErrors()}>
                                    <i className="fa-solid fa-floppy-disk"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-primary" onClick={onCancel}>
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreateMeal;
