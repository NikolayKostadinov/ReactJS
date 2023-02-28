import './App.css';

function submitHandler(e){
// uncontrolled components
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    console.log(username);
    console.log(password);
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="username">User name: </label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <input type="submit" value="Login" />
                </form>
            </header>
        </div>
    );
}

export default App;
