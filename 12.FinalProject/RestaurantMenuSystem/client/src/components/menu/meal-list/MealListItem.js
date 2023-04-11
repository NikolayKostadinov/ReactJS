import { useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { storage } from "../../../services/utils/firebase"
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';
import { useAlertContext } from "../../../contexts/AlertContext";
import useValidator from "../../../hooks/useValidator";


const MealListItem = ({
    meal,
    onDeleteHandler,
    onUpdateHandler
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [formState, setFormState] = useState({ ...meal });

    const userContext = useAuthContext();
    const alertContext = useAlertContext();
    const validator = useValidator();

    const onChange = (ev) => {
        setFormState(state =>
        ({
            ...state,
            [ev.target.name]: ev.target.value
        }));
    }

    const onCancel = () => {
        setFormState({ ...meal });
        validator.clearErrors();
        setIsEdit(false);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (!validator.hasErrors()) {
            onUpdateHandler(formState);
            setIsEdit(false);
        }
    }

    const prepareFile = (event) => {
        uploadFile(event.target.files[0])
    }

    const uploadFile = (file) => {
        if (file == null) return;
        const imageRef = ref(storage, `meals/${file.name + v4()}`);
        uploadBytes(imageRef, file)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then(
                    url => {
                        setFormState(state =>
                        ({
                            ...state,
                            imageUrl: url
                        }));
                    });
            })
            .catch(err => {
                console.log(err);
                alertContext.showAlert('Неуспешно качване на изображение!', 'danger');
            })
            ;
    };

    return (isEdit
        ?
        <div className="col-md-6 mb-4">
            <form onSubmit={onSubmit}>
                <div className="custom-list">
                    <div className="img-holder">
                        <img
                            src={formState.imageUrl}
                            className="img-responsive"
                            alt={formState.title}
                        />
                        <input type="file" onChange={prepareFile} />
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
                                        Полето цена трябва да е положително!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group my-2">
                            <textarea rows="3"
                                name="ingredients"
                                className={`w-100 ${validator.getFormControlValidClass("ingredients", true)}`}
                                value={formState.ingredients}
                                onChange={onChange}
                                onBlur={validator.requiredValidator}
                                placeholder="Съставки"
                            ></textarea>
                            <p className="invalid-feedback">
                                Въвеждането на съставки е задължително!
                            </p>
                        </div>
                        <div className="body pt-0">
                            <div className="meal-management">
                                <button type="submit" className="btn btn-sm btn-primary" disabled={validator.hasErrors()}>
                                    <i className="fa-solid fa-floppy-disk"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-primary" onClick={onCancel}>
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        : <div className="col-md-6 mb-4">
            <div className="custom-list">
                <div className="img-holder">
                    <img
                        src={meal.imageUrl}
                        className="img-responsive"
                        alt={meal.title}
                    />
                </div>
                <div className="info">
                    <div className="head clearfix">
                        <h5 className="title float-left">{meal.title}</h5>
                        <p className="float-right text-primary">{meal.price.toFixed(2)} лв.</p>
                    </div>
                    <div className="body">
                        <p>{meal.ingredients}</p>
                        {userContext.isAuthenticated && userContext.user._id === meal._ownerId &&
                            <div className="meal-management">
                                <button type="button" className="btn btn-sm btn-primary" onClick={() => setIsEdit(true)}>
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-primary" onClick={() => onDeleteHandler(meal._id)}>
                                    <i className="fa-regular fa-trash-can"></i>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MealListItem;
