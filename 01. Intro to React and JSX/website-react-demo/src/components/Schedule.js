import DayTab1 from "./nav-tabs/DayTab1";
import DayTab2 from "./nav-tabs/DayTab2";
import DayTab3 from "./nav-tabs/DayTab3";
import NavTabs from "./nav-tabs/NavTabs";

export default function Schedule() {
  return (
    <div className="container">
      <div className="row me-row schedule" id="schedule">
        <h2 className="row-title content-ct">Event Schedule</h2>
        <div className="col-md-12">
          <NavTabs />
          <div className="tab-content">
            <DayTab1 />
            <DayTab2 />
            <DayTab3 />
          </div>
        </div>
      </div>
    </div>
  );
}