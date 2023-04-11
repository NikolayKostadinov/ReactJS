import brand from '../../assets/imgs/navbar-brand.png';

const Error = (
    {
        code,
        message
    }) => {
    return(
        <section className="transparent">
            <div className="overlay extended">
                <img
                    src={brand}
                    alt="Logo"
                    className="logo"
                />
                <h2 className="subtitle">Съжаляваме за неудобството</h2>
                <h1 className="title text-center">{code}</h1>
                <h2 className="subtitle">{message}</h2>
                <div className="bg-primary delimiter"></div>
            </div>
        </section>
    );
}

export default Error;
