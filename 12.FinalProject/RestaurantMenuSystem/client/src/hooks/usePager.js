import { useState } from "react";

export const usePager = (pageSize) => {
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);

    const prevClickHandler = () => {
        if (page > 0) {
            setPage(p => p - 1);
        }
    }

    const nextClickHandler = () => {
        if (page < pages - 1) {
            setPage(p => p + 1);
        }
    }
    const setRecordsCount = (count) => {
        setPages(Math.ceil(count / pageSize));
    }

    return ({
        page,
        pages,
        setPage,
        setRecordsCount,
        prevClickHandler,
        nextClickHandler,
        prevEnabled: page > 0,
        nextEnabled: page < pages-1,
        offset: page * pageSize
    });


}

