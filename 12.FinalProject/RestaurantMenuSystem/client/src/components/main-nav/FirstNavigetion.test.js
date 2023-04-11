import {render, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import FirstNavigation from "./FirstNavigation.js";

describe('FirstNavigation component Test Suit' +
    '', () => {
    beforeEach(()=>{
        // arrange
        render(
            <MemoryRouter initialEntries={["/currentUri"]}>
                <FirstNavigation/>
                <Routes>
                    // dummy route
                    <Route path="/*" element={<p>User is authenticated</p>}/>
                </Routes>
            </MemoryRouter>
        );
    });
    test('FirstNavigation show correct heading', () => {
        // act
        let heading = screen.getByText('Електронно меню');
        // assert
        expect(heading).toBeInTheDocument();
    });

    test('FirstNavigation show contain home link', () => {
        // act
        let link = screen.getByRole('link');
        // assert
        expect(link).toHaveClass('navbar-brand');
        expect(link).toHaveAttribute('href', '/');
    });
});
