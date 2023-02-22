import {useState} from "react";

export default function Clicker(props) {
    const [clicks, setClicks] = useState(0);

    function clickHandler(e) {
        setClicks(oldClk => oldClk + 1);
    }

    if (clicks > 20){
        return (
            <h2>Man you are clicker!</h2>
        );
    }
    return (
        <div>
            <h3>{clicks>10?
            "Medium Clicks":
            "Normal Clicks"}</h3>
            <button onClick={clickHandler}>{clicks}</button>
        </div>
    );
}
