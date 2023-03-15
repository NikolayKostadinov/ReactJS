import React from "react";
import ReactDOM  from "react-dom/client";
import JokeArticle from "./JokeArticle";

describe('JokeArticles.TestsSuit', () => {
    test('Shold be true', () => {
        const text = 'Chuck Norris something funny';
        const container  = document.createElement('div');
        document.body.appendChild(container);
        const root = ReactDOM.createRoot(container);
        root.render(<JokeArticle text={text}/>)
        const actual = document.querySelector('.joke-text').textContent;
        expect(actual).toBeTruthy;
    });
});

