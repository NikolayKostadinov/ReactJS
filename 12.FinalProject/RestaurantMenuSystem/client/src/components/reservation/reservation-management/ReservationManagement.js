import { useState, useEffect } from "react";

import { useAuthContext } from "../../../contexts/AuthContext";
import { useAlertContext } from "../../../contexts/AlertContext";

import * as restaurantService from "../../../services/restaurantService";
import * as reservationService from "../../../services/reservationService";
import Pager from "../../common/pager/Pager.js";
import ReservationRow from "./ReservationRow";
import moment from "moment";
import { usePager } from "../../../hooks/usePager";

const PAGE_SIZE = 9;

const ReservationManagement = () => {
    const [formState, setFormState] = useState({ restaurantId: '', date: moment(new Date()).format('YYYY-MM-DD') });
    const [restaurants, setRestaurants] = useState([]);
    const [reservations, setReservations] = useState([]);
    const pager = usePager(PAGE_SIZE);


    const { user } = useAuthContext();
    const alertContext = useAlertContext();


    useEffect(() => {
        alertContext.showLoading();
        restaurantService.getAllByUser(user)
            .then(data => setRestaurants(Object.values(data)))
            .catch(err => {
                console.log(err);
                alertContext.showAlert('Неуспешна операция!', 'danger');
            })
            .finally(() => alertContext.hideLoading());
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        if (formState.restaurantId && formState.date) {
            alertContext.showLoading();
            reservationService.getAll(formState.restaurantId, formState.date)
                .then(data => {
                    const reservations = Object.values(data)
                        .filter(r =>
                            r.restaurantId === formState.restaurantId
                            && (moment(r.datetime).isBetween(
                                moment(formState.date + "T00:00"),
                                moment(formState.date + "T23:59")))
                        )
                        .sort((o1, o2) => moment(o1.datetime).diff(moment(o2.datetime)));
                    pager.setRecordsCount(reservations.length);
                    setReservations(reservations.slice(pager.offset, pager.offset + PAGE_SIZE));
                })
                .catch(err => {
                    console.log(err);
                    alertContext.showAlert('Неуспешна операция!', 'danger');
                })
                .finally(() => alertContext.hideLoading());

        }
        // eslint-disable-next-line
    }, [formState.restaurantId, formState.date, pager.offset]);

    const onChange = (ev) => {
        setFormState(state =>
        ({
            ...state,
            [ev.target.name]: ev.target.value
        }));
    }

    const onConfirm = (reservationId) => {
        alertContext.showLoading();
        const reservation = reservations.find(r => r._id === reservationId);
        reservationService.confirm(reservationId, !reservation?.confirmed)
            .then(res => setReservations(reservations.map(r => r._id !== res._id ? r : res)))
            .catch(err => {
                console.log(err);
                alertContext.showAlert('Неуспешна операция!', 'danger');
            })
            .finally(() => alertContext.hideLoading());

    }

    const onFinish = (reservationId) => {
        alertContext.showLoading();
        const reservation = reservations.find(r => r._id === reservationId);
        reservationService.finish(reservationId, !reservation?.finished)
            .then(res => setReservations(reservations.map(r => r._id !== res._id ? r : res)))
            .catch(err => {
                console.log(err);
                alertContext.showAlert('Неуспешна операция!', 'danger');
            })
            .finally(() => alertContext.hideLoading());
    }

    return (
        <section id="reservations" className="extended pt-4 pb-4">
            <div className="container">
                <h1 className="title text-center">Резервации</h1>
                <div className="row">
                    <div className="col-md-6">
                        <select
                            name="restaurantId"
                            className="custom-select custom-select-lg"
                            value={formState.restaurantId}
                            onChange={onChange}
                        >
                            <option key={''} value={''} disabled>Изберете ресторант...</option>
                            {restaurants.map(r => <option key={r._id} value={r._id}>{r.title}</option>)}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={formState.date}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                </div>
                <Pager pagerHook={pager} />
                <div className="d-flex justify-content-center">
                <table id="reservations" className="table table-striped table-sm table-responsive-sm">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Време</th>
                            <th>Места</th>
                            <th>Имена</th>
                            <th>Телефон</th>
                            <th>Електронна поща</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((r, ix) => <ReservationRow key={r._id} index={ix + pager.offset} reservation={r} confirmHandler={() => onConfirm(r._id)} finishHandler={() => onFinish((r._id))} />)}
                    </tbody>
                </table>
                </div>
            </div>
        </section>


    )
}
export default ReservationManagement;
