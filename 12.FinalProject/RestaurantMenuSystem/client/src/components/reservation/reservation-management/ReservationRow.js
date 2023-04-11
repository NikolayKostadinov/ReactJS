import * as moment from 'moment';
import 'moment/locale/bg';
import styles from './ReservationRow.module.css'


const ReservationRow = ({
    index,
    reservation,
    confirmHandler,
    finishHandler
}) => {
    moment.locale('bg');
    const decoration = [
        reservation.finished && styles.finished,
        reservation.confirmed && styles.confirmed
    ].join(" ");
    
    return (
        <tr className={decoration}>
            <td>{index + 1}</td>
            <td>{moment(reservation.datetime).format('LLL')}</td>
            <td>{reservation.seats}</td>
            <td>{reservation.name}</td>
            <td>{reservation.phone}</td>
            <td>{reservation.email}</td>
            <td>
                <button className='btn btn-sm btn-outline-primary' data-toggle="tooltip" data-placement="right" title="Потвърди" onClick={confirmHandler}>
                    <i className="fa-regular fa-thumbs-up"></i>
                </button>
                <button className='btn btn-sm btn-primary ml-2' data-toggle="tooltip" data-placement="right" title="Приключи" onClick={finishHandler}>
                    <i className="fa-regular fa-calendar-check"></i>
                </button>
            </td>
        </tr>
    );
}
export default ReservationRow;
