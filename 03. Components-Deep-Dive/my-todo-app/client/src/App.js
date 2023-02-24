import Footer from "./components/Footer";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import ToDoList from "./components/ToDoList";

function App() {
    return (
        <div className="App">
            <Header />
            {/*<!-- Main content -->*/}
            <main className="main">

                {/*<!-- Section container -->*/}
                <section className="todo-list-container">
                    <h1>Todo List</h1>

                    <div className="add-btn-container">
                        <button className="btn">+ Add new Todo</button>
                    </div>

                    <div className="table-wrapper">
                        {/*<LoadingSpinner />*/}
                        <ToDoList />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default App;
