import {cleanup, getByText, render, screen} from "@testing-library/react";
import {act} from "react-dom/test-utils";
import {AuthContext} from "../../contexts/AuthContext.js";
import {AlertContext} from "../../contexts/AlertContext.js";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import * as restaurantService from '../../services/restaurantService';
import Home from "./Home.js";



const userLogin = jest.fn((authData) => {
    console.log(authData)
});

const mockUser = {
    username: 'username',
    firstname: 'Fname',
    lastname: 'Lname'
}

describe('Home component Test Suit', () => {
    beforeEach(() => {
        cleanup();
    })
    test('Home component will have 2 restaurants initialized on start', async () => {

        // arrange
        jest.spyOn(restaurantService, 'getAll').mockImplementation(() => {
            return Promise.resolve([
                {_id: 1, title: "Restaurant1"},
                {_id: 2, title: "Restaurant2"}
            ])
        });

        render(
            <AuthContext.Provider value={{mockUser, userLogin}}>
                <AlertContext.Provider
                    value={{
                        showAlert: jest.fn(),
                        hideAlert: jest.fn(),
                        setAlertMessage: jest.fn(),
                        setAlertType: jest.fn(),
                        showLoading: jest.fn(),
                        hideLoading: jest.fn()
                    }}
                >
                    <MemoryRouter initialEntries={["/currentUri"]}>
                        <Routes>
                            // dummy route
                            <Route path="/*" element={<Home/>}/>
                        </Routes>
                    </MemoryRouter>
                </AlertContext.Provider>
            </AuthContext.Provider>
        );

        // act

        const r1 = await screen.findByText("Restaurant1");
        const r2 = await screen.findByText("Restaurant2");

        // assert
        expect(r1).toBeInTheDocument();
        expect(r2).toBeInTheDocument();
    });

    test('Home component will show alert on error', async () => {

        // arrange
        jest.spyOn(restaurantService, 'getAll').mockImplementation(() => {
            return Promise.reject("Some error");
        });

        const showAlert = jest.fn((data) => { });

        await act(() => {
            render(
                <AuthContext.Provider value={{mockUser, userLogin}}>
                    <AlertContext.Provider
                        value={{
                            showAlert: showAlert,
                            hideAlert: jest.fn(),
                            setAlertMessage: jest.fn(),
                            setAlertType: jest.fn(),
                            showLoading: jest.fn(),
                            hideLoading: jest.fn()
                        }}
                    >
                        <MemoryRouter initialEntries={["/currentUri"]}>
                            <Routes>
                                // dummy route
                                <Route path="/*" element={<Home/>}/>
                            </Routes>
                        </MemoryRouter>
                    </AlertContext.Provider>
                </AuthContext.Provider>
            );
        })


        // assert
        expect(showAlert).toHaveBeenCalledTimes(1)
        expect(showAlert).toHaveBeenCalledWith('Неуспешна операция!', 'danger');
    });
})
