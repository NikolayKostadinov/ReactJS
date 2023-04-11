import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as moment from 'moment';
import 'moment/locale/bg';

import useValidator from "../../hooks/useValidator";
import { useAlertContext } from "../../contexts/AlertContext";
import * as reservationService from "../../services/reservationService";
import contacts from '../../assets/imgs/contact.jpg';

const Reservation = () => {
  moment.locale('bg');
  const { restaurantId, title } = useParams();
  const [formState, setFormState] = useState({
    restaurantId,
    name: '',
    email: '',
    phone: '',
    datetime: '',
    seats: ''
  });
  const validator = useValidator();
  const alertContext = useAlertContext();
  const navigate = useNavigate();

  const setResult = (fieldName, value) => {
    setFormState(state =>
    ({
      ...state,
      [fieldName]: value
    }));
  }

  const onChange = (ev) => {
    setResult(ev.target.name, ev.target.value);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validator.hasErrors()) {
      alertContext.showLoading();
      reservationService.create(formState)
        .then(res => {
          alertContext.showAlert(`Успешно резервирахте маса в ресторант "${title}" за ${moment(res.datetime).format('LLL')}`, 'success', true);
          setFormState({});
          navigate('/', { replace: true })
        })
        .catch(err => {
          console.log(err);
          alertContext.showAlert('Неуспешна операция!', 'danger');
        })
        .finally(() => alertContext.hideLoading());
    }
  }

  return (
    <section id="book-table" className="bg-white extended">
      <div className="container">
        <h1 className="title text-center mb-6">Резервация за "{title}"</h1>
        <div className="row align-items-center">
          <div className="col-md-6 d-none d-md-block">
            <img
              src={contacts}
              alt="Форма за резервация"
              className="w-100 rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Вашето име"
                  className={validator.getFormControlValidClass("name")}
                  value={formState.name}
                  onChange={onChange}
                  onBlur={validator.requiredValidator}
                />
                <p className="invalid-feedback">
                  Полето е задължително!
                </p>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Вашата електронна поща"
                  className={validator.getFormControlValidClass("email")}
                  value={formState.email}
                  onChange={onChange}
                  onBlur={validator.emailValidator}
                />
                <p className="invalid-feedback">
                  Въвели сте невалиден email!
                </p>
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Вашият телефон"
                  className={validator.getFormControlValidClass("phone")}
                  value={formState.phone}
                  onChange={onChange}
                  onBlur={validator.requiredValidator}
                />
                <p className="invalid-feedback">
                  Полето е задължително!
                </p>
              </div>
              <div className="form-group">
                <input
                  type="datetime-local"
                  name="datetime"
                  className={validator.getFormControlValidClass("datetime")}
                  value={formState.datetime}
                  onChange={onChange}
                  onBlur={validator.requiredValidator}
                />
                <p className="invalid-feedback">
                  Полето е задължително!
                </p>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="seats"
                  placeholder="Брой места"
                  className={validator.getFormControlValidClass("seats")}
                  value={formState.seats}
                  onChange={onChange}
                  onBlur={validator.requiredValidator}
                />
                <p className="invalid-feedback">
                  Полето е задължително!
                </p>
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={validator.hasErrors()}>
                Запазете маса
              </button>
              <small className="form-text text-muted mt-3 text-center">
                Ние нe изпращаме нежелани съобщения на <span className="text-primary"> нашите клиенти</span>.
              </small>
            </form>
          </div>
        </div>
      </div>
    </section>)
}
export default Reservation;
