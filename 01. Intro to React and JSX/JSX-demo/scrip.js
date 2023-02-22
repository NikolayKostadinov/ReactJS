var rootElement = document.getElementById("root");
var root = ReactDOM.createRoot(rootElement);

// const reactElement = React.createElement(
//     'header',
//     { className: 'site-header' },
//     React.createElement('h1', {}, 'Hello from React!!!'),
//     React.createElement('h2', {}, 'The most popular framework!')
// );

var reactElement = React.createElement(
    "header",
    { className: "site-header" },
    React.createElement(
        "h1",
        null,
        "Hello from JSX"
    ),
    React.createElement(
        "h2",
        null,
        "The most popular framework!"
    )
);

root.render(reactElement);