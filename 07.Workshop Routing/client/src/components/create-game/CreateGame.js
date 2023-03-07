import './CreateGame.modul.css';
import { useState } from "react";
import { v4 } from "uuid";

const CreateGame = ({ addGame }) => {
    const [errors, setError] = useState({});
    const [formState, setFormState] = useState({
        _id: v4(),
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: '',
        _createdOn: Date.now()
    });

    const addCommentHandler = (ev) => {
        ev.preventDefault();
        if (Object.values(errors).every(v=>!v))
            addGame(formState);
    }

    const onChange = (ev) => {
        setFormState(formState => ({
            ...formState,
            [ev.target.name]: ev.target.value,
        }))
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

    // function emailValidator(e) {
    //     var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //     let isValid = formState[e.target.name].match(validRegex);

    //     addErrorState(e.target.name, !isValid);
    // }

    function imgUrlValidator(e) {
        var validRegex = /\.(jpg|jpeg|png|webp|avif|gif)$/;
        let isValid = formState[e.target.name].match(validRegex);

        addErrorState(e.target.name, !isValid);
    }

    function positiveNumberValidator(e) {
        addErrorState(e.target.name,
            Number(formState[e.target.name]) <= 0);
    }

    function requiredValidator(e) {
        return minLenghtValidator(e, 1);
    }

    return (
        <section id="create-page" className="auth" >
            <form id="create" onSubmit={addCommentHandler}>
                <div className="container">
                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter game title..."
                        onChange={onChange}
                        defaultValue={formState.title}
                        onBlur={(e) => minLenghtValidator(e, 3)}
                    />
                    {errors.title &&
                        <p className="form-error">
                            Title should be at least 3 characters long!
                        </p>
                    }
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter game category..."
                        onChange={onChange}
                        defaultValue={formState.category}
                        onBlur={requiredValidator}
                    />
                    {errors.category &&
                        <p className="form-error">
                            Category is required!
                        </p>
                    }
                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        placeholder={1}
                        onChange={onChange}
                        defaultValue={formState.maxLevel}
                        onBlur={positiveNumberValidator}
                    />
                    {errors.maxLevel &&
                        <p className="form-error">
                            Must be a positive number!
                        </p>}
                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Upload a photo..."
                        onChange={onChange}
                        defaultValue={formState.imageUrl}
                        onBlur={imgUrlValidator}
                    />
                     {errors.imageUrl &&
                        <p className="form-error">
                            Invsalid image url!
                        </p>
                    }
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary"
                        id="summary"
                        onChange={onChange}
                        defaultValue={formState.summary} />
                    <input
                        className="btn submit"
                        type="submit"
                        defaultValue="Create Game"
                        disabled={Object.values(errors).some(v => v)}
                    />
                </div>
            </form>
        </section>
    );
}
export default CreateGame;