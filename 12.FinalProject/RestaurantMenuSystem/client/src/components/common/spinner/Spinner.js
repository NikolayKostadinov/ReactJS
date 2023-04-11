import { useAlertContext } from "../../../contexts/AlertContext";

import './Spinner.css';

const Spinner = () => {
    const { loading } = useAlertContext();

    if (!loading) return null;

    return (
        <div className="dark-form-overlay">
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
export default Spinner;
