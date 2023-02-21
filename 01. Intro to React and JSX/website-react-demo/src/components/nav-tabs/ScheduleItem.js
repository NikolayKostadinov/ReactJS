export default function ScheduleItem({img, timeslot, theme, description}) {
    return (
        <div className="col-md-6">
            <div className="media">
                <div className="media-left">
                    <a href="#">
                        <img className="media-object" src={img} alt="..." />
                    </a>
                </div>
                <div className="media-body">
                    <h4 className="media-heading">{timeslot}</h4>
                    <h5>{theme}</h5>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}