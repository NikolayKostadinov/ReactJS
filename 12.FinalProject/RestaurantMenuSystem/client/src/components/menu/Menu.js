import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MealList from "./meal-list/MealList";
import * as restaurantService from '../../services/restaurantService';
import { useAuthContext } from "../../contexts/AuthContext";


const Menu = () => {
    const { restaurantId } = useParams();
    const [isRestaurantOwner, setIsRestaurantOwner] = useState(false);
    const { isAuthenticated, user } = useAuthContext();


    useEffect(() => {
        if (isAuthenticated) {
            restaurantService.getById(restaurantId)
                .then(restaurant => setIsRestaurantOwner(restaurant._ownerId === user._id))
        }else{
            setIsRestaurantOwner(false)
        }

    }, [isAuthenticated, restaurantId, user]);

    return (
        <>
            <MealList mealType="salad" restaurantId={restaurantId} title="Салати" subtitle={<>Свежи <span className="text-primary font-weight-bold">&amp;</span> Вкусни</>} isOwner={isRestaurantOwner} />
            <MealList mealType="main" restaurantId={restaurantId} title="Основни ястия" subtitle={<>Ароматни <span className="text-primary font-weight-bold">&amp;</span> Сочни</>} transparent={true} isOwner={isRestaurantOwner} />
            <MealList mealType="desert" restaurantId={restaurantId} title="Десерти" subtitle={<>Без <span className="text-primary font-weight-bold">|</span> Угризения</>} isOwner={isRestaurantOwner} />
        </>
    )
}
export default Menu;
