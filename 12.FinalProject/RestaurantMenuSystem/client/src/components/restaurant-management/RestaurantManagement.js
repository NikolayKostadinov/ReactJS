import { useState, useEffect } from "react";
import RestaurantList from "./restaurant-list/RestaurantList";
import { useRestaurantManagementContext } from "../../contexts/RestaurantManagementContext";
import RestaurantForm from "./restaurant-form/RestaurantForm";
import { useAlertContext } from "../../contexts/AlertContext";
import * as restaurantService from "../../services/restaurantService";
import { useAuthContext } from "../../contexts/AuthContext";


const RestaurantManagement = () => {

    const [restaurants, setRestaurants] = useState([]);
    const { user } = useAuthContext();
    const alertContext = useAlertContext();


    useEffect(() => {
        alertContext.showLoading();
        restaurantService.getAllByUser(user)
            .then(rest => setRestaurants(rest))
            .catch(() => {
                alertContext.showAlert("Данните за ресторантите немогат да бъдат прочетени!", 'danger')
            })
            .finally(() => alertContext.hideLoading());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const managementContext = useRestaurantManagementContext();



    const onCreate = () => {
        managementContext.showCreateRestaurant();
    }

    const onEdit = (restaurant) => {
        managementContext.showEditRestaurant(restaurant);
    }

    const createRestaurant = (restaurant) => {
        alertContext.showLoading();
        restaurantService.create(restaurant)
            .then(newRestaurant => {
                setRestaurants(stat => [...stat, newRestaurant]);
                alertContext.showAlert(`Вие създадохте успешно ресторант "${restaurant.title}"!`, 'success', true);
            })
            .catch(err => {
                console.log(err);
                alertContext.showAlert('Неуспешна операция!', 'danger');
            })
            .finally(() => alertContext.hideLoading());
    }

    const editRestaurant = (restaurant) => {
        alertContext.showLoading();
        restaurantService.update(restaurant)
            .then((res) => {
                setRestaurants(stat => stat.map(r => r._id === res._id ? res : r));
                alertContext.showAlert(`Успешно редактирахте ресторант "${restaurant.title}"!`, 'success', true);
            })
            .catch(err => {
                console.log(err);
                alertContext.showAlert('Неуспешна операция!', 'danger');
            })
            .finally(() => alertContext.hideLoading());
    }

    const deleteRestaurant = (restaurantId) => {
        if (!window.confirm("Сигурни ли сте, че желаете да изтриете ресторанта?")) {
            return;
        }
        alertContext.showLoading();
        restaurantService.del(restaurantId)
            .then(() => { setRestaurants(stat => stat.filter(r => r._id !== restaurantId)) })
            .catch(err => {
                console.log(err);
                alertContext.showAlert('Неуспешна операция!', 'danger');
            })
            .finally(() => alertContext.hideLoading());
    }

    const onSubmit = (restaurant) => {
        const restaurantModel = {
            title: restaurant.title,
            imagesUrls: restaurant.imagesUrls,
            workingHours: {
                businessDays: restaurant["workingHours.businessDays"] || restaurant?.workingHours?.businessDays,
                fridayAndSaturday: restaurant["workingHours.fridayAndSaturday"] || restaurant?.workingHours?.fridayAndSaturday,
                sunday: restaurant["workingHours.sunday"] || restaurant?.workingHours?.sunday,
            }
        };

        if (managementContext.isCreate) {
            createRestaurant(restaurantModel);
        } else if (managementContext.isEdit) {
            restaurantModel._id = restaurant._id;
            editRestaurant(restaurantModel);
        }
        else {
            alertContext.showAlert('Невалидна операция', 'дангер');
        }
        managementContext.hideForm();
    }

    return (
        <section id="restaurant-management" className="transparent extended">
            <div className="overlay extended">
                <div className="restaurant-list-wrapper container">
                    <header className="row">
                        <h1 className="text-center offset-md-3 col-md-6">Управление на ресторантите</h1>
                        <div className="offset-md-1 col-md-2 text-sm-right">
                            <button className="btn btn-primary btn-sm btn-create" onClick={onCreate}>
                                <i className="fa-regular fa-file"></i> Създай
                            </button>
                        </div>
                    </header>
                    <RestaurantList deleteHandler={deleteRestaurant} restaurants={restaurants} editHandler={onEdit} />
                </div>
            </div>

            <RestaurantForm onSubmitHandler={onSubmit} />
        </section>
    )
}

export default RestaurantManagement;
