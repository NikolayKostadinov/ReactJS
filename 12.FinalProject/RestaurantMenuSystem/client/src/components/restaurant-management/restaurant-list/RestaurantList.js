import RestaurantListItem from "./RestaurantListItem";

const RestaurantList = ({
    restaurants,
    editHandler,
    deleteHandler
}) => {


    return (
        <ul className="restaurant-list">
            {restaurants.map(r => <RestaurantListItem key={r._id} restaurant={r} onEditHandler={editHandler} onDeleteHandler={deleteHandler} />)}
        </ul>
    )
}
export default RestaurantList;