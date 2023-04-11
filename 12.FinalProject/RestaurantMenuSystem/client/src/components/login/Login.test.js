import {act, cleanup, createEvent, fireEvent, render, screen} from "@testing-library/react";
import React from 'react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {AlertContext} from "../../contexts/AlertContext.js";
import {AuthContext} from "../../contexts/AuthContext.js";
import Login from "./Login.js";

describe('Login component Tests Suit', function () {

    const userLogin = jest.fn((authData) => {
        console.log(authData)
    });

    const showAlert = jest.fn((authData) => {
        console.log(authData)
    });

    const mockUser = {
        username: 'username',
        firstname: 'Fname',
        lastname: 'Lname'
    }

    beforeEach(() => {
        delete window.location;
        window.location = {pathname: '/login'};

        render(
            <AuthContext.Provider value={{userLogin}}>
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
                            <Route path="/*" element={<Login/>}/>
                        </Routes>
                    </MemoryRouter>
                </AlertContext.Provider>
            </AuthContext.Provider>
        )
    });

    afterEach(() => {
        cleanup();
        jest.restoreAllMocks();
    });


    test('Login form shows', async () => {
        // act
        const heading = await screen.findByText('Вход в системата');
        const userNameInput = document.getElementById('username')
        const passWordInput = document.getElementById('password');

        // assert
        expect(heading).toBeInTheDocument();
        expect(userNameInput).toBeInTheDocument();
        expect(passWordInput).toBeInTheDocument();
        expect(passWordInput).toHaveAttribute('type', 'password');
    });

    test('OnChange correct username', async () => {
        const userNameInput = document.getElementById('username')

        // act
        fireEvent.change(userNameInput,
            createEvent('input', userNameInput, {
                target: {value: 'user'},
            }));

        // assert
        expect(userNameInput.value).toBe('user');
    });

    test('OnChange correct password', async () => {
        const passwordNameInput = document.getElementById('password')

        // act
        fireEvent.change(passwordNameInput,
            createEvent('input', passwordNameInput, {
                target: {value: 'password'},
            }));

        // assert
        expect(passwordNameInput.value).toBe('password');
    });

    test('OnBlur not empty username password no error message', async () => {
        const userNameInput = document.getElementById('username')

        // act
        fireEvent.blur(userNameInput,
            createEvent('input', userNameInput, {
                target: {value: 'username'},
            }));

        // assert
        expect(userNameInput).not.toHaveClass('is-invalid');
    });

    test('OnBlur not empty username password show error message', async () => {
        const userNameInput = document.getElementById('username')

        // act
        fireEvent.blur(userNameInput,
            createEvent('input', userNameInput, {
                target: {value: ''},
            }));

        // assert
        expect(userNameInput).toHaveClass('is-invalid');
    });


    test('OnBlur not empty password password no error message', async () => {
        const passwordInput = document.getElementById('password')

        // act
        fireEvent.blur(passwordInput,
            createEvent('input', passwordInput, {
                target: {value: 'P@ssw0rd'},
            }));

        // assert
        expect(passwordInput).not.toHaveClass('is-invalid');
    });

    test('OnBlur empty password password show error message', async () => {
        const passwordInput = document.getElementById('username')

        // act
        fireEvent.blur(passwordInput,
            createEvent('input', passwordInput, {
                target: {value: ''},
            }));

        // assert
        expect(passwordInput).toHaveClass('is-invalid');
    });

    test('Onsubmit correct username and pass show full name', async () => {

        // arrange
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockUser)
            })
        );

        const userNameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const form = document.querySelector('form');

        // act
        await act(() => {
            fireEvent.change(userNameInput,
                createEvent('input', userNameInput, {
                    target: {value: 'user'},
                }));

            fireEvent.change(passwordInput,
                createEvent('input', passwordInput, {
                    target: {value: 'password'},
                }));

            fireEvent.submit(form);
        });

        //assert
        expect(userLogin).toHaveBeenCalledWith(mockUser);
    })

    test('Onsubmit not correct username or pass show Error', async () => {

        // arrange
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                status: 403,
                ok: false,
                json: () => Promise.resolve(mockUser)
            })
        );

        const userNameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const form = document.querySelector('form');

        // act
        await act(() => {
            fireEvent.change(userNameInput,
                createEvent('input', userNameInput, {
                    target: {value: 'user'},
                }));

            fireEvent.change(passwordInput,
                createEvent('input', passwordInput, {
                    target: {value: 'password'},
                }));

            fireEvent.submit(form);
        });

        //assert
        expect(showAlert).toHaveBeenCalledWith('Невалидно потребителско име или парола', 'danger');

    });

    test('Onsubmit if has error status show Error', async () => {
        // arrange

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                status: 400,
                ok: false,
                json: () => Promise.resolve(mockUser)
            })
        );

        const userNameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const form = document.querySelector('form');

        // act
        await act(() => {
            fireEvent.change(userNameInput,
                createEvent('input', userNameInput, {
                    target: {value: 'user'},
                }));

            fireEvent.change(passwordInput,
                createEvent('input', passwordInput, {
                    target: {value: 'password'},
                }));

            fireEvent.submit(form);
        });

        //assert
        expect(showAlert).toHaveBeenCalledWith('Неуспешна операция', 'danger');

    })
});
