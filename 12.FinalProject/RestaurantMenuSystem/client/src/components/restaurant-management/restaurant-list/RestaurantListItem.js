const RestaurantListItem = ({
    restaurant,
    onEditHandler,
    onDeleteHandler
}) => {
    const onEdit = (e)=>{
        e.preventDefault();
        onEditHandler(restaurant);
    }

    return (
        <li className="restaurant-list-item" >
            <div className="restaurant-img">
                <img src={restaurant.imagesUrls[0]} alt={`${restaurant.title}`} />
            </div>
            <div className="restaurant-content">
                <h5 >{restaurant.title}</h5>
                {/* <h6 className="section-subtitle">Работно време</h6> */}

                <p className="text-primary font-weight-bold">
                    Понеделник - Четвъртък :
                    <span className="font-weight-normal pl-2 text-dark">
                        {restaurant.workingHours.businessDays}
                    </span>
                </p>
                <p className="text-primary font-weight-bold">
                    Петък - Събота :{" "}
                    <span className="font-weight-normal pl-2 text-dark">
                        {restaurant.workingHours.fridayAndSaturday}
                    </span>
                </p>
                <p className="text-primary font-weight-bold">
                    Неделя :{" "}
                    <span className="font-weight-normal pl-2 text-dark">
                        {restaurant.workingHours.sunday}
                    </span>
                </p>

                <ul className="actions">
                    <li>
                        <button onClick={onEdit} className="btn btn-primary btn-sm w-md ">
                            <i className="fa-regular fa-pen-to-square"></i> Промяна
                        </button>
                    </li>
                    <li>
                        <button className="btn btn-outline-primary btn-sm w-md" onClick={() => onDeleteHandler(restaurant._id)}>
                            <i className="fa-regular fa-trash-can"></i> Изтриване
                        </button>
                    </li>
                </ul>

            </div>
        </li>

    )
}

export default RestaurantListItem;