import { Link } from 'react-router-dom';
import RestaurantImage from './RestaurantImage';

const Restaurant = ({ restaurant }) => {
    return (
        <section className="restaurant">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h6 className="section-subtitle">Работно време</h6>
                        <h3 className="section-title">{restaurant.title}</h3>
                        <p className="mb-1 text-primary font-weight-bold">
                            Понеделник - Четвъртък :
                            <span className="font-weight-normal pl-2 text-dark">
                                {restaurant?.workingHours?.businessDays}
                            </span>
                        </p>
                        <p className="mb-1 text-primary font-weight-bold">
                            Петък - Събота :{" "}
                            <span className="font-weight-normal pl-2 text-dark">
                                {restaurant?.workingHours?.fridayAndSaturday}
                            </span>
                        </p>
                        <p className="mb-1 text-primary font-weight-bold">
                            Неделя :{" "}
                            <span className="font-weight-normal pl-2 text-dark">
                                {restaurant?.workingHours?.sunday}
                            </span>
                        </p>
                        <Link to={`/reservation/${restaurant._id}/${restaurant.title}`} className="btn btn-primary btn-sm w-md mr-2 mt-4 mb-4 mb-md-0">
                            Направете резервация
                        </Link>
                        <Link to={`/menu/${restaurant._id}`} className="btn btn-outline-primary btn-sm w-md mt-4 mb-4 mb-md-0">
                            Разгледайте менюто
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <div className="row justify-content-around">
                            {restaurant.imagesUrls?.map((img, ix) => <RestaurantImage key={ix} imageUrl={img} altText={`${restaurant.title} ${ix + 1}`} />)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Restaurant;
