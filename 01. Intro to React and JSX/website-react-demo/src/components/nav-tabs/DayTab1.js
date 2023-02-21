import ScheduleItem from "./ScheduleItem";

export default function DayTab1() {
  return (
    <div role="tabpanel" className="tab-pane fade in active" id="day-1">
      <div className="row">
        <ScheduleItem
          img="img/speaker-1.png"
          timeslot="10am to 10:30am"
          theme="THE DESIGNER’S GUIDE TO BEING ESSENTIAL"
          description="Simon is designer and partner at Fictivekin and has worked in a variety of situations for bands, record labels, governments, polar explorers, and most other things." />

        <ScheduleItem
          img="img/speaker-2.png"
          timeslot="10:45am to 11:30am"
          theme="MODULAR DESIGN AT WORK"
          description="Simon is designer and partner at Fictivekin and has worked in a variety of situations for bands, record labels, governments, polar explorers, and most other things." />

        <ScheduleItem
          img="img/speaker-3.png"
          timeslot="10:45am to 11:30am"
          theme="MODULAR DESIGN AT WORK"
          description="Simon is designer and partner at Fictivekin and has worked in a variety of situations for bands, record labels, governments, polar explorers, and most other things." />

        <ScheduleItem
          img="img/speaker-4.png"
          timeslot="02:00pm to 03.30pm"
          theme="WEB FONTS PERFORMANCE"
          description="Simon is designer and partner at Fictivekin and has worked in a variety of situations for bands, record labels, governments, polar explorers, and most other things. " />

      </div>
    </div>
  );
}