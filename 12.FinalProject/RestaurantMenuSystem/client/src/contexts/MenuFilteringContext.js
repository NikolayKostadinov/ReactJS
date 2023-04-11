import {createContext, useContext, useState} from "react";

// Initialize create context to have intelisense where you use it
export const MenuFilteringContext = createContext({
    product: '',
    setFilter: {},
    clearFilter: {}
});

export const useMenuFilteringContext = () => useContext(MenuFilteringContext);

export const MenuFilteringContextProvider =
    ({
         children
     }) => {
        const [product, setProduct] = useState('');

        const setFilter = (filter) => {
            setProduct(filter);
        }
        const clearFilter = () => {
            setProduct('');
        }


        return (
            <MenuFilteringContext.Provider
                value={{
                    product,
                    setFilter,
                    clearFilter
                }}>
                {children}
            </MenuFilteringContext.Provider>
        )
    }
