const Pager = ({ pagerHook }) => {
    if (pagerHook.pages > 1) {
        return (
            <ul className="pagination pagination-lg mb-4 justify-content-center">
                <li className={`page-item ${pagerHook.prevEnabled ? 'active' : 'disabled'} `}>
                    <button type="button" className="page-link page-link-borderless" disabled={!pagerHook.prevEnabled}
                        onClick={pagerHook.prevClickHandler}>
                        <i className="ti-angle-double-left"></i>
                    </button>
                </li>
                <li className="page-item d-flex">
                    <h6 className="section-subtitle text-center align-self-center">Страница {pagerHook.page + 1} от {pagerHook.pages}</h6>
                </li>
                <li className={`page-item ${pagerHook.nextEnabled ? 'active' : 'disabled'} `}>
                    <button type="button" className="page-link page-link-borderless"
                        onClick={pagerHook.nextClickHandler} disabled={!pagerHook.nextEnabled}>
                        <i className="ti-angle-double-right"></i>
                    </button>
                </li>
            </ul>
        )
    }
    return null;
}

export default Pager;
