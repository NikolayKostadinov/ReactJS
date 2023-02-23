import { useState, useEffect } from "react";
import styles from './Book.module.css';

export default function Book(props) {
    const [highlited, setHighlited] = useState(false);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        console.log('Mounting' + props.title);
    }, [])

    useEffect(() => {
        console.log('Updated ' + props.title);
    }, [highlited, deleted])

    const clickHandler = () => {
        setHighlited(state => !state);
    }

    const deleteHandler = () => {
        setDeleted(deleted => !deleted);
    }

    let style = {}

    if (highlited) {
        style.backgroundColor = 'lightsalmon';
    }

    if (deleted) {
        style.backgroundColor = 'red';
    }

    return (
        <li style={style} className={styles['book-item']}>
            <article>
                <h2>{deleted ? 'Deleted' : props.title }</h2>
                <div>Year: {props.year}</div>
                <div>Price: {props.price}</div>
                <footer>
                    <span className={styles.author}>Author: {props.author}</span>   
                    <button onClick={clickHandler}>Hihlite</button>
                    <button onClick={deleteHandler}>Delete</button>
                </footer>
            </article>
        </li>
    );
}
