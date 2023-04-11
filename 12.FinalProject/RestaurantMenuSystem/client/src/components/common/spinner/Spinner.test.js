import {render, screen} from "@testing-library/react";
import {AlertContext} from "../../../contexts/AlertContext.js";
import Spinner from "./Spinner.js";

describe('Spinner Component Visible Tests Suit', function () {

    test('Spinner must be visible if loading is true', async () => {
        // arrange
        render(
            <AlertContext.Provider
                value={{loading: true}}
            >
                <Spinner/>
            </AlertContext.Provider>);

        // act
        const spinner = document.querySelector('.lds-spinner');

        // assert
        expect(spinner).not.toBeNull();
    })

    test('Spinner must be visible if loading is false', async () => {
        // arrange
        render(
            <AlertContext.Provider
                value={{loading: false}}
            >
                <Spinner/>
            </AlertContext.Provider>);

        // act
        const spinner = document.querySelector('.lds-spinner');

        // assert
        expect(spinner).toBeNull();
    })
});
