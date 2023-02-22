import {useState} from "react";

export default function Counter(props) {
    const [count, setCount] = useState(props.start || 0);

    function decreaseHandler() {
        setCount(c => c - 1);
    }

    function increaseHandler() {
        setCount(c => c + 1);
    }

    function clear() {
        setCount(() => 0);
    }

    let title = '';
    if (count < 10) {
        title = 'Counter';
    } else if (count < 30) {
        title = 'Turbo counter';
    } else {
        title = 'Mega counter';
    }

    return (
        <div>
            <h1>{title}</h1>
            <h2>{count}</h2>
            <button onClick={decreaseHandler}>-</button>
            <button onClick={clear}>Clear</button>
            <button onClick={increaseHandler}>+</button>
        </div>
    );
}
