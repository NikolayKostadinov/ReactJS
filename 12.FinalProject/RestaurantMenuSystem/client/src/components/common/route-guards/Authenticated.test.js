import {cleanup, render, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import React from "react";
import {AuthContext} from "../../../contexts/AuthContext.js";
import Authenticated from "./Authenticated.js";

describe('Authenticated route guard Tests Suit', function () {
    beforeEach(() => {

        }
    );
    afterEach(() => {
            jest.restoreAllMocks();
            cleanup();
        }
    );

    test('Shows content if user is authenticated', () => {
        render(
            <AuthContext.Provider value={{isAuthenticated: true}}>
                <MemoryRouter initialEntries={["/currentUri"]}>
                    <Routes>
                        // dummy route
                        <Route element={<Authenticated/>}>
                            <Route path="/*" element={<p>User is authenticated</p>}/>
                        </Route>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const message = screen.getByText("User is authenticated");

        expect(message).toBeInTheDocument();
    })

    test('Hides content if user not authenticated', () => {
        render(
            <AuthContext.Provider value={{isAuthenticated: false}}>
                <MemoryRouter initialEntries={["/currentUri"]}>
                    <Routes>
                        // dummy route
                        <Route element={<Authenticated/>}>
                            <Route path="/*" element={<p>User is authenticated</p>}/>
                        </Route>
                        <Route path="/login" element={<p>Login form</p>}/>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const message = screen.getByText("Login form");

        expect(message).toBeInTheDocument();
    })
})
