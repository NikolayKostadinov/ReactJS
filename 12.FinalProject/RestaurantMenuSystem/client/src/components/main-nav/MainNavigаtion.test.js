import {act, cleanup, fireEvent, render, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext.js";
import {MenuFilteringContext} from "../../contexts/MenuFilteringContext.js";
import MainNavigation from "./MainNavigation.js";
import React, { useState as useStateMock } from 'react';
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

const mockSetFilter = jest.fn();
const mockClearFilter = jest.fn();

describe('MainNavigation component tests', () => {
    beforeEach(() => {
        cleanup();
        useStateMock.mockImplementation(init=>[init, jest.fn(()=>jest.requireActual('react').useState)]);
    });

    test('MainNavigation show login and register if user not authenticated', async () => {
        // arrange
        render(
            <AuthContext.Provider value={{
                isAuthenticated: false
            }}
            >
                <MemoryRouter initialEntries={["/currentUri"]}>
                    <MenuFilteringContext.Provider value={{
                        product: '',
                        setFilter: mockSetFilter,
                        clearFilter: mockClearFilter
                    }}>
                    <MainNavigation/>
                    <Routes>
                        // dummy route
                        <Route path="/*" element={<p>User is authenticated</p>}/>
                    </Routes>
                    </MenuFilteringContext.Provider>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // act
        let home = await screen.queryByText("Начало");
        let login = await screen.queryByText("Вход");
        let register = await screen.queryByText("Регистрация");
        const logout = await screen.queryByText("Изход");

        // assert
        expect(home).toBeInTheDocument();
        expect(login).toBeInTheDocument();
        expect(register).toBeInTheDocument();
        expect(logout).toBeNull();
    });

    test('MainNavigation show contain home link', async () => {
        render(
            <AuthContext.Provider value={{
                user: {firstname: "Fname", lastname: "Lname", fullname: "Fname Lname"},
                isAuthenticated: true
            }}
            >
                <MemoryRouter initialEntries={["/currentUri"]}>
                    <MenuFilteringContext.Provider value={{
                        product: '',
                        setFilter: mockSetFilter,
                        clearFilter: mockClearFilter
                    }}>
                    <MainNavigation/>
                    <Routes>
                        // dummy route
                        <Route path="/*" element={<p>User is authenticated</p>}/>
                    </Routes>
                    </MenuFilteringContext.Provider>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // act
        let home = await screen.queryByText("Начало");
        let manage = await screen.queryByText("Управление");
        let reservations = await screen.queryByText("Резервации");
        let fullname = await screen.queryByText("Fname Lname");
        let login = await screen.queryByText("Вход");
        let register = await screen.queryByText("Регистрация");
        const logout = await screen.queryByText("Изход");

        // assert
        expect(home).toBeInTheDocument();
        expect(manage).toBeInTheDocument();
        expect(reservations).toBeInTheDocument();
        expect(fullname).toBeInTheDocument();
        expect(login).toBeNull();
        expect(register).toBeNull();
        expect(logout).toBeInTheDocument();
    });

    test('MainNavigation "menu" in pathname will show search form', async () => {
        render(
            <AuthContext.Provider value={{
                isAuthenticated: false
            }}
            >
                <MemoryRouter initialEntries={["/menu/someId"]}>
                    <MenuFilteringContext.Provider value={{
                        product: '',
                        setFilter: mockSetFilter,
                        clearFilter: mockClearFilter
                    }}>
                    <MainNavigation/>
                    <Routes>
                        // dummy route
                        <Route path="/*" element={<p>User is authenticated</p>}/>
                    </Routes>
                    </MenuFilteringContext.Provider>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // act
        let searchForm = screen.getByTestId("form");

        // assert
        expect(searchForm).toBeInTheDocument();
    });

    test('Submit search will set menu filter context search form', async () => {
        const mockSetFilter = jest.fn();
        const mockClearFilter = jest.fn();
        render(
            <AuthContext.Provider value={{
                isAuthenticated: false
            }}>
                <MemoryRouter initialEntries={["/menu/someId"]}>
                    <MenuFilteringContext.Provider value={{
                        product: '',
                        setFilter: mockSetFilter,
                        clearFilter: mockClearFilter
                    }}>
                        <MainNavigation/>
                        <Routes>
                            // dummy route
                            <Route path="/*" element={<p>User is authenticated</p>}/>
                        </Routes>
                    </MenuFilteringContext.Provider>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // act
        let searchForm = screen.getByTestId("form");

        act(()=>{
            fireEvent.submit(searchForm);
        });

        // assert
        expect(mockSetFilter).toHaveBeenCalledTimes(1);
    });

    test('Clear search will clear menu filter context search form', async () => {
        render(
            <AuthContext.Provider value={{
                isAuthenticated: false
            }}>
                <MemoryRouter initialEntries={["/menu/someId"]}>
                    <MenuFilteringContext.Provider value={{
                        product: '',
                        setFilter: mockSetFilter,
                        clearFilter: mockClearFilter
                    }}>
                        <MainNavigation/>
                        <Routes>
                            // dummy route
                            <Route path="/*" element={<p>User is authenticated</p>}/>
                        </Routes>
                    </MenuFilteringContext.Provider>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // act
        let clearButton = screen.getByTestId("clear");

        act(()=>{
            fireEvent.click(clearButton);
        });

        // assert
        expect(mockClearFilter).toHaveBeenCalledTimes(1);
    });


    test('Change input will change search state', async () => {
        cleanup();
        // arrange
        const mockSetFilter = jest.fn();
        const mockClearFilter = jest.fn();
        const mockSetSearch= jest.fn(()=>jest.requireActual('react').useState);
        useStateMock.mockImplementation(init=>[init, mockSetSearch]);

        render(
            <AuthContext.Provider value={{
                isAuthenticated: false
            }}>
                <MemoryRouter initialEntries={["/menu/someId"]}>
                    <MenuFilteringContext.Provider value={{
                        product: '',
                        setFilter: mockSetFilter,
                        clearFilter: mockClearFilter
                    }}>
                        <MainNavigation/>
                        <Routes>
                            // dummy route
                            <Route path="/*" element={<p>User is authenticated</p>}/>
                        </Routes>
                    </MenuFilteringContext.Provider>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // act
        let inputSearch = screen.getByTestId("search-input");

        act(()=>{
            fireEvent.change(inputSearch, {target: {value: 'a'}});
        });

        // assert
        expect(mockSetSearch).toHaveBeenLastCalledWith('a');
    });
});
