import { useEffect } from "react";
import Book from "./Book";

export default function BookList(props) {
   
    useEffect(() => {
        console.log('Mounting');
    });


    return (
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <ul role="list">
            {props.books.map((book, ix) => <Book key={ix} {...book} />)}
        </ul>
    );
}