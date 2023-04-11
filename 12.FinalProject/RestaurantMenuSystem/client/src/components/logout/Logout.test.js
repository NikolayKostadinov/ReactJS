import {cleanup, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {act} from "react-dom/test-utils";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {AlertContext} from "../../contexts/AlertContext.js";
import {AuthContext} from "../../contexts/AuthContext.js";
import * as authService from "../../services/authService.js";
import MainNavigation from "../main-nav/MainNavigation.js";
import {MenuFilteringContext} from "../../contexts/MenuFilteringContext.js";
import Logout from "./Logout.js";

describe('Logout Component Tests Suit', function () {

    const mockUser = {
        username: 'username',
        firstname: 'Fname',
        lastname: 'Lname',
        fullname: 'Full Name'
    }

    const mockSetFilter = jest.fn();
    const mockClearFilter = jest.fn();

    beforeEach(() => {
        cleanup();
    })

    test('Will call logout method', async () => {
        // arrange
        const mockContextUserLogout = jest.fn();

        const mockAuthServiceLogout = jest.fn(() => {
            return Promise.resolve("User logged Out");
        });

        jest.spyOn(authService, 'logout').mockImplementation(mockAuthServiceLogout);

        const showAlert = jest.fn((data) => {
            console.log(data);
        });

        act(() => {
            render(
                <AuthContext.Provider
                    value={{user: mockUser, userLogout: mockContextUserLogout, isAuthenticated: true}}>
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
                            <MenuFilteringContext.Provider value={{
                                product: '',
                                setFilter: mockSetFilter,
                                clearFilter: mockClearFilter
                            }}>
                                <Routes>
                                    // dummy route
                                    <Route path="/logout" element={<Logout/>}/>
                                    <Route path="/*" element={<MainNavigation/>}/>
                                </Routes>
                            </MenuFilteringContext.Provider>
                        </MemoryRouter>
                    </AlertContext.Provider>
                </AuthContext.Provider>
            );
        });

        // act
        const logout = screen.getByText('Изход');

        act(() => {
            fireEvent.click(logout);
        });

        // assert
        await waitFor(() => {
            expect(mockAuthServiceLogout).toHaveBeenCalledTimes(1);
            expect(mockContextUserLogout).toHaveBeenCalledTimes(1);
        });
    });


    test('On error will not call userLogout', async () => {
        // arrange
        const mockContextUserLogout = jest.fn();

        const mockAuthServiceLogout = jest.fn(() => {
            return Promise.reject("User logged Out");
        });

        jest.spyOn(authService, 'logout').mockImplementation(mockAuthServiceLogout);

        const showAlert = jest.fn((data) => {
            console.log(data);
        });

        const home = jest.fn();

        act(() => {
            render(
                <AuthContext.Provider
                    value={{user: mockUser, userLogout: mockContextUserLogout, isAuthenticated: true}}>
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
                            <MenuFilteringContext.Provider value={{
                                product: '',
                                setFilter: mockSetFilter,
                                clearFilter: mockClearFilter
                            }}>
                                <Routes>
                                    // dummy route
                                    <Route path="/" element={<>Home</>}/>
                                    <Route path="/logout" element={<Logout/>}/>
                                    <Route path="/*" element={<MainNavigation/>}/>
                                </Routes>
                            </MenuFilteringContext.Provider>
                        </MemoryRouter>
                    </AlertContext.Provider>
                </AuthContext.Provider>
            );
        });

        // act
        const logout = screen.getByText('Изход');

        act(() => {
            fireEvent.click(logout);
        });

        // assert
        await waitFor(() => {
            expect(mockAuthServiceLogout).toHaveBeenCalledTimes(1);
            expect(screen.getByText('Home')).toBeInTheDocument();
        });
    });
});
