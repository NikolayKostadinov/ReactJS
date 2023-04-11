import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useMenuFilteringContext} from "../../contexts/MenuFilteringContext.js";

const MenuSearchForm = () => {
    const [search, setSearch] = useState('');
    const location = useLocation();
    const menuContext = useMenuFilteringContext();

    useEffect(() => {
        return () => {
            // clean searched product before leave the screen
            setSearch('');
            menuContext.clearFilter();
            // eslint-disable-next-line
        }},[location.pathname]);

        const onSubmitFilter = (ev) => {
            ev.preventDefault();
            menuContext.setFilter(search);
        }
        const onClearHandler = (ev) => {
            ev.preventDefault();
            setSearch('');
            menuContext.clearFilter();
        }

        const onChangeHandler = (ev) => {
            setSearch(ev.target.value);
        }

        if (location.pathname.startsWith('/menu')) {
            return (
                <form
                    className="form-inline form-search"
                    onSubmit={onSubmitFilter}
                    data-testid="form">
                    <input className="form-control form-control-sm form-control-search"
                           type="text"
                           placeholder="Търсене..."
                           aria-label="Search"
                           value={search}
                           onChange={onChangeHandler}
                           data-testid='search-input'/>
                    <button className="btn btn-search" type="submit">
                        <i className="fa-solid fa-magnifying-glass text-primary"></i>
                    </button>
                    <button type="button" className="btn btn-clear" onClick={onClearHandler} data-testid='clear' >
                        <i className="fa-solid fa-xmark text-primary"></i>
                    </button>
                </form>
            )
        }

        return null;
    }

    export default MenuSearchForm;
