export default function Hello({name, greeting, logo}){
    return <div>
        <h1>{greeting},  {name}!</h1>
        <img src={logo} className="App-logo" alt="logo" />
    </div>;
}