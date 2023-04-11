import { useEffect, useState } from 'react';
import { useAlertContext } from '../../../contexts/AlertContext';
import { useMenuFilteringContext } from "../../../contexts/MenuFilteringContext.js";
import { usePager } from "../../../hooks/usePager.js";
import * as mealService from '../../../services/mealService';
import Pager from "../../common/pager/Pager.js";
import { goToTop } from '../../common/utils/utils.js';
import CreateMeal from './CreateMeal';

import MealListItem from './MealListItem';

const PAGE_SIZE = 6;

const MealList = ({
    restaurantId,
    isOwner,
    mealType,
    transparent,
    title,
    subtitle
}) => {
    const [meals, setMeals] = useState([]);
    const [isCreate, setIsCreate] = useState(false);
    const alertContext = useAlertContext();
    const { product } = useMenuFilteringContext();
    const pager = usePager(PAGE_SIZE);


    useEffect(() => {
        alertContext.showLoading();
        const getMealsCount = mealService.getAllByRestaurantIdAndMealTypeCount(restaurantId, mealType, product);
        const getMealsPage = mealService.getAllByRestaurantIdAndMealTypePaged(restaurantId, mealType, product, pager.offset, PAGE_SIZE);

        Promise.all([getMealsCount, getMealsPage])
            .then(([count, res]) => {
                pager.setRecordsCount(count);
                setMeals(Object.values(res));
            })
            .catch(err => {
                console.log(err);
                alertContext.showAlert('Неуспешна операция!', 'danger');
            })
            .finally(() => {
                alertContext.hideLoading();
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restaurantId, mealType, product, pager.offset]);

    useEffect(() => {
        goToTop();
    }, [])

    const onDelete = (mealId) => {
        if (!window.confirm("Сигурни ли сте, че желаете да изтриете ястието?")) {
            return;
        }
        alertContext.showLoading();
        mealService.del(mealId)
            .then(() => setMeals(meals.filter(m => m._id !== mealId)))
            .catch(err => {
                console.log(err.message);
                alertContext.showAlert('Неуспешно изтриване!', 'danger')
            })
            .finally(() => alertContext.hideLoading());
    }

    const onUpdate = (meal) => {
        alertContext.showLoading();

        meal.price = Number(parseFloat(meal.price.toString().replace(',', '.')));
        mealService.update(meal)
            .then(changed => setMeals(meals.map(m => m._id !== meal._id ? m : changed)))
            .catch(err => {
                console.log(err.message);
                alertContext.showAlert('Неуспешнa промяна!', 'danger')
            })
            .finally(() => alertContext.hideLoading());
    }

    const onCreate = (meal) => {
        alertContext.showLoading();
        meal.price = Number(parseFloat(meal.price.toString().replace(',', '.')));

        mealService.create(meal)
            .then(newMeal => setMeals(stat => [...stat, newMeal]))
            .catch(err => {
                console.log(err);
                alertContext.showAlert('Неуспешна операция!', 'danger');
            })
            .finally(
                () => {
                    alertContext.hideLoading();
                    setIsCreate(false);
                }
            );
    }

    let overlayed = '';

    if (transparent) {
        overlayed = "overlay";
    }

    return (
        <>
            <section className={`menu ${transparent ? 'transparent' : 'pattern-style-4 has-overlay'}`}>
                <div className={overlayed}>
                    <div className="container raise-2">
                        <h6 className="section-subtitle text-center">{subtitle}</h6>
                        <h3 className="section-title mb-2 pb-3 text-center">{title}</h3>
                        {isOwner &&
                            <button type="button" className={`btn btn-primary ${pager.pages > 1 ? 'create-meal' : 'create-meal-alone'}`} onClick={() => setIsCreate(true)}>
                                <i className="fa-regular fa-file"></i> Създай
                            </button>
                        }
                        <Pager pagerHook={pager} />
                        {meals.length ?
                            <div className='row'>
                                {meals.map(m =>
                                    <MealListItem
                                        key={m._id}
                                        meal={m}
                                        onDeleteHandler={onDelete}
                                        onUpdateHandler={onUpdate}
                                    />)}
                            </div>
                            :
                            <p className="text-center">Няма ястия в тази категория</p>
                        }
                    </div>
                </div>
            </section>
            <CreateMeal isCreate={isCreate} restaurantId={restaurantId} mealType={mealType} onCreateHandler={onCreate}
                unloadCreate={() => setIsCreate(false)} />
        </>
    )
}
export default MealList;
