const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const reactElement = (
    <header className="site-header">
        <h1>Hello from JSX!</h1>
        <h2>The most popular framework!!!</h2>
    </header>
);

root.render(reactElement);