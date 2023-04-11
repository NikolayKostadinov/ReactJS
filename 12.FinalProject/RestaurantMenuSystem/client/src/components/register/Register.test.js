import {act, cleanup, createEvent, fireEvent, render, screen} from "@testing-library/react";
import React from 'react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {AlertContext} from "../../contexts/AlertContext.js";
import {AuthContext} from "../../contexts/AuthContext.js";
import Register from "./Register.js";

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
        lastname: 'Lname',
        email: 'email@test.com',
        password: 'P@ssw0rd',
        repass: 'P@ssw0rd'
    }

    beforeEach(() => {
        cleanup();

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
                            <Route path="/*" element={<Register/>}/>
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


    test('Register form got all the inputs', async () => {
        // act
        const heading = await screen.findByText('Регистрация');
        const userNameInput = document.getElementById('username');
        const firstNameInput = document.getElementById('firstname');
        const lastNameInput = document.getElementById('lastname');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const repassInput = document.getElementById('confirm-password');

        // assert
        expect(heading).toBeInTheDocument();
        expect(userNameInput).toBeInTheDocument();
        expect(firstNameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(repassInput).toBeInTheDocument();
        expect(repassInput).toHaveAttribute('type', 'password');
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

    test('OnChange correct firstname', async () => {
        const firstName = document.getElementById('firstname')

        // act
        fireEvent.change(firstName,
            createEvent('input', firstName, {
                target: {value: 'firstname'},
            }));

        // assert
        expect(firstName.value).toBe('firstname');
    });

    test('OnChange correct lastname', async () => {
        const lastNameInput = document.getElementById('lastname')

        // act
        fireEvent.change(lastNameInput,
            createEvent('input', lastNameInput, {
                target: {value: 'lastname'},
            }));

        // assert
        expect(lastNameInput.value).toBe('lastname');
    });

    test('OnChange correct email', async () => {
        const emailInput = document.getElementById('email')

        // act
        fireEvent.change(emailInput,
            createEvent('input', emailInput, {
                target: {value: 'email'},
            }));

        // assert
        expect(emailInput.value).toBe('email');
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

    test('OnBlur not empty username no error message', async () => {
        const userNameInput = document.getElementById('username')

        // act
        fireEvent.blur(userNameInput,
            createEvent('input', userNameInput, {
                target: {value: 'username'},
            }));

        // assert
        expect(userNameInput).not.toHaveClass('is-invalid');
    });

    test('OnBlur not empty username show error message', async () => {
        const userNameInput = document.getElementById('username')

        // act
        fireEvent.blur(userNameInput,
            createEvent('input', userNameInput, {
                target: {value: ''},
            }));

        // assert
        expect(userNameInput).toHaveClass('is-invalid');
    });

    test('OnBlur not empty firstname no error message', async () => {
        const firstName = document.getElementById('username')

        // act
        fireEvent.blur(firstName,
            createEvent('input', firstName, {
                target: {value: 'firstname'},
            }));

        // assert
        expect(firstName).not.toHaveClass('is-invalid');
    });

    test('OnBlur not empty firstname show error message', async () => {
        const firstNameInput = document.getElementById('firstname')

        // act
        fireEvent.blur(firstNameInput,
            createEvent('input', firstNameInput, {
                target: {value: ''},
            }));

        // assert
        expect(firstNameInput).toHaveClass('is-invalid');
    });

    test('OnBlur not empty lastname no error message', async () => {
        const lastNameInput = document.getElementById('username')

        // act
        fireEvent.blur(lastNameInput,
            createEvent('input', lastNameInput, {
                target: {value: 'lastname'},
            }));

        // assert
        expect(lastNameInput).not.toHaveClass('is-invalid');
    });

    test('OnBlur not empty lastname show error message', async () => {
        const lastNameInput = document.getElementById('lastname')

        // act
        fireEvent.blur(lastNameInput,
            createEvent('input', lastNameInput, {
                target: {value: ''},
            }));

        // assert
        expect(lastNameInput).toHaveClass('is-invalid');
    });

    test('OnBlur not empty email no error message', async () => {
        const emailInput = document.getElementById('username')

        // act
        fireEvent.blur(emailInput,
            createEvent('input', emailInput, {
                target: {value: 'email'},
            }));

        // assert
        expect(emailInput).not.toHaveClass('is-invalid');
    });

    test('OnBlur not empty email show error message', async () => {
        const emailInput = document.getElementById('email')

        // act
        fireEvent.blur(emailInput,
            createEvent('input', emailInput, {
                target: {value: ''},
            }));

        // assert
        expect(emailInput).toHaveClass('is-invalid');
    });

    test('OnBlur not empty password no error message', async () => {
        const passwordInput = document.getElementById('password')

        // act
        fireEvent.blur(passwordInput,
            createEvent('input', passwordInput, {
                target: {value: 'P@ssw0rd'},
            }));

        // assert
        expect(passwordInput).not.toHaveClass('is-invalid');
    });

    test('OnBlur empty password show error message', async () => {
        const passwordInput = document.getElementById('username')

        // act
        fireEvent.blur(passwordInput,
            createEvent('input', passwordInput, {
                target: {value: ''},
            }));

        // assert
        expect(passwordInput).toHaveClass('is-invalid');
    });

    test('OnBlur not empty confirm-password no error message', async () => {
        const passwordInput = document.getElementById('password')
        const repassInput = document.getElementById('confirm-password')

        // act
        fireEvent.blur(repassInput,
            createEvent('input', repassInput, {
                target: {value: ''},
            }));

        // assert
        expect(repassInput).not.toHaveClass('is-invalid');
    });

    test('OnBlur empty confirm-password show error message', async () => {
        const repassInput = document.getElementById('confirm-password')

        // act
        fireEvent.blur(repassInput,
            createEvent('input', repassInput, {
                target: {value: 'P@ssw0rd'},
            }));

        // assert
        expect(repassInput).toHaveClass('is-invalid');
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
        expect(showAlert).toHaveBeenCalledWith("Възникна грешка при регистрация!", "danger");

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
        expect(showAlert).toHaveBeenCalledWith("Възникна грешка при регистрация!", "danger");

    });

    test('Onsubmit if has error мессааге status show Error with message', async () => {
        // arrange

        const mockMessage = "Mock message";
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                status: 400,
                ok: false,
                message: mockMessage,
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
        const message = (<><strong>Възникна грешка при регистрация!</strong> "{mockMessage}"</>);
        expect(showAlert).toHaveBeenCalledWith(message, "danger");

    })
});
