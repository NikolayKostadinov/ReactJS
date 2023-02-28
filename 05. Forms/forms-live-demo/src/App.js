import { useState } from 'react';
import './App.css';
function App() {

    const [formState, setFormState] = useState({
        username: '',
        password: '',
        bio: '',
        age: '',
        gender: 'f',
        userType: 'individual',
        tac: false
    });

    function submitHandler(e) {
        e.preventDefault();
        console.log(formState);
    }

    function changeHandler(e) {
        setFormState({
            ...formState,
            [e.target.name]: (e.target.type === 'checkbox') ?
                e.target.checked
                : e.target.value
        });
    }

    // function changeCheckHandler(e) {
    //     setFormState({
    //         ...formState,
    //         [e.target.name]: e.target.checked
    //     });
    // }


    return (
        <div className="App">
            <header className="App-header">
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="username">User name: </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={changeHandler}
                            value={formState.username}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={changeHandler}
                            value={formState.password}
                        />
                    </div>

                    <div>
                        <label htmlFor="age">Age: </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            onChange={changeHandler}
                            value={formState.age}
                        />
                    </div>

                    <div>
                        <label htmlFor="bio">CV: </label>
                        <textarea
                            cols="30"
                            rows="10"
                            id="bio"
                            name="bio"
                            onChange={changeHandler}
                            value={formState.bio}
                        />
                    </div>

                    <div>
                        <label htmlFor="gendre"></label>
                        <select
                            name="gendre"
                            id="gendre"
                            value={formState.gender}
                            onChange={changeHandler}
                        >
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                        </select>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="userType"
                            id="individual-user-type"
                            value="individual"
                            checked={formState.userType === 'individual'}
                            onChange={changeHandler}
                        />
                        <label htmlFor="individual-user-type">Individual</label>
                        <br />
                        <input
                            type="radio"
                            name="userType"
                            id="corporate-user-type"
                            value="corporate"
                            checked={formState.userType === 'corporate'}
                            onChange={changeHandler}
                        />
                        <label htmlFor="corporate-user-type">Corporate:</label>
                    </div>

                    <div>
                        <label htmlFor="tac">Terms and Conditions:</label>
                        <input
                            type="checkbox"
                            name="tac"
                            id="tac"
                            checked={formState.tac}
                            onChange={changeHandler} />
                    </div>

                    <input type="submit" value="Login" />
                </form>
            </header>
        </div>
    );
}

export default App;
